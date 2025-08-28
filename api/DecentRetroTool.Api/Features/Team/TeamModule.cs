using DecentRetroTool.Api.Data;
using DecentRetroTool.Api.DTOs;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DecentRetroTool.Api.Features.Team;

public static class TeamModule
{
    public static void RegisterTeamEndpoints(this IEndpointRouteBuilder builder)
    {
        builder.MapGroup("teams")
            .RegisterEndpoints()
            .WithTags("Teams");
    }

    private static RouteGroupBuilder RegisterEndpoints(this RouteGroupBuilder builder)
    {
        builder.MapGet("/", async Task<Ok<List<TeamDto>>>(RetroDbContext dbContext) =>
        {
            var teams = await dbContext.Teams.ToListAsync();
            return TypedResults.Ok(teams.Select(team => new TeamDto { Name = team.Name, Id = team.Id }).ToList());
        });
        
        builder.MapGet("/{id:int}", async Task<Results<Ok<TeamDto>, NotFound>>(RetroDbContext dbContext, int id) =>
        {
            var team = await dbContext.Teams.Where(team => team.Id == id).SingleOrDefaultAsync();
            return team is not null
                ? TypedResults.Ok(new TeamDto { Name = team.Name, Id = team.Id })
                : TypedResults.NotFound();
        });
        
        builder.MapPost("/", async Task<Ok<int>> (RetroDbContext dbContext, [FromBody] TeamDto team) =>
        {
            var result = dbContext.Teams.Add(new Data.Models.Team());
            await dbContext.SaveChangesAsync();
            
            return TypedResults.Ok(result.Entity.Id);
        });
        
        return builder;
    }
}