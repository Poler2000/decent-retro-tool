import type TeamModel from "./models/TeamModel"

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
  return resJson as TeamModel[]
} 

export const createTeam = async (team: TeamModel): Promise<void> => {
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

export const updateTeam = async (team: TeamModel): Promise<void> => {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  console.log(JSON.stringify(team))

  const request: RequestInfo = new Request(`https://localhost:7235/decent-retro-tool.api/teams/${team.id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(team)
  });

  return fetch(request)
    .then(res => {console.log(res)})
}