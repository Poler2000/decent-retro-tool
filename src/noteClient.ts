import RetroNoteModel from "./models/RetroNoteModel";

export const createNote = async (note: RetroNoteModel) : Promise<void> => {
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

export const updateNote = async (note: RetroNoteModel) : Promise<void> => {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request(`https://localhost:7235/decent-retro-tool.api/notes/${note.id}`, {
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