import type RetroNoteCreateModel from "../models/create/RetroNoteCreateModel";

export const createNote = async (note: RetroNoteCreateModel) : Promise<void> => {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request('https://localhost:7235/decent-retro-tool.api/notes', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(note)
  });

  return fetch(request)
    .then(res => {console.log(res)})
}

export const updateNote = async (noteId: number, note: RetroNoteCreateModel) : Promise<void> => {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request(`https://localhost:7235/decent-retro-tool.api/notes/${noteId}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(note)
  });

  return fetch(request)
    .then(res => {console.log(res)})
}

export const deleteNote = async (noteId: number) : Promise<void> => {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request(`https://localhost:7235/decent-retro-tool.api/notes/${noteId}`, {
    method: 'DELETE',
    headers: headers,
  });

  return fetch(request)
    .then(res => {console.log(res)})
}