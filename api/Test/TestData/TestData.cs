using DecentRetroTool.Api.Data.Models;

namespace DecentRetroTool.Api.Test.TestData;

public static class TestData
{
    public static List<Team> Teams =
    [
        new()
        {
            Name = "Stork", Retros = new List<Retro>()
            {
                new()
                {
                    CreationTime = DateTime.Today,
                    Title = "Stork 1",
                    Sections = new List<Section>()
                    {
                        new()
                        {
                            Title = "Section 1",
                            Notes =
                            [
                                new Note()
                                {
                                    Score = 4,
                                    Content = "sdflksdfj asj sdhjhsdf hashjn jsdh sdh"
                                },
                                new Note()
                                {
                                    Score = 2,
                                    Content = "Toto"
                                },
                                new Note()
                                {
                                    Score = 3,
                                    Content = "fsdhjbh "
                                }
                            ]
                        },
                        new()
                        {
                            Title = "Section 2 - Hello",
                            Notes = []
                        },
                        new()
                        {
                            Title = "Section 3",
                            Notes =
                            [
                                new Note()
                                {
                                    Score = 4,
                                    Content = "sdflksdfj asj sdhjhsdf hashjn jsdh sdh"
                                },
                                new Note()
                                {
                                    Score = 2,
                                    Content = "Toto 2"
                                }
                            ]
                        },
                        new()
                        {
                            Title = "Section 4",
                            Notes =
                            [
                                new Note()
                                {
                                    Score = 4,
                                    Content = "sdflksdfj asj sdhjhsdf hashjn jsdh sdh"
                                },
                                new Note()
                                {
                                    Score = 2,
                                    Content = "Toto 3"
                                }
                            ]
                        },
                    }
                },
                new()
                {
                    CreationTime = DateTime.Today,
                    Title = "Stork 2",
                    Sections = new List<Section>()
                    {
                        new()
                        {
                            Title = "Section 1",
                            Notes =
                            [
                                new Note()
                                {
                                    Score = 4,
                                    Content = "sdflksdfj asj sdhjhsdf hashjn jsdh sdh"
                                },
                                new Note()
                                {
                                    Score = 2,
                                    Content = "Toto"
                                }
                            ]
                        },
                    },
                },
                new()
                {
                    CreationTime = DateTime.Today,
                    Title = "Stork 3"
                }
            }
        },
        new()
        {
            Name = "Alpha", Retros = new List<Retro>()
            {
                new()
                {
                    CreationTime = DateTime.Today,
                    Title = "Alpha 1"
                },
                new()
                {
                    CreationTime = DateTime.Today,
                    Title = "Alpha 2"
                },
            }
        },
        new()
        {
            Name = "Beta", Retros = new List<Retro>()
            {
                new()
                {
                    CreationTime = DateTime.Today,
                    Title = "Beta 1"
                },
            }
        }
    ];
}