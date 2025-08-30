using DecentRetroTool.Api.Data;
using DecentRetroTool.Api.Data.Models;
using DecentRetroTool.Api.Features.Retro;
using DecentRetroTool.Api.Features.Team;
using Microsoft.EntityFrameworkCore;

const string AllowSpecificOrigins = "allowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<RetroDbContext>(
    o => o.UseSqlite(builder.Configuration.GetConnectionString("DataDbConnectionString")));
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowSpecificOrigins, policy =>
    {
        policy.WithOrigins("https://localhost:5173", "http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.Map("/decent-retro-tool.api", retroApp =>
{
    retroApp.UseRouting();
    
    retroApp.UseCors(AllowSpecificOrigins);

    if (app.Environment.IsDevelopment())
    {
        retroApp.UseSwagger();
        retroApp.UseSwaggerUI();
    }

    retroApp.UseEndpoints(endpoints =>
    {
        endpoints.RegisterTeamEndpoints();
        endpoints.RegisterRetroEndpoints();
    });

    retroApp.UseHttpsRedirection();
});

using (var serviceScope = app.Services.GetService<IServiceScopeFactory>()!.CreateScope())
{
    var context = serviceScope.ServiceProvider.GetRequiredService<RetroDbContext>();
    context.Database.EnsureDeleted();
    context.Database.Migrate();
    
    context.Teams.Add(new Team() { Name = "Stork", Retros = new List<Retro>()
    {
        new()
        {
            CreationDate = DateTime.Today,
            Title = "Stork 1"
        },
        new()
        {
            CreationDate = DateTime.Today,
            Title = "Stork 2"
        },
        new()
        {
            CreationDate = DateTime.Today,
            Title = "Stork 3"
        }
    }});
    context.Teams.Add(new Team() { Name = "Alpha", Retros = new List<Retro>()
    {
        new()
        {
            CreationDate = DateTime.Today,
            Title = "Alpha 1"
        },
        new()
        {
            CreationDate = DateTime.Today,
            Title = "Alpha 2"
        },
    }});
    context.Teams.Add(new Team() { Name = "Beta", Retros = new List<Retro>()
    {
        new()
        {
            CreationDate = DateTime.Today,
            Title = "Beta 1"
        },
    }});
    context.Teams.Add(new Team() { Name = "Omega" });
    context.SaveChanges();
}

app.Run();
