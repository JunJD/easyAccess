import { Node, mergeAttributes } from '@tiptap/core';

export const Column = Node.create({
  name: 'column',
  group: 'column',
  content: '(paragraph|block)*',
  isolating: true,
  selectable: false,

  renderHTML({ HTMLAttributes }) {
    const attrs = mergeAttributes(HTMLAttributes, { class: 'column' });
    return ['div', attrs, 0];
  },

  addAttributes() {
    return {
      class: 'overflow-auto border-dashed border-gray-700 rounded-lg'
    }
  }
});