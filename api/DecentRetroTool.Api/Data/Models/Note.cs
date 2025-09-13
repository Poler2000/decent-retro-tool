namespace DecentRetroTool.Api.Data.Models;

public class Note
{
    public int Id { get; set; }

    public string Content { get; set; }
    
    public int Score { get; set; }
    
    public int SectionId { get; set; }
}