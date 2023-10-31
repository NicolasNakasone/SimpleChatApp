import { FormEvent, useEffect, useRef } from 'react'

import { io } from 'socket.io-client'

import 'src/App.css'

export const App = () => {
  const socket = io(import.meta.env.VITE_API_URL)

  const messagesRef = useRef<HTMLUListElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputRef.current?.value) {
      socket.emit('chat message', inputRef.current.value)
      inputRef.current.value = ''
    }
  }

  useEffect(() => {
    socket.on('chat message', msg => {
      const item = document.createElement('li')
      item.textContent = msg
      messagesRef.current?.appendChild(item)
      window.scrollTo(0, document.body.scrollHeight)
    })
  }, [])

  return (
    <main>
      <ul ref={messagesRef} id="messages" />
      <form id="form" onSubmit={handleSubmit}>
        <input ref={inputRef} id="input" autoComplete="off" />
        <button type="submit">Send</button>
      </form>
    </main>
  )
}
