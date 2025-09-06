namespace DecentRetroTool.Api.DTOs;

public record RetroDto
{
    public required int Id { get; init; }

    public required string Name { get; init; }
    
    public required int TeamId { get; init; }
}