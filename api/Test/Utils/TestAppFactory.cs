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
            Configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.Test.json")
                .Build();
 
            config.AddConfiguration(Configuration);
        });
        builder.ConfigureTestServices(_ => { });
    }
}