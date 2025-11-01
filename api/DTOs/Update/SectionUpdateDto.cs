using DecentRetroTool.Api.DTOs.Create;

namespace DecentRetroTool.Api.DTOs.Update;

public class SectionUpdateDto
{
    public required int Id { get; init; }
    
    public required string Title { get; init; }
    
    public bool IsHidden { get; init; } = false;
    
    public List<NoteCreateDto> Notes { get; init; } = [];
}