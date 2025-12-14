using DecentRetroTool.Api.Data;
using DecentRetroTool.Api.DTOs.Create;
using DecentRetroTool.Api.DTOs.Get;
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
        MapGet(builder);
        MapPost(builder);
        MapPut(builder);
        MapDelete(builder);
        
        return builder;
    }

    private static void MapGet(RouteGroupBuilder builder)
    {
        builder.MapGet("/", async Task<Ok<List<TeamGetDto>>>(RetroDbContext dbContext) =>
        {
            var teams = await dbContext.Teams.ToListAsync();
            return TypedResults.Ok(teams.Select(team => new TeamGetDto { Name = team.Name, Id = team.Id }).ToList());
        });

        builder.MapGet("/{id:int}", async Task<Results<Ok<TeamGetDto>, NotFound>>(RetroDbContext dbContext, int id) =>
        {
            var team = await dbContext.Teams
                .Where(team => team.Id == id)
                .SingleOrDefaultAsync();
            
            return team is not null
                ? TypedResults.Ok(new TeamGetDto { Name = team.Name, Id = team.Id })
                : TypedResults.NotFound();
        });
    }
    
    private static void MapPost(RouteGroupBuilder builder)
    {
        builder.MapPost("/", async Task<Ok<int>> (RetroDbContext dbContext, [FromBody] TeamCreateDto teamCreate) =>
        {
            var newTeam = new Data.Models.Team()
            {
                Name = teamCreate.Name,
                Retros = []
            };
            var result = dbContext.Teams.Add(newTeam);
            await dbContext.SaveChangesAsync();
            
            return TypedResults.Ok(result.Entity.Id);
        });
    }
    
    private static void MapPut(RouteGroupBuilder builder)
    {
        builder.MapPut("/{id:int}", async Task<Results<Ok, NotFound>> (RetroDbContext dbContext, int id, [FromBody] TeamCreateDto teamUpdate) =>
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
    }
    
    private static void MapDelete(RouteGroupBuilder builder)
    {
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
    }
}