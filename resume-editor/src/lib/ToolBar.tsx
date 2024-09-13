import { type Editor } from "@tiptap/react";

import { TextB, TextStrikethrough, TextItalic, Minus, ListNumbers, List, ColumnsPlusRight } from "@phosphor-icons/react";
import { MdFormatSize, MdFormatLineSpacing, MdFormatAlignLeft, MdFormatAlignCenter, MdFormatAlignRight } from 'react-icons/md'
import { Toggle } from "../components/Toggle";
import { cn } from "@easy-access/utils";


type Props = {
  editor: Editor | null;
};

export function TiptapToolbar({ editor }: Props) {
  if (!editor) {
    return null;
  }

  return (
    <div className='border border-input bg-transparent'>
      <Toggle size='sm' pressed={editor.isActive("bold")} onPressedChange={() => editor.chain().focus().toggleBold().run()}>
        <TextB className='h-4 w-4' />
      </Toggle>
      <Toggle size='sm' pressed={editor.isActive("italic")} onPressedChange={() => editor.chain().focus().toggleItalic().run()}>
        <TextItalic className='h-4 w-4' />
      </Toggle>
      <Toggle size='sm' pressed={editor.isActive("strikethrough")} onPressedChange={() => editor.chain().focus().toggleStrike().run()}>
        <TextStrikethrough className='h-4 w-4' />
      </Toggle>
      <Toggle size='sm' pressed={editor.isActive("bulletList")} onPressedChange={() => editor.chain().focus().toggleBulletList().run()}>
        <List className='h-4 w-4' />
      </Toggle>
      <Toggle size='sm' pressed={editor.isActive("listItem")} onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListNumbers className='h-4 w-4' />
      </Toggle>
      <Toggle size='sm' pressed={editor.isActive("horizontalRule")} onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus className='h-4 w-4' />
      </Toggle>
      <Toggle size='sm' pressed={editor.isActive("horizontalRule")} onPressedChange={() => editor.chain().focus().setColumns(2, true).run()}>
        <ColumnsPlusRight className='h-4 w-4' />
      </Toggle>
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={cn(editor.isActive('left') ? "bg-accent-3" : '', "border-r px-2 py-1 last:border-none text-accent-6 hover:bg-accent-2")}
      >
        <MdFormatAlignLeft />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={cn(editor.isActive('center') ? "bg-accent-3" : '', "border-r px-2 py-1 last:border-none text-accent-6 hover:bg-accent-2")}
      >
        <MdFormatAlignCenter />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={cn(editor.isActive('right') ? "bg-accent-3" : '', "border-r px-2 py-1 last:border-none text-accent-6 hover:bg-accent-2")}
      >
        <MdFormatAlignRight />
      </button>
    </div>
  );
}