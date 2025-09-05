using DecentRetroTool.Api.Configuration;
using DecentRetroTool.Api.Data;
using DecentRetroTool.Api.DTOs;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DecentRetroTool.Api.Features.Retro;

public static class RetroModule
{
    public static void RegisterRetroEndpoints(this IEndpointRouteBuilder builder)
    {
        builder.MapGroup("retros")
            .RegisterEndpoints()
            .WithTags("Retros");
    }

    private static RouteGroupBuilder RegisterEndpoints(this RouteGroupBuilder builder)
    {
        builder.MapGet("/", async Task<Ok<List<RetroDto>>>(RetroDbContext dbContext, [FromQuery] int? teamId) =>
        {
            var retros = await dbContext.Retros
                .Where(retro => retro.TeamId == teamId)
                .ToListAsync();
            return TypedResults.Ok(retros.Select(retro => new RetroDto()
            {
                Id = retro.Id,
                Title = retro.Title, 
                TeamId = retro.TeamId
            }).ToList());
        });
        
        builder.MapGet("/{id:int}", async Task<Results<Ok<RetroDetailsDto>, NotFound>>(RetroDbContext dbContext, int id) =>
        {
            var retro = await dbContext.Retros
                .Include(retro => retro.Sections)
                .ThenInclude(section => section.Notes)
                .SingleOrDefaultAsync(retro => retro.Id == id);
            
            return retro is not null 
                ? TypedResults.Ok(new RetroDetailsDto()
                {
                    Id = retro.Id,
                    Title = retro.Title, 
                    TeamId = retro.TeamId,
                    CreationDate = retro.CreationDate,
                    Sections = retro.Sections.Select(section => new SectionDto()
                    {
                        Id = section.Id,
                        Title = section.Title,
                        Notes = section.Notes.Select(note => new NoteDto()
                        {
                            Id = note.Id,
                            Content = note.Text,
                            Score = note.Score
                        }).ToList()
                    }).ToList()
                })
                : TypedResults.NotFound();
        });

        builder.MapPost("/", async Task<Created> (RetroDbContext dbContext, [FromBody] RetroDto retro) =>
        {
            var newRetro = dbContext.Retros.Add(new Data.Models.Retro()
            {
                Title = retro.Title,
                CreationDate = DateTime.Now,
                TeamId = retro.TeamId
            });
            await dbContext.SaveChangesAsync();

            return TypedResults.Created($"{ApiConfiguration.PathBase}/retros/{newRetro.Entity.Id}");
        });
        return builder;
    }

}