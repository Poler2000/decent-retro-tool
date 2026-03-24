namespace DecentRetroTool.Api.Data.Models;

public class Team
{
    public int Id { get; set; }
    
    public string Name { get; set; }

    public IList<Retro> Retros { get; set; }
}