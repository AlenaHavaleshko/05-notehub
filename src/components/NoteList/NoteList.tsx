import css from './NoteList.module.css';
import type { Note } from '../../types/note'

interface NoteListProps {
  notes: Note[];
  isLoading: boolean;
  error: Error | null;
}

export default function NoteList({ notes, isLoading, error }: NoteListProps) {

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
            <button className={css.button}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
