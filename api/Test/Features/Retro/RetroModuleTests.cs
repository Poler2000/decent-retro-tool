using System.Net;
using System.Net.Http.Json;
using System.Text;
using DecentRetroTool.Api.Data;
using DecentRetroTool.Api.DTOs.Create;
using DecentRetroTool.Api.DTOs.Get;
using DecentRetroTool.Api.DTOs.Update;
using DecentRetroTool.Api.Test.Utils;
using FluentAssertions;
using FluentAssertions.Execution;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DecentRetroTool.Api.Test.Features.Retro;

public class RetroModuleTests(TestAppFactory fixture) : IntegrationTestBase(fixture)
{
    private const string BaseRoute = "/decent-retro-tool.api/retros";

    [Fact]
    public async Task Get_ExistingId_ReturnsRetro()
    {
        // Arrange
        var expected = await GetFirstRetroFromDbAsync();

        // Act
        var result = await _client.GetAsync($"{BaseRoute}/{expected.Id}");

        // Assert
        result.IsSuccessStatusCode.Should().BeTrue();
        var dto = await result.Content.ReadFromJsonAsync<RetroGetDto>();
        dto.Should().NotBeNull();
        using (new AssertionScope())
        {
            dto.Id.Should().Be(expected.Id);
            dto.Title.Should().Be(expected.Title);
            dto.TeamId.Should().Be(expected.TeamId);
            dto.Sections.Should().HaveCount(expected.Sections.Count);
            dto.Sections.First().Notes.Should().HaveCount(expected.Sections.First().Notes.Count);
        }
    }

