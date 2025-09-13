using DecentRetroTool.Api.Data;
using DecentRetroTool.Api.DTOs;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DecentRetroTool.Api.Features.Section;

public static class SectionModule
{
        public static void RegisterSectionEndpoints(this IEndpointRouteBuilder builder)
    {
        builder.MapGroup("sections")
            .RegisterEndpoints()
            .WithTags("Sections");
    }

    private static RouteGroupBuilder RegisterEndpoints(this RouteGroupBuilder builder)
    {
        builder.MapPost("/", async Task<Created> (RetroDbContext dbContext, [FromBody] SectionDto section) =>
        {
            dbContext.Sections.Add(new Data.Models.Section()
            {
                Title = section.Title,
                Notes = [],
                RetroId = section.RetroId
            });

            await dbContext.SaveChangesAsync();

            return TypedResults.Created();
        });
        
        builder.MapPut("/{id:int}", async Task<Results<Ok, NotFound>> (RetroDbContext dbContext, int id, [FromBody] SectionDto sectionUpdate) =>
        {
            var section = await dbContext.Sections
                .SingleOrDefaultAsync(s => s.Id == id);

            if (section is null)
            {
                return TypedResults.NotFound();
            }

            section.Title = sectionUpdate.Title;
            section.IsHidden = sectionUpdate.IsHidden;

            //dbContext.Update(team); // TODO[PP]: check if needed (relates to entity tracking)
            await dbContext.SaveChangesAsync();

            return TypedResults.Ok();
        });
        
        builder.MapDelete("/{id:int}", async Task<Results<Ok, NotFound>> (RetroDbContext dbContext, int id) =>
        {
            var section = await dbContext.Sections
                .SingleOrDefaultAsync(s => s.Id == id);

            if (section is null)
            {
                return TypedResults.NotFound();
            }

            dbContext.Sections.Remove(section);
            await dbContext.SaveChangesAsync();

            return TypedResults.Ok();
        });

        return builder;
    }
}