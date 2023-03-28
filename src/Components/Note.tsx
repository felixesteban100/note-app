import { Link, useNavigate } from "react-router-dom"
import { useNote } from "./NoteLayout"
import ReactMarkdown from "react-markdown"
import remarkGfm from 'remark-gfm'

type NoteProps = {
    onDelete: (id: string) => void
}

function Note({ onDelete }: NoteProps) {
  const note = useNote()
  const navigate = useNavigate()

  return (
    <div className="pb-10 ml-10 mr-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 align-middle mb-10 mt-5">
            <div className="flex flex-col w-full ">
                <h1 className="text-4xl mb-2 text-gray-800 dark:text-gray-200 justify-center md:justify-start m-auto md:m-0 md:mb-3">{note.title}</h1>
                {note.tags.length > 0 && (
                    <div className="flex flex-row gap-2 flex-wrap justify-center md:justify-start">
                        {note.tags.map(tag => (
                             <div
                                className="p-1 inline-block bg-blue-500 text-white text-xs px-2 rounded-md truncate "
                                key={tag.id}
                            >
                                {tag.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="w-full flex flex-row gap-2 justify-center md:justify-end sm:w-auto pt-5">
                <Link to={`/${note.id}/edit`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded h-full ">
                        Edit
                    </button>
                </Link>
                <button 
                    className="text-red-500 border border-red-500 hover:bg-red-700 hover:text-white py-2 px-4 rounded "
                    onClick={() => {
                        onDelete(note.id)
                        navigate('/')
                    }}
                >
                    Delete
                </button>
                <Link to="/">
                    <button className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded h-full">
                        Back
                    </button>
                </Link>
            </div>
        </div>
        <div 
            className="dark:text-white markdown" 
        >
            <ReactMarkdown
                children={note.markdown}
                remarkPlugins={[remarkGfm]}
            />
        </div>
    </div>
  )
}

export default Note