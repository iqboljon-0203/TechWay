'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Strikethrough, Heading1, Heading2, List, ListOrdered, Quote } from 'lucide-react';
import { useEffect } from 'react';

type TiptapEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-border bg-muted/50 p-2 flex flex-wrap gap-1">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        className={editor.isActive('bold') ? 'bg-muted-foreground/20' : ''}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        className={editor.isActive('italic') ? 'bg-muted-foreground/20' : ''}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleStrike().run();
        }}
        className={editor.isActive('strike') ? 'bg-muted-foreground/20' : ''}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1 my-auto" />
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
        className={editor.isActive('heading', { level: 2 }) ? 'bg-muted-foreground/20' : ''}
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 3 }).run();
        }}
        className={editor.isActive('heading', { level: 3 }) ? 'bg-muted-foreground/20' : ''}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1 my-auto" />
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
        className={editor.isActive('bulletList') ? 'bg-muted-foreground/20' : ''}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={editor.isActive('orderedList') ? 'bg-muted-foreground/20' : ''}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBlockquote().run();
        }}
        className={editor.isActive('blockquote') ? 'bg-muted-foreground/20' : ''}
      >
        <Quote className="h-4 w-4" />
      </Button>
    </div>
  );
};

export function TiptapEditor({ value, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[250px] p-4',
      },
    },
    onUpdate: ({ editor }) => {
      // Return HTML for our JSONB column usage, or parse it depending on the schema format
      onChange(editor.getHTML());
    },
  });

  // Handle external value changes (e.g., reset)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="border border-input rounded-md overflow-hidden bg-background">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
