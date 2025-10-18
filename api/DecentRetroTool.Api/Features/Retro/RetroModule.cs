using System.Text;
using System.Text.Json;
using DecentRetroTool.Api.Configuration;
using DecentRetroTool.Api.Data;
using DecentRetroTool.Api.Data.Models;
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
                            Content = note.Content,
                            Score = note.Score,
                            SectionId = note.SectionId
                        }).ToList(),
                        IsHidden = section.IsHidden,
                        RetroId = section.RetroId
                    }).ToList()
                })
                : TypedResults.NotFound();
        });
        
        builder.MapGet("/{id:int}/download", async Task<Results<FileContentHttpResult, NotFound>>(RetroDbContext dbContext, int id) =>
        {
            var retro = await dbContext.Retros
                .Include(retro => retro.Sections)
                .ThenInclude(section => section.Notes)
                .SingleOrDefaultAsync(retro => retro.Id == id);

            if (retro is null)
            {
                return TypedResults.NotFound();
            }

            var result = new RetroDetailsDto()
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
                        Content = note.Content,
                        Score = note.Score,
                        SectionId = note.SectionId
                    }).ToList(),
                    IsHidden = section.IsHidden,
                    RetroId = section.RetroId
                }).ToList()
            };
            
            var json = JsonSerializer.Serialize(result, new JsonSerializerOptions
            {
                WriteIndented = true,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
            var bytes = Encoding.UTF8.GetBytes(json);

            return TypedResults.File(
                bytes,
                contentType: "application/json",
                fileDownloadName: $"retro_{retro.Id}.json"
            ); 
        });

        builder.MapPost("/", async Task<Created> (RetroDbContext dbContext, [FromBody] RetroDto retro) =>
        {
            var newRetro = dbContext.Retros.Add(new Data.Models.Retro()
            {
                Title = retro.Title,
                CreationDate = DateTime.Now,
                TeamId = retro.TeamId,
                Sections = []
            });
            await dbContext.SaveChangesAsync();

            return TypedResults.Created($"{ApiConfiguration.PathBase}/retros/{newRetro.Entity.Id}");
        });
        
        builder.MapPut("/{id:int}", async Task<Results<Ok, NotFound>> (RetroDbContext dbContext, int id, [FromBody] RetroDto retroUpdate) =>
        {
            var retro = await dbContext.Retros
                .Include(retro => retro.Sections)
                .ThenInclude(section => section.Notes)
                .SingleOrDefaultAsync(r => r.Id == id);

            if (retro is null)
            {
                return TypedResults.NotFound();
            }
            
            retro.Title = retroUpdate.Title;
            
            retro.Sections = retroUpdate.Sections
                .Select(s => retro.Sections.Any(section => section.Id == s.Id) 
                    ? new Section() 
                    {
                        RetroId = s.RetroId,
                        Id = s.Id,
                        IsHidden = s.IsHidden,
                        Notes = s.Notes.Select(note => new Data.Models.Note
                        {
                            Content = note.Content,
                            SectionId = s.Id,
                            Score = note.Id
                        }).ToList(),
                        Title = s.Title 
                    } : new Section()
                    {
                        RetroId = s.RetroId,
                        IsHidden = s.IsHidden,
                        Notes = s.Notes.Select(note => new Data.Models.Note
                        {
                            Content = note.Content,
                            Score = note.Id
                        }).ToList(),
                        Title = s.Title 
                    }).ToList();
            
            //dbContext.Update(team); // TODO[PP]: check if needed (relates to entity tracking)
            await dbContext.SaveChangesAsync();
            return TypedResults.Ok();
        });
        
        builder.MapDelete("/{id:int}", async Task<Results<Ok, NotFound>> (RetroDbContext dbContext, int id) =>
        {
            var retro = await dbContext.Retros
                .SingleOrDefaultAsync(team => team.Id == id);

            if (retro is null)
            {
                return TypedResults.NotFound();
            }

            dbContext.Retros.Remove(retro);
            await dbContext.SaveChangesAsync();
            return TypedResults.Ok();
        });
        
        return builder;
    }

}