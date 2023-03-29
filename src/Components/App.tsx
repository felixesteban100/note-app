import { useMemo } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import NewNote from './NewNote'
import useLocalStorage from "../customHooks/useLocalStorage"
import { v4 as uuidV4 } from 'uuid'
import NoteList from "./NoteList"
import NoteLayout from "./NoteLayout"
import Note from "./Note"
import EditNote from "./EditNote"
import useDarkMode from "../customHooks/useDarkMode"

export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const [isDarkMode, setIsDarkMode] = useDarkMode()

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode)
  }

  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {
        ...note,
        tags: tags.filter(tag => note.tagIds.includes(tag.id))
      }
    })
  }, [notes, tags])

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        {
          ...data, id: uuidV4(),
          tagIds: tags.map(tag => tag.id)
        }
      ]
    })
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return {
            ...note,
            ...data, id: uuidV4(),
            tagIds: tags.map(tag => tag.id)
          }
        } else {
          return note
        }
      })
    })
  }

  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) return { ...tag, label }
        return tag
      })
    })
  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen h-[100%] ">
      <header className="flex justify-between items-center py-4 px-8 bg-white dark:bg-gray-800 ">
        <p className="md:text-2xl font-bold text-gray-900 dark:text-gray-100 ml-7">Notes Markdown App</p>
        <button
          className="text-[10px] md:text-lg rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 mr-8"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? 'Light' : 'Dark'} Mode {isDarkMode ? '☀' : '🌙'}
        </button>
      </header>
      <div className="ml-4 mr-4">
        <Routes>
          <Route
            path="/note-app/"
            element={
              <NoteList
                notes={notesWithTags}
                availableTags={tags}
                onUpdateTag={updateTag}
                onDeleteTag={deleteTag}
                isDarkMode={isDarkMode}
              />
            }
          />
          <Route
            path="/new"
            element={
              <NewNote
                onSubmit={onCreateNote}
                onAddTag={addTag}
                availableTags={tags}
                isDarkMode={isDarkMode}
              />
            }
          />
          <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
            <Route index element={<Note onDelete={onDeleteNote} />} />
            <Route
              path="edit"
              element={
                <EditNote
                  onSubmit={onUpdateNote}
                  onAddTag={addTag}
                  availableTags={tags}
                  isDarkMode={isDarkMode}
                />
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/note-app/" />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
