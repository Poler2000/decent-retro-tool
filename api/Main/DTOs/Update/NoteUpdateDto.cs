namespace DecentRetroTool.Api.DTOs.Update;

public class NoteUpdateDto
{
    public required string Content { get; init; }
    
    public required int Score { get; init; }
}