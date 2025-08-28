namespace DecentRetroTool.Api.DTOs;

public record TeamDto
{
    public required string Name { get; init; }
    
    public int Id { get; init; }
}
