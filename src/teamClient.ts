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