# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /source

COPY *.sln ./api/
COPY Main/*.csproj ./api/Main/
COPY Test/*.csproj ./api/Test/
WORKDIR /source/api
RUN dotnet restore

COPY . .
WORKDIR /source/api/Main
RUN dotnet publish -c release --property:PublishDir=./publish
WORKDIR /source/api/Main/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /source/api/Main/publish .
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
CMD ["dotnet", "DecentRetroTool.Api.dll"]