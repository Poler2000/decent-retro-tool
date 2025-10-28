namespace DecentRetroTool.Api.DTOs.Update;

public class RetroUpdateDto
{
    public required string Title { get; init; }
    
    public List<SectionUpdateDto> Sections { get; init; } = [];
}