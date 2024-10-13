'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "apps/easyAccess/libs/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "apps/easyAccess/libs/ui/card"
import { ScrollArea } from "apps/easyAccess/libs/ui/scroll-area"
import { Play, Square, X, Microphone, MicrophoneSlash } from '@phosphor-icons/react'
// import { BorderBeam } from 'apps/easyAccess/libs/ui/BorderBeam'
// import { useMicVAD } from "@ricky0123/vad-react"
import { WavRecorder, WavStreamPlayer } from '@easy-access/wavtools';
import { Label } from '@radix-ui/react-label'
import { Switch } from 'apps/easyAccess/libs/ui/switch'
import { delay } from '@easy-access/utils'

type Message = {
  role: 'ai' | 'user'
  content: string
}

type InterviewState = 'idle' | 'userSpeaking' | 'aiSpeaking' | 'processing' | 'connected'
type RecordingMode = 'manual' | 'vad'

const AIWaveform = ({ isActive }: { isActive: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    const drawWave = (time: number) => {
      ctx.clearRect(0, 0, width, height)
      ctx.beginPath()

      for (let i = 0; i < width; i++) {
        const amplitude = isActive ? Math.sin(time / 200 + i / 50) * 20 : 5
        ctx.lineTo(i, height / 2 + amplitude * Math.sin(i / 20))
      }

      ctx.strokeStyle = isActive ? '#3B82F6' : '#9CA3AF'
      ctx.lineWidth = 2
      ctx.stroke()

      animationRef.current = requestAnimationFrame(drawWave)
    }

    drawWave(0)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive])

  return <canvas ref={canvasRef} width={300} height={60} className="w-full" />
}

