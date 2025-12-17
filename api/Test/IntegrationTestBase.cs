using DecentRetroTool.Api.Data;
using DecentRetroTool.Api.Test.Utils;
using DecentRetroTool.Api.Test.Utils.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DecentRetroTool.Api.Test;

[Trait("Category", "Integration")]
public class IntegrationTestBase : IClassFixture<TestAppFactory>
{
    protected readonly TestAppFactory _fixture;
    protected readonly HttpClient _client;

    public IntegrationTestBase(TestAppFactory fixture)
    {
        _fixture = fixture;
        _client = fixture.CreateClient();
        
        using var scope = _fixture.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<RetroDbContext>();
        
        context.Database.EnsureDeleted();
        context.Database.Migrate();
        context.AddDefaultData();
    }
    
    public void Dispose()
    {
        using var scope = _fixture.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<RetroDbContext>();
        context.Database.EnsureDeleted();
    }
}