import { NoteData, Tag } from "./App"
import NoteForm from "./NoteForm"
import { useNote } from "./NoteLayout"

type EditNoteProps = {
    onSubmit: (id: string, data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
    isDarkMode: boolean
}

function EditNote({onSubmit, onAddTag, availableTags, isDarkMode}: EditNoteProps) {
  const note = useNote()
  return (
    <>
        <p className="text-4xl mb-4 text-gray-800 dark:text-gray-200 mt-5">Edit Note</p>
        <NoteForm 
          title={note.title}
          markdown={note.markdown}
          tags={note.tags}
          onSubmit={data => onSubmit(note.id, data)}
          onAddTag={onAddTag}
          availableTags={availableTags}
          isDarkMode={isDarkMode}
        />
    </>
  )
}

export default EditNote