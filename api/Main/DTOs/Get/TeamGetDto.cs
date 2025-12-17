namespace DecentRetroTool.Api.DTOs.Get;

public record TeamGetDto
{
    public required string Name { get; init; }
    
    public required int Id { get; init; }
}
