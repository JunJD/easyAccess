import TextStyle from '@tiptap/extension-text-style'
import { FontSize } from './font-size'
import { LineHeight } from './line-height'

export const ResumeTextStyle = TextStyle.extend({
    addExtensions() {
        return [
            FontSize,
            LineHeight,
        ]
    }
})