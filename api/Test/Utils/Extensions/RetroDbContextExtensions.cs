using DecentRetroTool.Api.Data;
using DecentRetroTool.Api.Data.Models;

namespace DecentRetroTool.Api.Test.Utils.Extensions;

public static class RetroDbContextExtensions
{
    public static void AddDefaultData(this RetroDbContext context)
    { 
        context.Teams.AddRange(TestData.TestData.Teams);
        context.SaveChanges();
    }
}