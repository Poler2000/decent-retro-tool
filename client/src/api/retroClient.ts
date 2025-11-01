import RetroModel from "../models/RetroModel";
import type RetroCreateModel from "../models/create/RetroCreateModel";
import type RetroUpdateModel from "../models/update/RetroUpdateModel";

export const getRetros = async (teamId: number): Promise<RetroModel[]> => {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request(`https://localhost:7235/decent-retro-tool.api/retros?teamId=${teamId}`, {
    method: 'GET',
    headers: headers
  });

  const res = await fetch(request)
  const resJson = await res.json()
  return resJson.map((t: any) => RetroModel.fromJson(t));
} 

export const getRetro = async (retroId: number): Promise<RetroModel> => {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request(`https://localhost:7235/decent-retro-tool.api/retros/${retroId}`, {
    method: 'GET',
    headers: headers
  });

  const res = await fetch(request)
  const resJson = await res.json()
  return RetroModel.fromJson(resJson);
} 

export const downloadRetro = async (retroId: number): Promise<void> => {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request(`https://localhost:7235/decent-retro-tool.api/retros/${retroId}/download`, {
    method: 'GET',
    headers: headers
  });

  const res = await fetch(request)
  const blob = await res.blob();
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement('a');
  link.href = url;
  link.download = `retro_${retroId}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export const createRetro = async (retro: RetroCreateModel): Promise<void> => {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request('https://localhost:7235/decent-retro-tool.api/retros', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(retro)
  });

  return fetch(request)
    .then(res => {console.log(res)})
}

export const updateRetro = async (retroId: number, retro: RetroUpdateModel): Promise<void> => {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request(`https://localhost:7235/decent-retro-tool.api/retros/${retroId}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(retro)
  });

  return fetch(request)
    .then(res => {console.log(res)})
}

export const deleteRetro = async (retroId: number): Promise<void> => {
  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request(`https://localhost:7235/decent-retro-tool.api/retros/${retroId}`, {
    method: 'DELETE',
    headers: headers,
  });

  return fetch(request)
    .then(res => {console.log(res); console.log("DELETED!!!!!!!")})
}