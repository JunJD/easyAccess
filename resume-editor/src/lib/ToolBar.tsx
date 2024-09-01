import { type Editor } from "@tiptap/react";

import { TextB, TextStrikethrough, TextItalic, Minus, ListNumbers, List, ColumnsPlusRight } from "@phosphor-icons/react";
import { Toggle } from "../components/Toggle";


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
    </div>
  );
}