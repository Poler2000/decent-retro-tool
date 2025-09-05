namespace DecentRetroTool.Api.DTOs;

public record RetroDetailsDto : RetroDto
{
    public List<SectionDto> Sections { get; set; } = [];
    
    public DateTime CreationDate { get; set; }
}