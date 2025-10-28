using System.Text;
using System.Text.Json;
using DecentRetroTool.Api.Configuration;
using DecentRetroTool.Api.Data;
using DecentRetroTool.Api.Data.Models;
using DecentRetroTool.Api.DTOs;
using DecentRetroTool.Api.DTOs.Create;
using DecentRetroTool.Api.DTOs.Get;
using DecentRetroTool.Api.DTOs.Update;
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
        MapGet(builder);
        MapGetAsFile(builder);
        MapPost(builder);
        MapPut(builder);
        MapDelete(builder);
        
        return builder;
    }
    
    private static void MapGet(RouteGroupBuilder builder)
    {
        builder.MapGet("/", async Task<Ok<List<RetroGetDto>>>(RetroDbContext dbContext, [FromQuery] int? teamId) =>
        {
            var retros = await dbContext.Retros
                .Where(retro => retro.TeamId == teamId)
                .Include(retro => retro.Sections)
                .ToListAsync();
            
            return TypedResults.Ok(retros.Select(retro => new RetroGetDto()
            {
                Id = retro.Id,
                Title = retro.Title, 
                TeamId = retro.TeamId,
                Sections = retro.Sections.Select(section => new SectionGetDto
                {
                    Id = section.Id,
                    IsHidden = section.IsHidden,
                    Notes = [],
                    RetroId = retro.Id,
                    Title = section.Title
                }).ToList()
            }).ToList());
        });

        builder.MapGet("/{id:int}", async Task<Results<Ok<RetroGetDto>, NotFound>>(RetroDbContext dbContext, int id) =>
        {
            var retro = await dbContext.Retros
                .Include(retro => retro.Sections)
                .ThenInclude(section => section.Notes)
                .SingleOrDefaultAsync(retro => retro.Id == id);
            
            return retro is not null 
                ? TypedResults.Ok(new RetroGetDto()
                {
                    Id = retro.Id,
                    Title = retro.Title, 
                    TeamId = retro.TeamId,
                    CreationDate = retro.CreationDate,
                    Sections = retro.Sections.Select(section => new SectionGetDto()
                    {
                        Id = section.Id,
                        Title = section.Title,
                        Notes = section.Notes.Select(note => new NoteGetDto()
                        {
                            Id = note.Id,
                            Content = note.Content,
                            Score = note.Score,
                            SectionId = note.SectionId,
                            CreationTime = note.CreationTime
                        }).ToList(),
                        IsHidden = section.IsHidden,
                        RetroId = section.RetroId
                    }).ToList()
                })
                : TypedResults.NotFound();
        });
    }
    
    private static void MapGetAsFile(RouteGroupBuilder builder)
    {
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

            var result = new RetroGetDto()
            {
                Id = retro.Id,
                Title = retro.Title,
                TeamId = retro.TeamId,
                CreationDate = retro.CreationDate,
                Sections = retro.Sections.Select(section => new SectionGetDto()
                {
                    Id = section.Id,
                    Title = section.Title,
                    Notes = section.Notes.Select(note => new NoteGetDto()
                    {
                        Id = note.Id,
                        Content = note.Content,
                        Score = note.Score,
                        SectionId = note.SectionId,
                        CreationTime = note.CreationTime
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
        }).Produces(StatusCodes.Status200OK);
    }
    
    private static void MapPost(RouteGroupBuilder builder)
    {
        builder.MapPost("/", async Task<Created> (RetroDbContext dbContext, [FromBody] RetroCreateDto retroCreate) =>
        {
            var newRetro = dbContext.Retros.Add(new Data.Models.Retro()
            {
                Title = retroCreate.Title,
                CreationDate = DateTime.Now,
                TeamId = retroCreate.TeamId,
                Sections = RetroConfiguration.DefaultSections.Select(title => new Section()
                {
                    Title = title,
                    IsHidden = false,
                    Notes = []
                }).ToList()
            });
            await dbContext.SaveChangesAsync();

            return TypedResults.Created($"{ApiConfiguration.PathBase}/retros/{newRetro.Entity.Id}");
        });
    }
    
    private static void MapPut(RouteGroupBuilder builder)
    {
        builder.MapPut("/{id:int}", async Task<Results<Ok, NotFound>> (RetroDbContext dbContext, int id, [FromBody] RetroUpdateDto retroUpdate) =>
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
                        RetroId = id,
                        Id = s.Id,
                        IsHidden = s.IsHidden,
                        Notes = s.Notes.Select(note => new Data.Models.Note
                        {
                            Content = note.Content,
                            SectionId = s.Id,
                            Score = note.Score
                        }).ToList(),
                        Title = s.Title 
                    } : new Section()
                    {
                        RetroId = id,
                        IsHidden = s.IsHidden,
                        Notes = s.Notes.Select(note => new Data.Models.Note
                        {
                            Content = note.Content,
                            Score = note.Score
                        }).ToList(),
                        Title = s.Title 
                    }).ToList();
            
            //dbContext.Update(team); // TODO[PP]: check if needed (relates to entity tracking)
            await dbContext.SaveChangesAsync();
            return TypedResults.Ok();
        });
    }
    
    private static void MapDelete(RouteGroupBuilder builder)
    {
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
    }
}