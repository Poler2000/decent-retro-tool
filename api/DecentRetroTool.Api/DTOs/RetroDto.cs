namespace DecentRetroTool.Api.DTOs;

public record RetroDto
{
    public required string Title { get; init; }
    
    public required int TeamId { get; init; }
}