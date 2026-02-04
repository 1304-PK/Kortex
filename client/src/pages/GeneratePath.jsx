import { useState, useRef, useEffect } from 'react'
import { IoSend } from 'react-icons/io5'
import { useAuth } from "../context/AuthContext"
import capitalize from "../utils/capitalize"
import {PuffLoader } from "react-spinners"
import CourseOutline from '../components/CourseOutline'

export default function GeneratePath() {

  const {user, loading} = useAuth()
  const [prompt, setPrompt] = useState('')
  const textareaRef = useRef(null)
  const [chat, setChat] = useState([])

  const maxHeight = 200
  const minHeight = 120

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const newHeight = Math.max(minHeight, Math.min(textareaRef.current.scrollHeight, maxHeight))
      textareaRef.current.style.height = `${newHeight}px`
    }
  }, [prompt]);

  const handlePromptSubmit = async (e) => {
    e.preventDefault()

    setChat([...chat, {
      author: 'user',
      msgContent: prompt.trim(),
      time: Date.now()
    },
  {
    author: 'ai',
    msgContent: '',
    time: Date.now()
  }])

  setPrompt('')
    const res = await fetch("http://localhost:3000/api/chat/get-response", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        prompt
      })
    })
    const data = await res.json()
    setChat(prev => {
      const _new = [...prev]
      _new[_new.length-1] = {
        ..._new[_new.length-1],
        msgContent: data.aiResponse
      }
      return _new
    })
  }

  return (
    <div className="min-h-screen bg-black flex w-full">
      <div className="space-y-8 min-h-screen flex-1 flex flex-col justify-center">
        {/* Header Section */}
        <div className='max-w-3xl flex flex-col h-full min-w-full justify-around px-20 gap-10'>
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Hey
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              What are you planning on learning today
            </p>
          </div>
          {/* Chat Section */}
          <div className='text-white flex flex-col gap-10 text-[1.2rem]'>
            {chat.map(msg => {
              if (msg.author === 'user'){
                return (
                  <div key={msg.time} className='self-end bg-[#383838] px-5 py-3 rounded-2xl rounded-tr-none'>{msg.msgContent}</div>
                )
              }
              else if (msg.author === 'ai'){
                return(
                  <div key={msg.time} className='self-start bg-[#383838] px-5 py-4 rounded-2xl rounded-tl-none'>{msg.msgContent.length===0 ? <PuffLoader color='white' size={30}/> : <CourseOutline Response={JSON.parse(msg.msgContent)}/>}
                  </div>
                )
              }
            })}
          </div>
          {/* Textarea */}
            <form onSubmit={(e) => {handlePromptSubmit(e)}}>
              <div className="border-2 border-[#ffffff77] rounded-2xl bg-black/50 backdrop-blur-sm overflow-hidden">
                <textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Master React in 10 days..."
                  className="text-[1.2rem] w-full px-6 pt-6 pb-4 bg-transparent text-white placeholder-gray-500 focus:outline-none resize-none overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
                  style={{
                    minHeight: `${minHeight}px`,
                    maxHeight: `${maxHeight}px`
                  }}
                />
          
                <div className="flex items-center justify-between px-6 py-3">
                  {/* Character Counter */}
                  <div className="text-sm text-gray-500">
                    {prompt.length}/100
                  </div>
          
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="p-3 rounded-xl transition-all duration-200 hover:opacity-80 active:scale-95 cursor-pointer"
                    style={{ backgroundColor: '#009966' }}
                    aria-label="Submit"
                  >
                    <IoSend className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </form>
        </div>
      </div>
    </div>
  )
}