using System.Net;
using System.Net.Http.Json;
using DecentRetroTool.Api.Data;
using DecentRetroTool.Api.DTOs.Create;
using DecentRetroTool.Api.DTOs.Get;
using DecentRetroTool.Api.DTOs.Update;
using DecentRetroTool.Api.Test.Utils;
using FluentAssertions;
using FluentAssertions.Execution;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DecentRetroTool.Api.Test.Features.Note;

public class NoteModuleTests(TestAppFactory fixture) : IntegrationTestBase(fixture)
{
    private const string BaseRoute = "/decent-retro-tool.api/notes";
    
    [Fact]
    public async Task Get_ExistingId_ReturnsNote()
    {
        // Arrange
        var expectedNote = await GetFirstNoteFromDbAsync();

        // Act
        var result = await _client.GetAsync($"{BaseRoute}/{expectedNote.Id}");

        // Assert
        result.IsSuccessStatusCode.Should().BeTrue();
        var dto = await result.Content.ReadFromJsonAsync<NoteGetDto>();
        dto.Should().BeEquivalentTo(expectedNote);
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
    public async Task Post_HappyDay_NoteCreated()
    {
        // Arrange
        var noteCreate = new NoteCreateDto { Content = $"test_{Guid.NewGuid()}", Score = 3, SectionId = 5 };

        // Act
        var postResult = await _client.PostAsJsonAsync(BaseRoute, noteCreate);

        // Assert
        postResult.StatusCode.Should().Be(HttpStatusCode.Created);
        var createdResourceUrl = postResult.Headers.GetValues("Location").FirstOrDefault();
        var note = await GetNoteByContentFromDbAsync(noteCreate.Content);

        using (new AssertionScope())
        {
            note.Should().NotBeNull();
            note.Score.Should().Be(noteCreate.Score);
            note.SectionId.Should().Be(noteCreate.SectionId);
            note.Id.Should().BePositive();
            createdResourceUrl.Should().Be($"{BaseRoute}/{note.Id}");
        }
    }

    [Fact]
    public async Task Post_SectionDoesNotExists_ReturnsNotFound()
    {
        // Arrange
        var noteCreate = new NoteCreateDto { Content = $"test_{Guid.NewGuid()}", Score = 3, SectionId = -999 };

        // Act
        var postResult = await _client.PostAsJsonAsync(BaseRoute, noteCreate);

        // Assert
        postResult.StatusCode.Should().Be(HttpStatusCode.NotFound);

        var note = await GetNoteByContentFromDbAsync(noteCreate.Content);
        note.Should().BeNull();
    }


    [Fact]
    public async Task Put_HappyDay_NoteUpdated()
    {
        // Arrange
        var existingNote = await GetFirstNoteFromDbAsync();

        var noteUpdate = new NoteUpdateDto
        {
            Content = $"Test Content {Guid.NewGuid()}",
            Score = existingNote.Score + 3,
        };

        // Act
        var postResult = await _client.PutAsJsonAsync($"{BaseRoute}/{existingNote.Id}", noteUpdate);

        // Assert
        postResult.StatusCode.Should().Be(HttpStatusCode.OK);

        var note = await GetNoteByIdFromDbAsync(existingNote.Id);

        using (new AssertionScope())
        {
            note.Should().NotBeNull();
            note.Score.Should().Be(noteUpdate.Score);
            note.SectionId.Should().Be(existingNote.SectionId);
            note.Id.Should().BePositive();
        }
    }

    [Fact]
    public async Task Put_NonExistingId_ReturnsNotFound()
    {
        // Arrange
        var noteUpdate = new NoteUpdateDto
        {
            Content = $"Test Content {Guid.NewGuid()}",
            Score = 12,
        };

        // Act
        var postResult = await _client.PutAsJsonAsync($"{BaseRoute}/-999", noteUpdate);

        // Assert
        postResult.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task Delete_HappyDay_NoteDeleted()
    {
        // Arrange
        var existingNote = await GetFirstNoteFromDbAsync();

        // Act
        var postResult = await _client.DeleteAsync($"{BaseRoute}/{existingNote.Id}");

        // Assert
        postResult.StatusCode.Should().Be(HttpStatusCode.OK);

        var note = await GetNoteByIdFromDbAsync(existingNote.Id);
        note.Should().BeNull();
    }

    [Fact]
    public async Task Delete_NonExistingId_ReturnsNotFound()
    {
        // Act
        var postResult = await _client.DeleteAsync($"{BaseRoute}/-999");

        // Assert
        postResult.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }
    
    private async Task<Data.Models.Note> GetFirstNoteFromDbAsync()
    {
        using var scope = _fixture.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<RetroDbContext>();
        return await db.Notes.FirstAsync();
    }

    private async Task<Data.Models.Note?> GetNoteByContentFromDbAsync(string content)
    {
        using var scope = _fixture.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<RetroDbContext>();
        return await db.Notes.SingleOrDefaultAsync(n => n.Content == content);
    }
    
    private async Task<Data.Models.Note?> GetNoteByIdFromDbAsync(int id)
    {
        using var scope = _fixture.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<RetroDbContext>();
        return await db.Notes.SingleOrDefaultAsync(n => n.Id == id);
    }
}