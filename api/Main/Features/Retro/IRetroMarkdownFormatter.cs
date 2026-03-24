namespace DecentRetroTool.Api.Features.Retro;

public interface IRetroMarkdownFormatter
{
    string ToMarkdown(Data.Models.Retro retro);
}