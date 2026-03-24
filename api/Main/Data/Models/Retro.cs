namespace DecentRetroTool.Api.Data.Models;

public class Retro
{
    public int Id { get; set; }

    public string Title { get; set; }
    
    public DateTime CreationTime { get; set; }

    public ICollection<Section> Sections { get; set; }

    public int TeamId { get; set; }

    public Retro()
    {
        CreationTime = DateTime.Now;
    }
}