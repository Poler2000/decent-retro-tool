# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /source

COPY *.sln ./api/
COPY *.csproj ./api/
WORKDIR /source/api
RUN dotnet restore

COPY . .
WORKDIR /source/api
RUN dotnet publish -c release --property:PublishDir=./publish
WORKDIR /source/api/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /source/api/publish .
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
CMD ["dotnet", "DecentRetroTool.Api.dll"]