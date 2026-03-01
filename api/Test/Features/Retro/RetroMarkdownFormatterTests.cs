using DecentRetroTool.Api.Features.Retro;
using FluentAssertions;
using Xunit;
using Section = DecentRetroTool.Api.Data.Models.Section;
using RetroModel = DecentRetroTool.Api.Data.Models.Retro;
using NoteModel = DecentRetroTool.Api.Data.Models.Note;

namespace DecentRetroTool.Api.Test.Features.Retro;

public class RetroMarkdownFormatterTests
{
    [Fact]
    public void ToMarkdown_WithSectionsAndNotes_ReturnsCorrectMarkdownTable()
    {
        // Arrange
        var formatter = new RetroMarkdownFormatter();
        var retro = new RetroModel
        {
            Title = "Sprint Retro",
            CreationTime = new DateTime(2026, 2, 21),
            Sections = new List<Section>
            {
                new()
                {
                    Title = "What went well?",
                    Notes = 
                    [
                        new NoteModel { Content = "Note 1-2", Score = 2 },
                        new NoteModel { Content = "Note 1-1", Score = 3 }
                    ]
                },
                new()
                {
                    Title = "What could be improved?",
                    Notes = 
                    [
                        new NoteModel { Content = "Note 2-1", Score = 1 }
                    ]
                }
            }
        };

        // Act
        var result = formatter.ToMarkdown(retro);

        // Assert
        var expectedLines = new[]
        {
            "# Sprint Retro",
            "### 21/02/2026 Saturday",
            "|What went well?|What could be improved?|",
            "|---|---|",
            "|[3] Note 1-1|[1] Note 2-1|",
            "|[2] Note 1-2||",
            ""
        };
        var expected = string.Join(Environment.NewLine, expectedLines);
        result.Should().Be(expected);
    }
}
