using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;

namespace DecentRetroTool.Api.Test.Utils;

public class TestAppFactory : WebApplicationFactory<Program>
{
    private IConfiguration Configuration { get; set; }
    
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureAppConfiguration(config =>
        {
            var inMemorySettings = new Dictionary<string, string?>
            {
                ["ConnectionStrings:RetroDbConnectionString"] = $"Data Source=retroTest_{Guid.NewGuid()}.db"
            };

            Configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(inMemorySettings)
                .Build();
            
            config.AddConfiguration(Configuration);
        });
        builder.ConfigureTestServices(_ => { });
    }
}