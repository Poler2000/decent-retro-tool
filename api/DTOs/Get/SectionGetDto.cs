namespace DecentRetroTool.Api.DTOs.Get;

public record SectionGetDto
{
    public required int Id { get; init; }
    
    public required string Title { get; init; }

    public bool IsHidden { get; init; } = false;

    public List<NoteGetDto> Notes { get; init; } = [];
    
    public required int RetroId { get; init; }
}