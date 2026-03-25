using System.Text;

namespace DecentRetroTool.Api.Features.Retro;

public class RetroMarkdownFormatter : IRetroMarkdownFormatter
{
    public string ToMarkdown(Data.Models.Retro retro)
    {
        var builder = new StringBuilder();
        
        builder.AppendLine($"# {retro.Title}");
        builder.AppendLine();
        builder.AppendLine($"### {retro.CreationTime:dd/MM/yyyy dddd}");
        builder.AppendLine();

        var sections = retro.Sections;
        var sectionTitles = sections.Select(section => section.Title).ToList();
        
        builder.AppendLine($"|{string.Join('|', sectionTitles)}|");
        var separator = string.Join('|', sectionTitles.Select(_ => "---"));
        builder.AppendLine($"|{separator}|");
        
        var sectionNotes = sections
            .Select(section => section.Notes.OrderByDescending(n => n.Score).ToList())
            .ToList();
        var maxNotes = sectionNotes.Max(notes => notes.Count);

        for (var i = 0; i < maxNotes; i++)
        {
            var rowNotes = sectionNotes
                .Select(notes => notes.ElementAtOrDefault(i))
                .Select(note => note is not null 
                    ? $"[{note.Score}] {note.Content}" 
                    : string.Empty)
                .ToList();
            builder.AppendLine($"|{string.Join('|', rowNotes)}|");
        }

        return builder.ToString();
    }
}