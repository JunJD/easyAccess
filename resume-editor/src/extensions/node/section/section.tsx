

import { NodeViewContent, NodeViewProps, NodeViewRendererProps, NodeViewWrapper } from "@tiptap/react"
import { useEffect, useRef, useState } from "react"
import {  ClosedCaptioning, SneakerMove } from "@phosphor-icons/react";
import styles from './section.module.css'


import { cn } from "@easy-access/utils";
import { useResize } from "@easy-access/hooks";

export const Section = (props: NodeViewProps) => {
  const { editor, node, getPos } = props
  const [isFocused, setFocused] = useState(false)
  const [pos, setPos] = useState<number>(-1)
  const { anchor } = editor.state.selection
  const ref = useRef<HTMLDivElement | null>(null)
  useResize({ target: ref, editor: editor as any, onUpdate: (width) => props.updateAttributes({ width }) })

  useEffect(() => {
    const timer = setInterval(() => {
      setFocused(editor.isFocused)
      setPos(getPos())
    }, 250)
    return () => clearInterval(timer)
  }, [getPos, editor])

  const hasAnchor = (anchor >= pos && anchor <= (pos + node.nodeSize) && isFocused
  )

  const handleAddSection = (top: boolean) => () => {
    if (typeof getPos === 'function') {
      const insertAt = getPos() + (top ? 0 : node.nodeSize)
      editor.chain().insertContentAt(insertAt, [{
        type: 'section',
        content: [{ type: 'paragraph' }]
      }])
        .run();
    }
  }

  const destroy = () => {
    if (typeof getPos === 'function') {
      const pos = getPos()
      const end = pos + node.nodeSize
      editor.commands.deleteRange({ from: pos, to: end })
    }
  }

  return (
    <NodeViewWrapper className={styles.root}>
      <div
        ref={(r) => ref.current = r}
        className={cn('resizable-section', styles.container, hasAnchor && styles.focused)}
        style={{
          width: node.attrs.width
        }}
      >

        <div className={styles.topControls}
        >
          <div
            className={cn(styles.dragHandle, styles.controlButton)}
            contentEditable={false}
            draggable="true"
            data-drag-handle
          >
            <SneakerMove className="w-4 h-4" />
          </div>
          <button
            className={cn(styles.insertSectionButton)}
            type="button"
            onClick={handleAddSection(true)}
          >
            + insert section
          </button>
          <button
            type="button"
            onClick={destroy}
            className={cn(styles.closeIcon, styles.controlButton)}
          ><ClosedCaptioning className="w-4 h-4" /></button>
        </div>
        <NodeViewContent />
        <div className={styles.bottomControls}>
          <button
            className={cn(styles.insertSectionButton)}
            type="button"
            onClick={handleAddSection(false)}
          >
            + insert section
          </button>
        </div>
      </div>
    </NodeViewWrapper>
  )
}
