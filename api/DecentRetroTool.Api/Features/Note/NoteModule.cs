using DecentRetroTool.Api.Configuration;
using DecentRetroTool.Api.Data;
using DecentRetroTool.Api.DTOs;
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
        // builder.MapGet("/", async Task<Created> (RetroDbContext dbContext, [FromQuery] int teamId) =>
        // {
        //     dbContext.Notes.Add(new Data.Models.Note()
        //     {
        //         Score = node.Score,
        //         Text = node.Content,
        //     });
        //
        //     await dbContext.SaveChangesAsync();
        //
        //     return TypedResults.Created();
        // });
        
        builder.MapPost("/", async Task<Created> (RetroDbContext dbContext, [FromBody] NoteDto note) =>
        {
            dbContext.Notes.Add(new Data.Models.Note()
            {
                Score = note.Score,
                Content = note.Content,
                SectionId = note.SectionId
            });

            await dbContext.SaveChangesAsync();

            return TypedResults.Created();
        });
        
        builder.MapPut("/{id:int}", async Task<Results<Ok, NotFound>> (RetroDbContext dbContext, int id, [FromBody] NoteDto noteUpdate) =>
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

        return builder;
    }
}