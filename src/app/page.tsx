'use client'

import { useState } from 'react'

type Task = {
  title: string
  details: string
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDetails, setEditDetails] = useState('')

  const addTask = () => {
    const trimmed = title.trim()
    if (trimmed) {
      setTasks([...tasks, { title: trimmed, details }])
      setTitle('')
      setDetails('')
    }
  }

  const startEdit = (index: number) => {
    setEditIndex(index)
    setEditTitle(tasks[index].title)
    setEditDetails(tasks[index].details)
  }

  const saveEdit = () => {
    if (editIndex === null) return
    const trimmed = editTitle.trim()
    const updated = tasks.map((task, i) =>
      i === editIndex ? { title: trimmed, details: editDetails } : task
    )
    setTasks(updated)
    setEditIndex(null)
    setEditTitle('')
    setEditDetails('')
  }

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  return (
    <main className="min-h-screen flex items-start justify-center p-8">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <div className="flex mb-2">
          <input
            className="flex-1 border border-gray-300 rounded p-2 mr-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
        </div>
        <div className="flex mb-4">
          <input
            className="flex-1 border border-gray-300 rounded p-2 mr-2"
            placeholder="Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className="border-b border-gray-200 py-2">
              {editIndex === index ? (
                <div className="mb-2">
                  <input
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Title"
                  />
                  <input
                    className="w-full border border-gray-300 rounded p-2 mb-2"
                    value={editDetails}
                    onChange={(e) => setEditDetails(e.target.value)}
                    placeholder="Details"
                  />
                  <div className="flex space-x-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={saveEdit}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-300 text-black px-3 py-1 rounded"
                      onClick={() => setEditIndex(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{task.title}</p>
                    {task.details && (
                      <p className="text-sm text-gray-600">{task.details}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-500"
                      onClick={() => startEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => removeTask(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
