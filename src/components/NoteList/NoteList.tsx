import css from './NoteList.module.css';
import type { Note } from '../../types/note'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from '../../services/noteService';

interface NoteListProps {
  notes: Note[];
  isLoading: boolean;
  error: Error | null;
}

export default function NoteList({ notes, isLoading, error }: NoteListProps) {

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["notes"] });
  },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button type="button" 
            className={css.button} 
            onClick={() => mutation.mutate(note.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
