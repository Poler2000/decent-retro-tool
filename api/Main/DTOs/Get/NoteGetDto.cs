namespace DecentRetroTool.Api.DTOs.Get;

public record NoteGetDto
{
    public required int Id { get; init; }
    
    public required string Content { get; init; }
    
    public required int Score { get; init; }
    
    public required int SectionId { get; init; }
    
    public required DateTime CreationTime { get; init; }
}