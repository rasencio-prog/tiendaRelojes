import { useEditor, EditorContent } from '@tiptap/react'
import { useEffect } from 'react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import TextAlign from '@tiptap/extension-text-align'

const btn = (active) => ({
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '0.8rem',
  cursor: 'pointer',
  border: 'none',
  backgroundColor: active ? '#c5a059' : '#2a2a2a',
  color: active ? '#0a0a0a' : '#a3a3a3',
  fontWeight: active ? '700' : '400',
})

export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        style: [
          'min-height:120px',
          'outline:none',
          'padding:12px',
          'font-size:0.9rem',
          'line-height:1.6',
          'color:#f5f5f5',
          "font-family:'Inter',sans-serif",
        ].join(';'),
      },
    },
  })

  useEffect(() => {
    if (!editor) return
    const current = editor.getHTML()
    if (current !== value) {
      editor.commands.setContent(value || '', false)
    }
  }, [value, editor])

  if (!editor) return null

  return (
    <div style={{ border: '1px solid #2a2a2a', borderRadius: '6px', backgroundColor: '#0d0d0d', overflow: 'hidden' }}>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b" style={{ borderColor: '#2a2a2a', backgroundColor: '#111' }}>
        <button type="button" style={btn(editor.isActive('bold'))}
          onClick={() => editor.chain().focus().toggleBold().run()}>
          <b>N</b>
        </button>
        <button type="button" style={btn(editor.isActive('italic'))}
          onClick={() => editor.chain().focus().toggleItalic().run()}>
          <i>I</i>
        </button>
        <button type="button" style={btn(editor.isActive('underline'))}
          onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <u>S</u>
        </button>

        <div style={{ width: '1px', backgroundColor: '#2a2a2a', margin: '0 4px' }} />

        <button type="button" style={btn(editor.isActive('bulletList'))}
          onClick={() => editor.chain().focus().toggleBulletList().run()}>
          ≡
        </button>
        <button type="button" style={btn(editor.isActive('orderedList'))}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1.
        </button>

        <div style={{ width: '1px', backgroundColor: '#2a2a2a', margin: '0 4px' }} />

        <button type="button" style={btn(editor.isActive({ textAlign: 'left' }))}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}>
          ◁
        </button>
        <button type="button" style={btn(editor.isActive({ textAlign: 'center' }))}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}>
          ▷◁
        </button>
        <button type="button" style={btn(editor.isActive({ textAlign: 'right' }))}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}>
          ▷
        </button>

        <div style={{ width: '1px', backgroundColor: '#2a2a2a', margin: '0 4px' }} />

        <input
          type="color"
          title="Color de texto"
          style={{ width: '28px', height: '28px', padding: '2px', borderRadius: '4px', border: '1px solid #2a2a2a', backgroundColor: '#2a2a2a', cursor: 'pointer' }}
          onChange={e => editor.chain().focus().setColor(e.target.value).run()}
        />
      </div>

      {/* Editor area */}
      <EditorContent editor={editor} />
    </div>
  )
}
