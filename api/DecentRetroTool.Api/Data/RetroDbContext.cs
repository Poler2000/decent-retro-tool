using DecentRetroTool.Api.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace DecentRetroTool.Api.Data;

public class RetroDbContext : DbContext
{
    public DbSet<Team> Teams { get; set; }
    public DbSet<Retro> Retros { get; set; }
    
    public DbSet<Note> Notes { get; set; }
    
    public RetroDbContext(DbContextOptions<RetroDbContext> options) : base(options) {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Team>()
            .HasIndex(team => team.Name)
            .IsUnique();
    }
}