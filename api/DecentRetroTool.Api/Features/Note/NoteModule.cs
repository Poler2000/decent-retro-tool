using DecentRetroTool.Api.Data;
using DecentRetroTool.Api.DTOs;
using DecentRetroTool.Api.DTOs.Create;
using DecentRetroTool.Api.DTOs.Get;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DecentRetroTool.Api.Features.Note;

public static class NoteModule
{
    public static void RegisterNoteEndpoints(this IEndpointRouteBuilder builder)
    {
        builder.MapGroup("notes")
            .RegisterEndpoints()
            .WithTags("Notes");
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
        builder.MapGet("/{id:int}", async Task<Results<Ok<NoteGetDto>, NotFound>> (RetroDbContext dbContext, [FromQuery] int id) =>
        {
            var note = await dbContext.Notes
                .SingleOrDefaultAsync(n => n.Id == id);

            if (note is null)
            {
                return TypedResults.NotFound();
            }

            return TypedResults.Ok(new NoteGetDto
            {
                Id = note.Id,
                Content = note.Content,
                Score = note.Score,
                SectionId = note.SectionId,
                CreationTime = note.CreationTime
            });
        });
    }
    
    private static void MapPost(RouteGroupBuilder builder)
    {
        builder.MapPost("/", async Task<Created> (RetroDbContext dbContext, [FromBody] NoteCreateDto noteCreate) =>
        {
            dbContext.Notes.Add(new Data.Models.Note()
            {
                Score = noteCreate.Score,
                Content = noteCreate.Content,
                SectionId = noteCreate.SectionId,
                CreationTime = DateTime.Now
            });

            await dbContext.SaveChangesAsync();

            return TypedResults.Created();
        });
    }
    
    private static void MapPut(RouteGroupBuilder builder)
    {
        builder.MapPut("/{id:int}", async Task<Results<Ok, NotFound>> (RetroDbContext dbContext, int id, [FromBody] NoteCreateDto noteUpdate) =>
        {
            var note = await dbContext.Notes
                .SingleOrDefaultAsync(n => n.Id == id);

            if (note is null)
            {
                return TypedResults.NotFound();
            }

            note.Score = noteUpdate.Score;
            note.Content = noteUpdate.Content;

            //dbContext.Update(team); // TODO[PP]: check if needed (relates to entity tracking)
            await dbContext.SaveChangesAsync();

            return TypedResults.Ok();
        });
    }
    
    private static void MapDelete(RouteGroupBuilder builder)
    {
        builder.MapDelete("/{id:int}", async Task<Results<Ok, NotFound>> (RetroDbContext dbContext, int id) =>
        {
            var note = await dbContext.Notes
                .SingleOrDefaultAsync(n => n.Id == id);

            if (note is null)
            {
                return TypedResults.NotFound();
            }

            dbContext.Notes.Remove(note);
            await dbContext.SaveChangesAsync();

            return TypedResults.Ok();
        });
    }
}