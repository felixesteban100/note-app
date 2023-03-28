import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import ReactSelect from "react-select"
import { Tag } from "./App"

type NodeListProps = {
    availableTags: Tag[]
    notes: SimplifiedNote[]
    onUpdateTag: (id: string, label: string) => void
    onDeleteTag: (id: string) => void
    isDarkMode: boolean
}

type SimplifiedNote = {
    tags: Tag[]
    title: string
    id: string
}

type EditTagsModalProps = {
    // show: boolean
    availableTags: Tag[]
    setEditTagsModalIsOpen: (value: boolean) => void
    onUpdateTag: (id: string, label: string) => void
    onDeleteTag: (id: string) => void
}

function NoteList({ availableTags, notes, onUpdateTag, onDeleteTag, isDarkMode }: NodeListProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState("")
    const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (
                title === ""
                ||
                note.title.toLowerCase().includes(title.toLowerCase()))
                &&
                (
                    selectedTags.length === 0
                    ||
                    selectedTags.every(
                        tag => note.tags.some(noteTag => noteTag.id === tag.id)
                    )
                )
        })
    }, [title, selectedTags, notes])


    const customStyles = {
        control: (provided: any) => ({
          ...provided,
          backgroundColor: isDarkMode === false ? 'bg-gray-900' : 'bg-gray-100',
          borderColor: isDarkMode === false ? 'black' : 'gray',
          color: 'white',
          '&:hover': {
            borderColor: '#4F46E5',
          },
        }),
        option: (provided: any) => ({
          ...provided,
          backgroundColor: isDarkMode === false ? 'rgb(243 244 246)' : 'rgb(17 24 39)',
          color: isDarkMode === false ? 'black' : 'white',
          '&:hover': {
            backgroundColor: isDarkMode === false ? 'blue' : 'blue',
            color: 'white'
          },
        }),
        menu: (provided: any) => ({
          ...provided,
          backgroundColor: isDarkMode === false ? 'bg-gray-900' : 'bg-gray-100',
        }),
        menuList: (provided: any) => ({
          ...provided,
          backgroundColor: isDarkMode === false ? 'bg-gray-900' : 'bg-gray-100',
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: 'white',
        }),
        placeHolder: (provided: any) => ({
            ...provided,
            backgroundColor: isDarkMode === false ? 'bg-gray-900' : 'bg-gray-100',
        })
    }

    return (
        <div className="mr-10 ml-10">
            <div className=" text-gray-800 dark:text-gray-200 flex flex-row justify-between align-middle mb-4 mt-4">
                <div className="flex flex-col">
                    <h1 className="text-4xl">Notes</h1>
                </div>
                <div className="flex flex-row gap-2 sm:w-auto">
                    <Link to="/new">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                            Create
                        </button>
                    </Link>
                    <button 
                        onClick={() => setEditTagsModalIsOpen(true)} 
                        className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
                    >
                        Edit tags
                    </button>
                </div>
            </div>
            <form className="text-gray-800 dark:text-gray-200">
                <div className=" flex flex-row mb-5 gap-2">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col ">
                            <label htmlFor="">Title</label>
                            <input
                                className="w-full rounded-md bg-gray-100 dark:bg-gray-900 mt-1 h-full border border-black dark:border-gray-300"
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Tags</label>
                            <ReactSelect
                                styles={customStyles}
                                options={availableTags.map(tag => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                value={selectedTags?.map(tag => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                onChange={tags => {
                                    setSelectedTags(tags.map(tag => {
                                        return { label: tag.label, id: tag.value }
                                    }))
                                }}
                                isMulti
                            />
                        </div>
                    </div>
                </div>
            </form>
            <div className="text-gray-800 dark:text-gray-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-flow-row gap-3 w-full">
                {filteredNotes.length === 0 && 
                    <div>
                        No notes created
                    </div>
                }
                {filteredNotes.map(note => (
                    <div key={note.id} className="grid grid-flow-row">
                        <NoteCard
                            id={note.id}
                            title={note.title}
                            tags={note.tags}
                        />
                    </div>
                ))}
            </div>
            {
                editTagsModalIsOpen === true && 
                <EditTagsModal 
                    setEditTagsModalIsOpen={setEditTagsModalIsOpen}
                    availableTags={availableTags}
                    onUpdateTag={onUpdateTag}
                    onDeleteTag={onDeleteTag}
                />
            }
        </div>
    )
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
    return (
        <Link to={`/${id}`}>
            <div
                /* stack */
                className={`
                    white border-[1px] border-black dark:border-gray-200 h-100 reset no-underline
                    transition-all duration-100 ease-in-out
                    hover:transform hover:translate-x-0 hover:-translate-y-1
                    focus:transform focus:translate-x-0 focus:-translate-y-1
                    focus:shadow-md hover:shadow-md
                    rounded-md
                `}
            >
                <div /* card body */ className="my-3 mx-auto text-center ">
                    <div /* stack */ className="flex flex-col gap-2 align-middle justify-center h-100 ">
                        <span className="text-2xl">{title}</span>
                        {tags.length > 0 && (
                            <div className="flex flex-row gap-2 justify-center flex-wrap">
                                {tags.map(tag => (
                                    <div /* badge */
                                        className="p-1 inline-block bg-blue-500 text-white text-xs px-2 rounded-md truncate"
                                        key={tag.id}
                                    >
                                        {tag.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>

    )
}

function EditTagsModal({ 
    availableTags, 
    setEditTagsModalIsOpen, 
    onDeleteTag, 
    onUpdateTag 
}: EditTagsModalProps) {
    return (
        <>
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    {/* <!-- Modal background --> */}
                    <div onClick={() => setEditTagsModalIsOpen(false)} className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 dark:bg-gray-800 opacity-75"></div>
                    </div>

                    {/* <!-- Modal content container --> */}
                    <div /* modal */ className="inline-block align-bottom bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="flex justify-between mb-5">
                            <p /* modal header */ className="text-3xl">Edit Tags</p>
                            <div 
                                onClick={() => setEditTagsModalIsOpen(false)}
                                className="text-3xl cursor-pointer hover:text-blue-500" 
                            >
                                    &times;
                            </div>
                        </div>
                        <div /* modal body */>
                            <form action="">
                                <div /* stack */ className="flex flex-col gap-2">
                                    {availableTags.length === 0 &&
                                        <div className="text-2xl">
                                            No tags
                                        </div>
                                    }
                                    {availableTags.map(tag => (
                                        <div /* row */ key={tag.id} className="flex flex-row gap-3">
                                            <div /* col */ className="flex flex-col border w-full rounded-md border-black dark:border-white">
                                                <input 
                                                    className="my-auto mx-2 focus:outline-none bg-white dark:bg-gray-700 text-black dark:text-white" 
                                                    value={tag.label}
                                                    onChange={(e) => onUpdateTag(tag.id, e.target.value)}
                                                />
                                            </div>
                                            <div /* col */ className="flex flex-col sm:w-auto">
                                                <button 
                                                    onClick={() => onDeleteTag(tag.id)}
                                                    className="text-red-500 border border-red-500 hover:bg-red-700 hover:text-white py-2 px-4 rounded "
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </form>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default NoteList