export default function AIInterviewSimulator() {
  const [messages, setMessages] = useState<Message[]>([])
  const [interviewState, setInterviewState] = useState<InterviewState>('idle')
  const [isConnected, setIsConnected] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingMode, setRecordingMode] = useState<RecordingMode>('manual')

  const wavRecorderRef = useRef<WavRecorder>(new WavRecorder({ sampleRate: 24000 }))
  const wavStreamPlayerRef = useRef<WavStreamPlayer>(new WavStreamPlayer({ sampleRate: 24000 }))

  const connectConversation = useCallback(async () => {
    setIsConnected(true)
    setInterviewState('connected')
    await wavRecorderRef.current.begin()
    await wavStreamPlayerRef.current.connect()
    if (recordingMode === 'vad') {
      startInterview()
    }
  }, [recordingMode])

  const disconnectConversation = useCallback(async () => {
    setIsConnected(false)
    setMessages([])
    setInterviewState('idle')
    await wavRecorderRef.current.end()
    await wavStreamPlayerRef.current.interrupt()
  }, [])

  const startInterview = useCallback(() => {
    setMessages([{ role: 'ai', content: "欢迎参加面试，请简要介绍一下你自己。" }])
    setInterviewState('aiSpeaking')
    simulateAISpeaking()
  }, [])

  const startRecording = useCallback(async () => {
    if (interviewState !== 'aiSpeaking' && isConnected) {
      setIsRecording(true)
      setInterviewState('userSpeaking')
      await wavRecorderRef.current.record((data) => {
        appendInt16Array(data.mono)
      })
    }
  }, [interviewState, isConnected])

  const localInt16Array = useRef<Int16Array>(new Int16Array(0))
  function appendInt16Array(arrayBuffer: Int16Array) {
    localInt16Array.current = mergeInt16Arrays(
      localInt16Array.current,
      arrayBuffer,
    );
  }

  function mergeInt16Arrays(left: Int16Array | ArrayBuffer, right: Int16Array | ArrayBuffer) {
    if (left instanceof ArrayBuffer) {
      left = new Int16Array(left);
    }
    if (right instanceof ArrayBuffer) {
      right = new Int16Array(right);
    }
    if (!(left instanceof Int16Array) || !(right instanceof Int16Array)) {
      throw new Error(`Both items must be Int16Array`);
    }
    const newValues = new Int16Array(left.length + right.length);
    for (let i = 0; i < left.length; i++) {
      newValues[i] = left[i];
    }
    for (let j = 0; j < right.length; j++) {
      newValues[left.length + j] = right[j];
    }
    return newValues;
  }

  const stopRecording = useCallback(async () => {
    if (isRecording) {
      setIsRecording(false)
      setInterviewState('processing')
      await wavRecorderRef.current.pause()
      simulateUserResponse()
    }
  }, [isRecording])

  const simulateUserResponse = useCallback(() => {
    setTimeout(() => {
      const userMessage = "我是一名经验丰富的软件工程师，擅长React和Node.js开发。"
      setMessages(prev => [...prev, { role: 'user', content: userMessage }])
      setInterviewState('aiSpeaking')
      simulateAISpeaking()
    }, 1500)
  }, [])

  const simulateAISpeaking = useCallback(async () => {
    await delay(1000)

    const aiMessage = "非常好。那么，你能描述一下你参与过的最具挑战性的项目吗？"
    setMessages(prev => [...prev, { role: 'ai', content: aiMessage }])

    let len = localInt16Array.current.byteLength

    while (len > 0) {
      const chunk = localInt16Array.current.slice(0, 24000)
      localInt16Array.current = localInt16Array.current.slice(24000)
      wavStreamPlayerRef.current.add16BitPCM(chunk, `ai-response` + `-${len / 24000}`)

      len -= 24000
    }


    // const wavFile = await WavRecorder.decode(
    //   localInt16Array.current,
    //   24000,
    //   24000
    // );
    // console.log('wavFile', wavFile);

    // const audio = new Audio(wavFile.url)
    // await audio.play()
    setInterviewState('idle')
  }, [])

  useEffect(() => {
    if (recordingMode === 'vad' && isConnected && interviewState === 'idle') {
      startRecording()
    }
  }, [recordingMode, isConnected, interviewState, startRecording])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' && recordingMode === 'manual' && !isRecording) {
        event.preventDefault()
        startRecording()
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'Space' && recordingMode === 'manual' && isRecording) {
        event.preventDefault()
        stopRecording()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [recordingMode, isRecording, startRecording, stopRecording])

  const toggleRecordingMode = () => {
    setRecordingMode(prev => prev === 'manual' ? 'vad' : 'manual')
    if (isRecording) {
      stopRecording()
    }
  }

  return (
    <Card className="w-full h-screen bg-background/80 backdrop-blur-sm shadow-xl overflow-hidden">
      <CardHeader className="border-b">
        <CardTitle className="text-xl font-bold">AI面试模拟器</CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex flex-col h-[calc(100%-60px)]">
        <ScrollArea className="flex-grow mb-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`mb-4 ${message.role === 'ai' ? 'text-blue-600' : 'text-green-600'}`}
              >
                <strong>{message.role === 'ai' ? 'AI: ' : '你: '}</strong>
                {message.content}
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>

        <AIWaveform isActive={interviewState === 'userSpeaking' || interviewState === 'aiSpeaking'} />

        <div className="flex justify-between items-center mt-4">
          {!isConnected ? (
            <Button onClick={connectConversation} className="w-full">
              <Play className="mr-2 h-4 w-4" />
              连接面试
            </Button>
          ) : interviewState === 'connected' && recordingMode === 'manual' ? (
            <Button onClick={startInterview} className="w-full">
              <Play className="mr-2 h-4 w-4" />
              开始面试
            </Button>
          ) : (
            <>
              {recordingMode === 'manual' && (
                <Button
                  variant={isRecording ? "destructive" : "default"}
                  size="icon"
                  onMouseDown={startRecording}
                  onMouseUp={stopRecording}
                  disabled={interviewState === 'aiSpeaking'}
                >
                  {isRecording ? <MicrophoneSlash weight="fill" /> : <Microphone weight="fill" />}
                </Button>
              )}
              <Button variant="secondary" onClick={disconnectConversation}>
                <X className="mr-2 h-4 w-4" />
                结束面试
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <Switch
            id="recording-mode"
            checked={recordingMode === 'vad'}
            onCheckedChange={toggleRecordingMode}
          />
          <Label htmlFor="recording-mode">
            {recordingMode === 'vad' ? 'VAD模式' : '手动模式'}
          </Label>
        </div>

        <div className="text-center text-sm mt-4">
          {interviewState === 'idle' && isConnected && (
            <span>
              {recordingMode === 'manual'
                ? '按住空格键或麦克风按钮开始说话'
                : '请开始回答'}
            </span>
          )}
          {interviewState === 'userSpeaking' && <span className="text-green-500">正在录音...</span>}
          {interviewState === 'processing' && <span className="text-yellow-500">处理中...</span>}
          {interviewState === 'aiSpeaking' && <span className="text-blue-500">AI正在说话</span>}
          {interviewState === 'connected' && recordingMode === 'manual' && <span>准备开始面试</span>}
        </div>
      </CardContent>
    </Card>
  )
}