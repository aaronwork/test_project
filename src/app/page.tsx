'use client'

import { useState } from 'react'

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([])
  const [input, setInput] = useState('')

  const addTask = () => {
    const trimmed = input.trim()
    if (trimmed) {
      setTasks([...tasks, trimmed])
      setInput('')
    }
  }

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  return (
    <main className="min-h-screen flex items-start justify-center p-8">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <div className="flex mb-4">
          <input
            className="flex-1 border border-gray-300 rounded p-2 mr-2"
            placeholder="Add todo"
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{task}</span>
              <button
                className="text-red-500"
                onClick={() => removeTask(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
