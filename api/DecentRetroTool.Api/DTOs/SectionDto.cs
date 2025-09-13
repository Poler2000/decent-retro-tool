namespace DecentRetroTool.Api.DTOs;

public record SectionDto
{
    public required int Id { get; set; }
    
    public required string Title { get; set; }

    public bool IsHidden { get; set; } = false;

    public List<NoteDto> Notes { get; set; } = [];
    
    public required int RetroId { get; set; }
}