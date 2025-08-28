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
            return TypedResults.Ok(retros.Select(retro => new RetroDto() { Title = retro.Title, TeamId = retro.TeamId }).ToList());
        });
        
        builder.MapGet("/{id:int}", async Task<Results<Ok<RetroDto>, NotFound>>(RetroDbContext dbContext, int id) =>
        {
            var retro = await dbContext.Retros.SingleOrDefaultAsync(retro => retro.Id == id);
            return retro is not null 
                ? TypedResults.Ok(new RetroDto() { Title = retro.Title, TeamId = retro.TeamId })
                : TypedResults.NotFound();
        });

        builder.MapPost("/", async Task<Ok> (RetroDbContext dbContext, [FromBody] RetroDto retro) =>
        {
            dbContext.Retros.Add(new Data.Models.Retro()
            {
                Title = retro.Title,
                CreationDate = DateTime.Now,
                TeamId = retro.TeamId
            });
            await dbContext.SaveChangesAsync();

            return TypedResults.Ok();
        });
        return builder;
    }

}