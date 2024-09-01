import { NodeViewProps, NodeViewWrapper, NodeViewWrapperProps } from "@tiptap/react"
import { MdDragHandle } from "react-icons/md"
// import styles from './spacer.module.css'
import { cn } from "@easy-access/utils"
import { useSpacer } from "@easy-access/hooks"



export const Spacer = ({ node, updateAttributes }: NodeViewProps) => {
  useSpacer('.resizable', (height: number) => updateAttributes({ height }))
  return (
    <NodeViewWrapper
      className={cn('items-end justify-center', 'resizable hover:outline hover:outline-1 hover:outline-blue-400')}
      style={{
        height: node.attrs.height
      }}>
      <div className='mb-2'>
        <MdDragHandle className='w-6 h-6 text-blue-400' />
      </div>
    </NodeViewWrapper>
  )
}
