import axios from 'axios';
import type { Note, NewNoteData } from '../types/note';
import toast from 'react-hot-toast';

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

interface FetchNotesResponse {
 totalPages: number;
 page: number;
 perPage:number;
 notes: Note[];
}

 axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
 const token = import.meta.env.VITE_NOTEHUB_TOKEN;

 if (!token) {
  toast('VITE_NOTEHUB_TOKEN is not defined');
 }

 export async function fetchNotes({ page = 1, perPage = 12, search, }: FetchNotesParams): Promise<FetchNotesResponse> {

  const response = await axios.get<FetchNotesResponse>(`/notes`, {
    params: {
     page,
     perPage,
     ...(search !== ''  && {search: search}),
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function createNote(noteData:NewNoteData) {
  const token = import.meta.env.VITE_NOTEHUB_TOKEN;

  if (!token) {
    toast.error('VITE_NOTEHUB_TOKEN is not defined');
    throw new Error('Missing token');
  }

  const response = await axios.post<Note>("/notes", noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  );
  return response.data;
}

export async function deleteNote (noteId: string) {

  const token = import.meta.env.VITE_NOTEHUB_TOKEN;

  if (!token) {
    toast.error('VITE_NOTEHUB_TOKEN is not defined');
    throw new Error('Missing token');
  } 

  await axios.delete(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    });
}