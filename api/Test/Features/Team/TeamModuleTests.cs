using System.Net;
using System.Net.Http.Json;
using DecentRetroTool.Api.Data;
using DecentRetroTool.Api.DTOs.Create;
using DecentRetroTool.Api.DTOs.Get;
using DecentRetroTool.Api.Test.Utils;
using FluentAssertions;
using FluentAssertions.Execution;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DecentRetroTool.Api.Test.Features.Team;

public class TeamModuleTests(TestAppFactory fixture) : IntegrationTestBase(fixture)
{
    private const string BaseRoute = "/decent-retro-tool.api/teams";
    
    [Fact]
    public async Task Get_ExistingId_ReturnsTeam()
    {
        // Arrange
        var expectedTeam = await GetFirstTeamFromDbAsync();

        // Act
        var result = await _client.GetAsync($"{BaseRoute}/{expectedTeam.Id}");

        // Assert
        result.IsSuccessStatusCode.Should().BeTrue();
        var dto = await result.Content.ReadFromJsonAsync<TeamGetDto>();

        dto.Should().NotBeNull();
        using (new AssertionScope())
        {
            dto.Id.Should().Be(expectedTeam.Id);
            dto.Name.Should().Be(expectedTeam.Name);
        }
    }

    [Fact]
    public async Task Get_NonExistingId_ReturnsNotFound()
    {
        // Act
        var result = await _client.GetAsync($"{BaseRoute}/-9999");

        // Assert
        result.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task Post_HappyDay_TeamCreated()
    {
        // Arrange
        var teamCreate = new TeamCreateDto { Name = $"test_{Guid.NewGuid()}" };

        // Act
        var postResult = await _client.PostAsJsonAsync(BaseRoute, teamCreate);

        // Assert
        postResult.StatusCode.Should().Be(HttpStatusCode.Created);
        var createdResourceUrl = postResult.Headers.GetValues("Location").FirstOrDefault();
        var team = await GetTeamByNameFromDbAsync(teamCreate.Name);

        team.Should().NotBeNull();
        using (new AssertionScope())
        {
            team.Name.Should().Be(teamCreate.Name);
            team.Id.Should().BePositive();
            createdResourceUrl.Should().Be($"{BaseRoute}/{team.Id}");
        }
    }

    [Fact]
    public async Task Put_HappyDay_TeamUpdated()
    {
        // Arrange
        var existingTeam = await GetFirstTeamFromDbAsync();

        var teamUpdate = new TeamCreateDto
        {
            Name = $"Updated_{Guid.NewGuid()}"
        };

        // Act
        var putResult = await _client.PutAsJsonAsync($"{BaseRoute}/{existingTeam.Id}", teamUpdate);

        // Assert
        putResult.StatusCode.Should().Be(HttpStatusCode.OK);

        var team = await GetTeamByIdFromDbAsync(existingTeam.Id);

        team.Should().NotBeNull();
        using (new AssertionScope())
        {
            team.Name.Should().Be(teamUpdate.Name);
            team.Id.Should().Be(existingTeam.Id);
        }
    }

    [Fact]
    public async Task Put_NonExistingId_ReturnsNotFound()
    {
        // Arrange
        var teamUpdate = new TeamCreateDto
        {
            Name = $"Updated_{Guid.NewGuid()}"
        };

        // Act
        var putResult = await _client.PutAsJsonAsync($"{BaseRoute}/-999", teamUpdate);

        // Assert
        putResult.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task Delete_HappyDay_TeamDeleted()
    {
        // Arrange
        var existingTeam = await GetFirstTeamFromDbAsync();

        // Act
        var deleteResult = await _client.DeleteAsync($"{BaseRoute}/{existingTeam.Id}");

        // Assert
        deleteResult.StatusCode.Should().Be(HttpStatusCode.OK);

        var team = await GetTeamByIdFromDbAsync(existingTeam.Id);
        team.Should().BeNull();
    }

    [Fact]
    public async Task Delete_NonExistingId_ReturnsNotFound()
    {
        // Act
        var deleteResult = await _client.DeleteAsync($"{BaseRoute}/-999");

        // Assert
        deleteResult.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
    
    private async Task<Data.Models.Team> GetFirstTeamFromDbAsync()
    {
        using var scope = _fixture.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<RetroDbContext>();
        return await db.Teams.FirstAsync();
    }

    private async Task<Data.Models.Team?> GetTeamByNameFromDbAsync(string name)
    {
        using var scope = _fixture.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<RetroDbContext>();
        return await db.Teams.SingleOrDefaultAsync(t => t.Name == name);
    }
    
    private async Task<Data.Models.Team?> GetTeamByIdFromDbAsync(int id)
    {
        using var scope = _fixture.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<RetroDbContext>();
        return await db.Teams.SingleOrDefaultAsync(t => t.Id == id);
    }
}