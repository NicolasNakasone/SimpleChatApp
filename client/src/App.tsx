import { FormEvent, useEffect, useRef, useState } from 'react'

import { io } from 'socket.io-client'
import { v4 as uuid } from 'uuid'

import 'src/App.css'

interface Message {
  id: string
  message: string
}

export const App = () => {
  const socket = io(import.meta.env.VITE_API_URL)

  const [messages, setMessages] = useState<Message[]>([])

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputRef.current?.value) {
      socket.emit('chat message', inputRef.current.value)
      inputRef.current.value = ''
    }
  }

  useEffect(() => {
    socket.on('chat message', message => {
      setMessages(prev => [...prev, { id: uuid(), message }])

      window.scrollTo(0, document.body.scrollHeight)
    })
  }, [])

  return (
    <main>
      <ul id="messages">
        {messages.map(({ id, message }) => {
          return <li key={id}>{message}</li>
        })}
      </ul>
      <form id="form" onSubmit={handleSubmit}>
        <input ref={inputRef} id="input" autoComplete="off" />
        <button type="submit">Send</button>
      </form>
    </main>
  )
}
