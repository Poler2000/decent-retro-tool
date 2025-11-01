import type TeamCreateModel from "../models/create/TeamCreateModel"
import TeamModel from "../models/TeamModel"

export const getTeams = async (): Promise<TeamModel[]> => {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request('https://localhost:7235/decent-retro-tool.api/teams', {
    method: 'GET',
    headers: headers
  });

  const res = await fetch(request)
  const resJson = await res.json()
  return resJson.map((t: any) => TeamModel.fromJson(t));
} 

export const getTeam = async (teamId: number): Promise<TeamModel> => {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request(`https://localhost:7235/decent-retro-tool.api/teams/${teamId}`, {
    method: 'GET',
    headers: headers
  });

  const res = await fetch(request)
  const resJson = await res.json()
  return TeamModel.fromJson(resJson);
} 

export const createTeam = async (team: TeamCreateModel): Promise<void> => {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  console.log(JSON.stringify(team))

  const request: RequestInfo = new Request('https://localhost:7235/decent-retro-tool.api/teams', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(team)
  });

  return fetch(request)
    .then(res => {console.log(res)})
}

export const updateTeam = async (teamId: number, team: TeamCreateModel): Promise<void> => {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  console.log(JSON.stringify(team))

  const request: RequestInfo = new Request(`https://localhost:7235/decent-retro-tool.api/teams/${teamId}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(team)
  });

  return fetch(request)
    .then(res => {console.log(res)})
}

export const deleteTeam = async (teamId: number): Promise<void> => {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request(`https://localhost:7235/decent-retro-tool.api/teams/${teamId}`, {
    method: 'DELETE',
    headers: headers,
  });

  return fetch(request)
    .then(res => {console.log(res); console.log("DELETED!!!!!!!")})
}