'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Types
interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

interface Story {
  filename: string
  message_count: number
  session_info: string[]
}

// Chat Interface Component
function ChatInterface({ onBack }: { onBack: () => void }) {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatHistoryRef = useRef<HTMLDivElement>(null)

  const API_BASE = 'http://localhost:4002/api/biographer'

  useEffect(() => {
    initSession()
  }, [])

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight
    }
  }, [messages])

  const initSession = async () => {
    try {
      const response = await fetch(`${API_BASE}/start`, { method: 'POST' })
      const data = await response.json()
      setSessionId(data.session_id)
      
      // Add welcome message
      setMessages([{
        role: 'assistant',
        content: 'Welcome! I\'m here to help capture your life story. Let\'s begin with some questions about your background, or feel free to share whatever comes to mind.',
        timestamp: new Date()
      }])
    } catch (error) {
      console.error('Error initializing session:', error)
      setMessages([{
        role: 'system',
        content: 'Error connecting to the biographer service. Please try again.',
        timestamp: new Date()
      }])
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || !sessionId || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          message: inputMessage
        })
      })

      const data = await response.json()
      if (data.response) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, assistantMessage])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        role: 'system',
        content: 'Error sending message. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const endSession = async () => {
    if (!sessionId) return

    try {
      const response = await fetch(`${API_BASE}/end`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId })
      })

      const data = await response.json()
      alert('Biographer session ended. Your story has been saved to: ' + data.filename)
      
      // Reset session
      setSessionId(null)
      setMessages([])
      onBack()
      
    } catch (error) {
      console.error('Error ending session:', error)
      alert('Error ending session. Please try again.')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b-2 border-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🎭 Biographer Interview</h1>
            <p className="text-lg text-gray-600">Capture life stories with AI-powered biographical interviews</p>
            {sessionId && (
              <div className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg inline-block">
                <span className="font-semibold text-gray-700">Session ID: </span>
                <span className="text-gray-600">{sessionId}</span>
              </div>
            )}
          </div>

          {/* Chat History */}
          <div 
            ref={chatHistoryRef}
            className="h-96 overflow-y-auto border-2 border-gray-200 rounded-xl p-6 mb-6 bg-gradient-to-b from-gray-50 to-white"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 p-4 rounded-xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-12 text-right'
                    : message.role === 'assistant'
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white mr-12'
                    : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white mr-12'
                }`}
              >
                <div className="font-semibold mb-1">
                  {message.role === 'user' ? 'You' : 
                   message.role === 'assistant' ? 'Biographer AI' : 'System'}:
                </div>
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center text-gray-500 mr-12">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600 mr-2"></div>
                Biographer AI is thinking...
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="flex gap-4 items-end">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your story or ask a question..."
              className="flex-1 p-4 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
              rows={3}
              disabled={isLoading}
            />
            <div className="flex flex-col gap-2">
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || !sessionId || isLoading}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
              >
                Send
              </button>
              <button
                onClick={endSession}
                disabled={!sessionId}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
              >
                End
              </button>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-6 text-center">
            <button
              onClick={onBack}
              className="text-purple-600 hover:text-purple-800 font-semibold transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Stories List Component
function StoriesList({ onBack }: { onBack: () => void }) {
  const [stories, setStories] = useState<Story[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const API_BASE = 'http://localhost:4002/api/biographer'

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      const response = await fetch(`${API_BASE}/stories`)
      const data = await response.json()
      setStories(data.stories || [])
    } catch (error) {
      console.error('Error fetching stories:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8 pb-6 border-b-2 border-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">📚 Saved Stories</h1>
            <p className="text-lg text-gray-600">Browse and manage your biographical stories</p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading stories...</p>
            </div>
          ) : stories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No stories found. Start your first interview!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {stories.map((story, index) => (
                <div key={index} className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">{story.filename}</h3>
                      <p className="text-gray-600">Messages: {story.message_count}</p>
                      <p className="text-gray-500 text-sm">Session: {story.session_info.join('_')}</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={onBack}
              className="text-purple-600 hover:text-purple-800 font-semibold transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Quality Assessment Component
function QualityAssessment({ onBack }: { onBack: () => void }) {
  const [assessmentResult, setAssessmentResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [answersFile, setAnswersFile] = useState('')

  const API_BASE = 'http://localhost:4002/api/biographer'

  const runAssessment = async () => {
    if (!answersFile.trim()) {
      alert('Please provide an answers file path')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`${API_BASE}/assess_quality`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers_file: answersFile })
      })

      const data = await response.json()
      setAssessmentResult(data)
    } catch (error) {
      console.error('Error running assessment:', error)
      alert('Error running assessment. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8 pb-6 border-b-2 border-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🔍 Quality Assessment</h1>
            <p className="text-lg text-gray-600">Analyze and assess the quality of biographical interviews</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Answers File Path:
            </label>
            <input
              type="text"
              value={answersFile}
              onChange={(e) => setAnswersFile(e.target.value)}
              placeholder="Enter path to answers file..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            onClick={runAssessment}
            disabled={isLoading || !answersFile.trim()}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? 'Running Assessment...' : 'Run Quality Assessment'}
          </button>

          {assessmentResult && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-4">Assessment Results:</h3>
              {assessmentResult.summary && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {Object.entries(assessmentResult.summary).map(([quality, count]) => (
                    <div key={quality} className="text-center p-4 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-gray-800">{count as number}</div>
                      <div className="text-sm text-gray-600 capitalize">{quality}</div>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-sm text-gray-600">
                Output saved to: {assessmentResult.output_file}
              </p>
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={onBack}
              className="text-purple-600 hover:text-purple-800 font-semibold transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Dashboard Component
function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          🎭 Biographer AI Interface&nbsp;
          <Link href="/api/biographer" className="hover:underline">
            <code className="font-mono font-bold">api/biographer</code>
          </Link>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Link
            href="/"
            className="pointer-events-auto flex place-items-center gap-2 p-8 lg:p-0 hover:text-blue-600 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-purple-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-purple-700 before:dark:opacity-10 after:dark:from-purple-900 after:dark:via-[#7c3aed] after:dark:opacity-40 before:lg:h-[360px]">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            🎭 Biographer
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Capture and preserve life stories through AI-powered interviews
          </p>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-3 lg:text-left gap-6">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-purple-300 hover:bg-purple-50 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold text-purple-700">
            Start Interview{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-70">
            Begin a new biographical interview session with AI assistance.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold text-blue-700">
            View Stories{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-70">
            Browse and manage previously recorded biographical stories.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-green-300 hover:bg-green-50 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold text-green-700">
            Quality Assessment{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-70">
            Analyze and assess the quality of biographical interviews.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">How it works:</h3>
        <div className="flex flex-col lg:flex-row gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
            Start a new interview session
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
            AI guides you through biographical questions
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
            Stories are saved and can be analyzed
          </div>
        </div>
      </div>
    </main>
  )
}

// Main Page Component
export default function Biographer() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'chat' | 'stories' | 'assessment'>('dashboard')

  const handleNavigation = (view: 'dashboard' | 'chat' | 'stories' | 'assessment') => {
    setCurrentView(view)
  }

  if (currentView === 'chat') {
    return <ChatInterface onBack={() => setCurrentView('dashboard')} />
  }

  if (currentView === 'stories') {
    return <StoriesList onBack={() => setCurrentView('dashboard')} />
  }

  if (currentView === 'assessment') {
    return <QualityAssessment onBack={() => setCurrentView('dashboard')} />
  }

  return (
    <div onClick={(e) => {
      const target = e.target as HTMLElement
      if (target.closest('.group')) {
        const groupElement = target.closest('.group')
        if (groupElement?.children[0]?.textContent?.includes('Start Interview')) {
          handleNavigation('chat')
        } else if (groupElement?.children[0]?.textContent?.includes('View Stories')) {
          handleNavigation('stories')
        } else if (groupElement?.children[0]?.textContent?.includes('Quality Assessment')) {
          handleNavigation('assessment')
        }
      }
    }}>
      <Dashboard />
    </div>
  )
} 