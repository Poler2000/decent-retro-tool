# Decent Retro Tool
[![CI](https://github.com/Poler2000/decent-retro-tool/actions/workflows/dotnet.yml/badge.svg)](https://github.com/Poler2000/decent-retro-tool/actions/workflows/dotnet.yml)

- [:bulb: Overview](#bulb-overview)
- [:computer: Installation](#computer-installation)
  - [:whale2: Installation with Docker](#whale2-installation-with-docker)
  - [:wrench: Manual Installation](#wrench-manual-installation)

## :bulb: Overview

![Decent Retro Tool GIF](res/decent-retro-tool.gif)

**Decent Retro Tool** is a simple application aimed to assist you with conducting scrum retrospective meetings.

Gather notes, vote and discuss! You can organize retros for multiple teams and easily export or import their contents as json files. Sections can be customized on the fly.

- **Simple**: Just what you need - no unnecessary feature bloat.
- **Customizable**: You can modify the workflow to best suit your needs.
- **Tested in practice**: I use it myself to help my team with Retro meetings.
- **Easy to install**: With Docker!
- **Secure**: Since you host the app locally, your data remains safe.

## :computer: Installation

- Decent Retro Tool comes with docker support for easy build an usage
- Alternatively, you can build the code yourself

### :whale2: Installation with Docker

#### Requirements:

- You need to have Docker and Docker Compose installed. Easiest way to do so is with Docker Desktop.
- Use Linux container mode in Docker (default).

To build and run the app, run the following commands, while in repository's root directory:

```bash
docker-compose build
docker-compose up
```

Go to http://localhost:3000/ and enjoy using the app!

### :wrench: Manual Installation

#### Requirements

- **node.js**
- **.NET 8 SDK** (or newer)

To build and run the app, run the following commands, while in repository's root directory:

Backend:

```bash
dotnet run --project .\api\Main\DecentRetroTool.Api.csproj
```

Frontend:

```bash
cd client
npm install
npm run build
npm run dev
```

Go to https://localhost:5173/ and enjoy using the app!