    [Fact]
    public async Task Get_NonExistingId_ReturnsNotFound()
    {
        var result = await _client.GetAsync($"{BaseRoute}/-9999");
        result.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
    
    [Fact]
    public async Task Get_ListWithNoFiltering_ReturnsAllRetros()
    {
        // Act
        var result = await _client.GetAsync($"{BaseRoute}");

        // Assert
        result.IsSuccessStatusCode.Should().BeTrue();
        
        var retrosInDb = await GetRetrosFromDbAsync();
        
        var retros = await result.Content.ReadFromJsonAsync<List<RetroGetDto>>();
        retros.Should().NotBeNull();
        retros.Should().HaveCount(retrosInDb.Count);
    }

    [Fact]
    public async Task Get_ListOfRetrosForTeamId_ReturnsOnlyTeamRetros()
    {
        // Arrange
        var firstRetro = await GetFirstRetroFromDbAsync();
        var teamId = firstRetro.TeamId;

        // Act
        var result = await _client.GetAsync($"{BaseRoute}?teamId={teamId}");

        // Assert
        result.IsSuccessStatusCode.Should().BeTrue();
        var retros = await result.Content.ReadFromJsonAsync<List<RetroGetDto>>();
        retros.Should().NotBeNull();
        retros.Should().OnlyContain(r => r.TeamId == teamId);
    }

    [Fact]
    public async Task Download_ExistingId_ReturnsJsonFile()
    {
        // Arrange
        var existing = await GetFirstRetroFromDbAsync();

        // Act
        var result = await _client.GetAsync($"{BaseRoute}/{existing.Id}/download");

        // Assert
        result.IsSuccessStatusCode.Should().BeTrue();
        result.Content.Headers.ContentType?.MediaType.Should().Be("application/json");
        if (result.Content.Headers.TryGetValues("Content-Disposition", out var values))
        {
            values.FirstOrDefault()!.Should().Contain($"retro_{existing.Id}.json");
        }
        
        var dto = await result.Content.ReadFromJsonAsync<RetroGetDto>();
        dto.Should().NotBeNull();
        using (new AssertionScope())
        {
            dto.Id.Should().Be(existing.Id);
            dto.Title.Should().Be(existing.Title);
            dto.TeamId.Should().Be(existing.TeamId);
            dto.Sections.Should().HaveCount(existing.Sections.Count);
            dto.Sections.First().Notes.Should().HaveCount(existing.Sections.First().Notes.Count);
        }
    }

    [Fact]
    public async Task Download_NonExistingId_ReturnsNotFound()
    {
        var result = await _client.GetAsync($"{BaseRoute}/-999/download");
        result.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task Post_HappyDay_RetroCreated()
    {
        // Arrange
        var team = await GetFirstTeamFromDbAsync();
        var create = new RetroCreateDto
        {
            Title = $"test_{Guid.NewGuid()}", 
            TeamId = team.Id
        };

        // Act
        var postResult = await _client.PostAsJsonAsync(BaseRoute, create);

        // Assert
        postResult.StatusCode.Should().Be(HttpStatusCode.Created);
        var createdResourceUrl = postResult.Headers.GetValues("Location").FirstOrDefault();
        var retro = await GetRetroByTitleFromDbAsync(create.Title);

        retro.Should().NotBeNull();
        using (new AssertionScope())
        {
            retro.Title.Should().Be(create.Title);
            retro.TeamId.Should().Be(create.TeamId);
            retro.Id.Should().BePositive();
            createdResourceUrl.Should().Be($"{BaseRoute}/{retro.Id}");
            retro.Sections.Should().NotBeEmpty();
        }
    }

    [Fact]
    public async Task Post_TeamDoesNotExists_ReturnsNotFound()
    {
        var create = new RetroCreateDto { Title = $"test_{Guid.NewGuid()}", TeamId = -999 };

        var postResult = await _client.PostAsJsonAsync(BaseRoute, create);

        postResult.StatusCode.Should().Be(HttpStatusCode.NotFound);
        var retro = await GetRetroByTitleFromDbAsync(create.Title);
        retro.Should().BeNull();
    }

    [Fact]
    public async Task Put_UpdateTitle_RetroUpdated()
    {
        // Arrange
        var existing = await GetFirstRetroFromDbAsync();
        var update = new RetroUpdateDto { Title = $"Updated_{Guid.NewGuid()}" };

        // Act
        var putResult = await _client.PutAsJsonAsync($"{BaseRoute}/{existing.Id}", update);

        // Assert
        putResult.StatusCode.Should().Be(HttpStatusCode.OK);
        var retro = await GetRetroByIdFromDbAsync(existing.Id);
        retro.Should().NotBeNull();
        retro.Title.Should().Be(update.Title);
        retro.Sections.Should().HaveCount(existing.Sections.Count);
    }
    
    [Fact]
    public async Task Put_UpdateSections_RetroUpdated()
    {
        // Arrange
        var existing = await GetFirstRetroFromDbAsync();
        var update = new RetroUpdateDto
        {
            Title = existing.Title,
            Sections = existing.Sections
                .Select(s => new SectionUpdateDto()
                {
                    Id = s.Id,
                    Title = $"Updated_{Guid.NewGuid()}",
                    IsHidden = !s.IsHidden,
                    Notes = s.Notes.Select(n => new NoteCreateDto()
                    {
                        Content = n.Content,
                        Score = n.Score,
                        SectionId = s.Id
                    }).ToList()
                }).Append(new SectionUpdateDto()
                {
                    Id = -1,
                    IsHidden = false,
                    Notes = [],
                    Title = $"NewSection_{Guid.NewGuid()}"
                }).ToList()
        };

        // Act
        var putResult = await _client.PutAsJsonAsync($"{BaseRoute}/{existing.Id}", update);

        // Assert
        putResult.StatusCode.Should().Be(HttpStatusCode.OK);
        var retro = await GetRetroByIdFromDbAsync(existing.Id);
        retro.Should().NotBeNull();
        retro.Title.Should().Be(existing.Title);
        
        retro.Sections.Should().HaveCount(existing.Sections.Count + 1);
        foreach (var sectionUpdate in update.Sections)
        {
            var section = retro.Sections.SingleOrDefault(s => s.Title == sectionUpdate.Title);
            section.Should().NotBeNull();
            section.IsHidden.Should().Be(sectionUpdate.IsHidden);
        }
    }

    [Fact]
    public async Task Put_NonExistingId_ReturnsNotFound()
    {
        var update = new RetroUpdateDto { Title = $"Updated_{Guid.NewGuid()}" };

        var putResult = await _client.PutAsJsonAsync($"{BaseRoute}/-999", update);

        putResult.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task Delete_HappyDay_RetroDeleted()
    {
        var existing = await GetFirstRetroFromDbAsync();

        var deleteResult = await _client.DeleteAsync($"{BaseRoute}/{existing.Id}");

        deleteResult.StatusCode.Should().Be(HttpStatusCode.OK);

        var retro = await GetRetroByIdFromDbAsync(existing.Id);
        retro.Should().BeNull();
    }

    [Fact]
    public async Task Delete_NonExistingId_ReturnsNotFound()
    {
        var deleteResult = await _client.DeleteAsync($"{BaseRoute}/-999");

        deleteResult.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    private async Task<Data.Models.Retro> GetFirstRetroFromDbAsync()
    {
        using var scope = _fixture.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<RetroDbContext>();
        return await db.Retros
            .AsNoTracking()
            .Include(r => r.Sections)
            .ThenInclude(s => s.Notes)
            .FirstAsync();
    }

    private async Task<Data.Models.Retro?> GetRetroByTitleFromDbAsync(string title)
    {
        using var scope = _fixture.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<RetroDbContext>();
        return await db.Retros
            .AsNoTracking()
            .Include(r => r.Sections)
            .ThenInclude(s => s.Notes)
            .SingleOrDefaultAsync(r => r.Title == title);
    }

    private async Task<Data.Models.Retro?> GetRetroByIdFromDbAsync(int id)
    {
        using var scope = _fixture.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<RetroDbContext>();
        return await db.Retros
            .AsNoTracking()
            .Include(r => r.Sections)
            .ThenInclude(s => s.Notes)
            .SingleOrDefaultAsync(r => r.Id == id);
    }
    
    private async Task<List<Data.Models.Retro>> GetRetrosFromDbAsync()
    {
        using var scope = _fixture.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<RetroDbContext>();
        return await db.Retros
            .AsNoTracking()
            .ToListAsync();
    }

    private async Task<Data.Models.Team> GetFirstTeamFromDbAsync()
    {
        using var scope = _fixture.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<RetroDbContext>();
        return await db.Teams
            .AsNoTracking()
            .FirstAsync();
    }
}