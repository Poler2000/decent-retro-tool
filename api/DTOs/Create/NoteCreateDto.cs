namespace DecentRetroTool.Api.DTOs.Create;

public class NoteCreateDto
{
    public required string Content { get; init; }
    
    public required int Score { get; init; }
    
    public required int SectionId { get; init; }
}