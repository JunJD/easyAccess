"use client"

import React, { useState, useRef, useEffect } from 'react'
import { useCopilotChat } from "@copilotkit/react-core"
import { Role, TextMessage } from "@copilotkit/runtime-client-gql"
import { CopilotChat } from "@copilotkit/react-ui"
import { ScrollArea } from "apps/easyAccess/libs/ui/scroll-area"
import { Input } from "apps/easyAccess/libs/ui/input"
import { Button } from "apps/easyAccess/libs/ui/Button"
import { Tooltip } from "apps/easyAccess/libs/ui/tooltip"
import { Popover, PopoverTrigger, PopoverContent } from "apps/easyAccess/libs/ui/popover"
import { ChatTeardropDots, PaperPlaneRight, User, Robot, HeadCircuit, Copy, Trash, ArrowClockwise, PencilSimple, DotsThreeVertical } from "@phosphor-icons/react"
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import { toast } from "apps/easyAccess/libs/ui/use-toast"
import IconWithFallback from '../../_component/IconWithFallback'

const customIcons = {
  chat: <ChatTeardropDots weight="fill" className="w-6 h-6" />,
  send: <PaperPlaneRight weight="fill" className="w-5 h-5" />,
  user: <User weight="fill" className="w-6 h-6" />,
  ai: <Robot weight="fill" className="w-6 h-6" />,
}

const customLabels = {
  title: "AI助手",
  initial: "你好！👋 我是你的AI助手。有什么我可以帮助你的吗？",
  placeholder: "输入你的问题...",
  sendButtonLabel: "发送",
  responseButton: "生成回复",
}

