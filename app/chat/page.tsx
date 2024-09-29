'use client'
import { useState } from 'react'
import ChatInterface from '../../components/ChatInterface'
import Map from '../../components/Map'

export default function Chat() {
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: 'Greetings, traveler! I am Xu Xiake, an explorer and geographer from the Ming Dynasty. How may I assist you on your journey today?'
}])
  const [isLoading, setIsLoading] = useState(false)

  const handleSelectLocation = async (location) => {
    const question = `Please tell me about your experiences and insights in ${location}.`
    await handleSubmit(question)
  }

  const handleSubmit = async (input) => {
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input }
    setMessages(prevMessages => [...prevMessages, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input }),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: data.reply }])
    } catch (error) {
      console.error('Error fetching response:', error)
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Sorry, I encountered some issues while responding. Please try again later.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Xu Xiake Digital Twin</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ChatInterface 
            messages={messages} 
            isLoading={isLoading} 
            onSubmit={handleSubmit} 
          />
          <Map onSelectLocation={handleSelectLocation} />
        </div>
      </main>
    </div>
  )
}
