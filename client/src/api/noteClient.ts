import type RetroNoteCreateModel from "../models/create/RetroNoteCreateModel";
import { API_BASE_URL } from "./apiConsts";

export const createNote = async (note: RetroNoteCreateModel) : Promise<void> => {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request(`${API_BASE_URL}/notes`, {
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

  const request: RequestInfo = new Request(`${API_BASE_URL}/notes/${noteId}`, {
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

  const request: RequestInfo = new Request(`${API_BASE_URL}/notes/${noteId}`, {
    method: 'DELETE',
    headers: headers,
  });

  return fetch(request)
    .then(res => {console.log(res)})
}