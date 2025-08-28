namespace DecentRetroTool.Api.Data.Models;

public class Section
{
    public int Id { get; set; }

    public string Title { get; set; }
    
    public IList<Note> Notes { get; set; }
}