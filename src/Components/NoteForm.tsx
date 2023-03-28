import { useRef, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CreatableReactSelect from 'react-select/creatable'
import { NoteData, Tag } from './App'
import { v4 as uuidV4 } from 'uuid'

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[],
    isDarkMode: boolean
} & Partial<NoteData>

function NoteForm({ 
    onSubmit, 
    onAddTag, 
    availableTags, 
    title = "", 
    markdown = "", 
    tags = [],
    isDarkMode
}: NoteFormProps) {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
    const navigate = useNavigate()
    
    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault()

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags,
        })

        navigate("..")
    }

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

    }

    return (
        <form className='text-gray-800 dark:text-gray-200 pb-10 ml-10 mr-10' onSubmit={(event) => handleSubmit(event)}>
            <div className="flex flex-col gap-1">
                <div className="grid grid-cols-2 gap-2 w-full">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="">Title</label>
                        <input 
                            className="w-full rounded-md bg-gray-100 dark:bg-gray-900 border border-black dark:border-gray-300 h-full"
                            type="text" 
                            required 
                            ref={titleRef} 
                            defaultValue={title}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="">Tags</label>
                        <CreatableReactSelect 
                            styles={customStyles}
                            onCreateOption={label => {
                                const newTag = { id: uuidV4(), label }
                                onAddTag(newTag)
                                setSelectedTags(prev => [...prev, newTag])
                            }}
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
                <div className="flex flex-col gap-1">
                    <label htmlFor="">Body</label>
                    <textarea 
                        className='rounded-md text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 border border-black dark:border-gray-300'
                        rows={15} 
                        required
                        ref={markdownRef}
                        defaultValue={markdown}
                    >
                    </textarea>
                </div>
                <div className='flex flex-row gap-2 justify-end'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        type='submit'
                    >
                        Save
                    </button>
                    <Link to="...">
                        <button
                            className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
                            type='button'
                        >
                            Cancel
                        </button>
                    </Link>
                </div>
            </div>
        </form>
    )
}

export default NoteForm