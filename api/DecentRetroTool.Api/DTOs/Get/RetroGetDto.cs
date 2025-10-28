namespace DecentRetroTool.Api.DTOs.Get;

public record RetroGetDto
{
    public required int Id { get; init; }

    public required string Title { get; init; }
    
    public required int TeamId { get; init; }

    public List<SectionGetDto> Sections { get; init; } = [];
    
    public DateTime CreationDate { get; init; }
}