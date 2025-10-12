namespace DecentRetroTool.Api.DTOs;

public record RetroDto
{
    public required int Id { get; init; }

    public required string Title { get; init; }
    
    public required int TeamId { get; init; }
    
    public List<SectionDto> Sections { get; init; }
}