function MessageActions({ onCopy, onDelete, onRetry, onEdit }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <DotsThreeVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <div className="grid gap-2">
          <Button variant="ghost" size="sm" onClick={onCopy} className="justify-start">
            <Copy className="mr-2 h-4 w-4" />
            复制
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete} className="justify-start">
            <Trash className="mr-2 h-4 w-4" />
            删除
          </Button>
          <Button variant="ghost" size="sm" onClick={onRetry} className="justify-start">
            <ArrowClockwise className="mr-2 h-4 w-4" />
            重试
          </Button>
          <Button variant="ghost" size="sm" onClick={onEdit} className="justify-start">
            <PencilSimple className="mr-2 h-4 w-4" />
            编辑
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function CustomMessage({ messages, inProgress, onMessageAction }) {
  const scrollAreaRef = useRef(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo(0, scrollAreaRef.current.scrollHeight)
    }
  }, [messages])

  return (
    <ScrollArea ref={scrollAreaRef} className="flex-1 p-2 space-y-4">
      {messages.map((msg, index) => (
        <div key={index} className={`mb-4 flex group ${msg.role === Role.User ? 'justify-end' : 'justify-start'}`}>
          <div className={`flex items-start space-x-2 max-w-full ${msg.role === Role.User ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <div className={`flex-shrink-0 p-2 rounded-full ${msg.role === Role.User ? 'bg-blue-500' : 'bg-gray-300'}`}>
              {msg.role === Role.User ? customIcons.user : customIcons.ai}
            </div>
            <div className={`p-3 rounded-lg ${msg.role === Role.User ? 'bg-blue-100' : 'bg-gray-100'} overflow-x-auto max-w-[calc(100%-4rem)]`}>
              <ReactMarkdown
                className="text-sm prose dark:prose-invert max-w-none"
                remarkPlugins={[remarkGfm]}
                components={{
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  },
                  table: ({children, ...props}) => (
                    <div className="overflow-x-auto">
                      <table {...props}>{children}</table>
                    </div>
                  ),
                }}
              >
                {msg.content}
              </ReactMarkdown>
              <p className="text-xs text-gray-500 mt-1">{new Date().toLocaleTimeString()}</p>
            </div>
            <MessageActions
              onCopy={() => onMessageAction('copy', index)}
              onDelete={() => onMessageAction('delete', index)}
              onRetry={() => onMessageAction('retry', index)}
              onEdit={() => onMessageAction('edit', index)}
            />
          </div>
        </div>
      ))}
      {inProgress && (
        <div className="flex justify-start">
          <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg">
            <HeadCircuit className="w-5 h-5 animate-spin" />
            <p className="text-sm">AI正在思考...</p>
          </div>
        </div>
      )}
    </ScrollArea>
  )
}

function CustomInput({ inProgress, onSend, editingMessage, setEditingMessage }) {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (editingMessage) {
      setInputValue(editingMessage.content)
    }
  }, [editingMessage])

  const handleSend = () => {
    if (inputValue.trim() && !inProgress) {
      if (editingMessage) {
        onSend(inputValue, editingMessage.index)
        setEditingMessage(null)
      } else {
        onSend(inputValue)
      }
      setInputValue('')
    }
  }

  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-50 border-t">
      <Input
        placeholder={editingMessage ? "编辑消息..." : customLabels.placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
        className="flex-1"
      />
      <Tooltip content={inProgress ? "AI正在回复" : "发送"}>
        <Button size="icon" onClick={handleSend} disabled={inProgress || !inputValue.trim()}>
          <IconWithFallback icon={inProgress ? HeadCircuit : PaperPlaneRight} className="h-4 w-4" />
        </Button>
      </Tooltip>
    </div>
  )
}

export default function CustomCopilotChat() {
  const {
    visibleMessages,
    appendMessage,
    deleteMessage,
    updateMessage,
    isLoading,
  } = useCopilotChat({
    id: "custom-chat",
    initialMessages: [
      new TextMessage({
        content: customLabels.initial,
        role: Role.Assistant,
      }),
    ],
  })

  const [editingMessage, setEditingMessage] = useState(null)

  const handleSubmitMessage = async (message, editIndex = null) => {
    try {
      if (editIndex !== null) {
        await updateMessage(editIndex, new TextMessage({
          content: message,
          role: visibleMessages[editIndex].role,
        }))
        toast({
          title: "消息已更新",
          description: "您的消息已成功编辑。",
        })
      } else {
        await appendMessage(
          new TextMessage({
            content: message,
            role: Role.User,
          })
        )
      }
    } catch (error) {
      console.error("Error submitting message:", error)
      toast({
        title: "发送失败",
        description: "无法发送消息，请稍后重试。",
        variant: "destructive",
      })
    }
  }

  const handleMessageAction = async (action, index) => {
    try {
      switch (action) {
        case 'copy':
          await navigator.clipboard.writeText(visibleMessages[index].content)
          toast({
            title: "已复制",
            description: "消息内容已复制到剪贴板。",
          })
          break
        case 'delete':
          await deleteMessage(index)
          toast({
            title: "已删除",
            description: "消息已成功删除。",
          })
          break
        case 'retry':
          if (index > 0) {
            const previousMessage = visibleMessages[index - 1]
            await appendMessage(new TextMessage({
              content: previousMessage.content,
              role: previousMessage.role,
            }))
            toast({
              title: "重试中",
              description: "正在重新生成回复。",
            })
          }
          break
        case 'edit':
          setEditingMessage({ content: visibleMessages[index].content, index })
          break
      }
    } catch (error) {
      console.error("Error performing message action:", error)
      toast({
        title: "操作失败",
        description: "无法完成请求的操作，请稍后重试。",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="h-full w-full bg-white flex flex-col">
      <div className="p-2 bg-gray-50 border-b flex items-center space-x-2">
        {customIcons.chat}
        <h2 className="text-lg font-semibold">{customLabels.title}</h2>
      </div>
      <CopilotChat
        icons={customIcons}
        labels={customLabels}
        onSubmitMessage={handleSubmitMessage}
        className="flex-1 flex flex-col overflow-auto"
        showResponseButton={false}
        instructions="你是一个友好的AI助手，专门回答有关软件开发的问题。"
        Messages={({ messages }) => (
          <CustomMessage
            messages={visibleMessages}
            inProgress={isLoading}
            onMessageAction={handleMessageAction}
          />
        )}
        Input={({ onSend }) => (
          <CustomInput
            inProgress={isLoading}
            onSend={handleSubmitMessage}
            editingMessage={editingMessage}
            setEditingMessage={setEditingMessage}
          />
        )}
      />
    </div>
  )
}