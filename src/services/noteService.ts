import axios from 'axios';
import type { Note } from '../types/note';
import toast from 'react-hot-toast';

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

interface FetchNotesResponse {
 data: Note[];
 total_pages: number;
 page: number;
 perPage:number;
}

 axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
 const token = import.meta.env.VITE_NOTEHUB_TOKEN;

 if (!token) {
  toast('VITE_NOTEHUB_TOKEN is not defined');
 }

 export async function fetchNotes({ page = 1, perPage = 12, search, }: FetchNotesParams): Promise<FetchNotesResponse> {
  console.log('Request params:', { page, perPage, search });
  const response = await axios.get<FetchNotesResponse>('/notes', {
    params: {
     page,
     perPage,
     ...(search !== ''  && {query: search}),
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}