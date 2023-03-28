import { NoteData, Tag } from "./App"
import NoteForm from "./NoteForm"

type NewNoteProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
    isDarkMode: boolean
}

function NewNote({onSubmit, onAddTag, availableTags, isDarkMode}: NewNoteProps) {
  return (
    <>
        <p className="text-4xl mb-4 text-gray-800 dark:text-gray-200 mt-5 pb-10 ml-10 mr-10">New Note</p>
        <NoteForm 
          onSubmit={onSubmit}
          onAddTag={onAddTag}
          availableTags={availableTags}
          isDarkMode={isDarkMode}
        />
    </>
  )
}

export default NewNote