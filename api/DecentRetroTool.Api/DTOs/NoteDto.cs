namespace DecentRetroTool.Api.DTOs;

public record NoteDto
{
    public required int Id { get; set; }
    
    public required string Content { get; set; }
    
    public required int Score { get; set; }
    
    public required int SectionId { get; set; }

}