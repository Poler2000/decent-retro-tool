import type RetroSectionModel from "./models/RetroSection";
//TODO: RM
export const createSection = async (section: RetroSectionModel) : Promise<void> => {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request('https://localhost:7235/decent-retro-tool.api/sections', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(section)
  });

  return fetch(request)
    .then(res => {console.log(res)})
}

export const updateSection = async (section: RetroSectionModel) : Promise<void> => {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request(`https://localhost:7235/decent-retro-tool.api/sections/${section.id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(section)
  });

  return fetch(request)
    .then(res => {console.log(res)})
}

export const deleteSection = async (sectionId: number) : Promise<void> => {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request(`https://localhost:7235/decent-retro-tool.api/sections/${sectionId}`, {
    method: 'DELETE',
    headers: headers,
  });

  return fetch(request)
    .then(res => {console.log(res)})
}