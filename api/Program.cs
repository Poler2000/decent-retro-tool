using DecentRetroTool.Api.Configuration;
using DecentRetroTool.Api.Data;
using DecentRetroTool.Api.Data.Extensions;
using DecentRetroTool.Api.Features.Note;
using DecentRetroTool.Api.Features.Retro;
using DecentRetroTool.Api.Features.Team;
using Microsoft.EntityFrameworkCore;

const string AllowSpecificOrigins = "allowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<RetroDbContext>(
    o => o.UseSqlite(builder.Configuration.GetConnectionString("DataDbConnectionString")));
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowSpecificOrigins, policy =>
    {
        policy.WithOrigins("https://localhost:5173", "http://localhost:5173", "https://localhost:3000",
                "http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
builder.Services.AddHttpLogging(o => { });

var app = builder.Build();

app.Map(ApiConfiguration.PathBase, retroApp =>
{
    retroApp.UseRouting();

    retroApp.UseCors(AllowSpecificOrigins);

    if (app.Environment.IsDevelopment())
    {
        retroApp.UseSwagger();
        retroApp.UseSwaggerUI();
        retroApp.UseHttpLogging();
    }

    retroApp.UseEndpoints(endpoints =>
    {
        endpoints.RegisterTeamEndpoints();
        endpoints.RegisterRetroEndpoints();
        endpoints.RegisterNoteEndpoints();
    });

    retroApp.UseHttpsRedirection();
});

using (var serviceScope = app.Services.GetService<IServiceScopeFactory>()!.CreateScope())
{
    var context = serviceScope.ServiceProvider.GetRequiredService<RetroDbContext>();

    if (app.Environment.IsDevelopment())
    {
        context.Database.EnsureDeleted();
    }

    context.Database.Migrate();

    if (app.Environment.IsDevelopment())
    {
        context.AddDefaultData();
    }
}

app.Run();