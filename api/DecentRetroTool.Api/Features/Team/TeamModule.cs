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
            var team = await dbContext.Teams
                .Where(team => team.Id == id)
                .SingleOrDefaultAsync();
            
            return team is not null
                ? TypedResults.Ok(new TeamDto { Name = team.Name, Id = team.Id })
                : TypedResults.NotFound();
        });
        
        builder.MapPost("/", async Task<Ok<int>> (RetroDbContext dbContext, [FromBody] TeamDto team) =>
        {
            var newTeam = new Data.Models.Team()
            {
                Name = team.Name,
                Retros = []
            };
            var result = dbContext.Teams.Add(newTeam);
            await dbContext.SaveChangesAsync();
            
            return TypedResults.Ok(result.Entity.Id);
        });
        
        builder.MapPut("/{id:int}", async Task<Results<Ok, NotFound>> (RetroDbContext dbContext, int id, [FromBody] TeamDto teamUpdate) =>
        {
            var team = await dbContext.Teams
                .Where(team => team.Id == id)
                .SingleOrDefaultAsync();

            if (team is null)
            {
                return TypedResults.NotFound();
            }
            
            team.Name = teamUpdate.Name;
            //dbContext.Update(team); // TODO[PP]: check if needed (relates to entity tracking)
            await dbContext.SaveChangesAsync();
            return TypedResults.Ok();
        });

        builder.MapDelete("/{id:int}", async Task<Results<Ok, NotFound>> (RetroDbContext dbContext, int id) =>
        {
            var team = await dbContext.Teams
                .SingleOrDefaultAsync(team => team.Id == id);

            if (team is null)
            {
                return TypedResults.NotFound();
            }

            dbContext.Teams.Remove(team);
            await dbContext.SaveChangesAsync();
            return TypedResults.Ok();
        });
        
        return builder;
    }
}