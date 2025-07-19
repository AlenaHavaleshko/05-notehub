import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
//import type { Note } from './types/note';
import css from "./App.module.css";

export default function App() {

  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useQuery({
  queryKey: ["notes", searchQuery],
  queryFn: () => fetchNotes({ search: searchQuery || 'note', page: 1 }),
});

const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSearch={handleSearch}/>
          {/* Пагінація */}
          <button className={css.button}>Create note +</button>
        </header>
        <NoteList  notes={data?.data ?? []} isLoading={isLoading} error={error} />
      </div>
    </>
  );
}
