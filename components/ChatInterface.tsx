import { useEffect, useRef, useState } from 'react'

export default function ChatInterface({ messages, isLoading, onSubmit }) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSubmit(input)
      setInput('')
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Talk to Xu Xiake</h1>
      <div className="h-96 overflow-y-auto mb-4 p-2 bg-gray-50 rounded">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {msg.content}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="text-center">
            <span className="inline-block p-2 bg-gray-200 rounded-lg">Xu Xiake is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border rounded-l-lg p-2"
          placeholder="Talk to Xu Xiake..."
          disabled={isLoading}
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded-r-lg ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-cyan-500 hover:bg-blue-600'} text-white`}
          disabled={isLoading}
        >
          Send
        </button>
      </form>
    </div>
  )
}
