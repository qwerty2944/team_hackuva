"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Markdown } from "tiptap-markdown";

function readMarkdown(editor: Editor): string {
  const storage = editor.storage as unknown as {
    markdown?: { getMarkdown: () => string };
  };
  return storage.markdown?.getMarkdown() ?? "";
}
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Strikethrough,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";

export function MarkdownEditor({
  name,
  defaultValue = "",
  placeholder = "내용을 입력하세요…",
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  const [value, setValue] = useState(defaultValue);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder }),
      Markdown.configure({ html: false, breaks: true, transformPastedText: true }),
    ],
    content: defaultValue,
    editorProps: {
      attributes: {
        class:
          "prose prose-neutral dark:prose-invert min-h-[320px] max-w-none px-4 py-3 focus:outline-none prose-headings:tracking-tight",
      },
    },
    onUpdate({ editor }) {
      setValue(readMarkdown(editor));
    },
  });

  useEffect(() => {
    if (editor && defaultValue && editor.isEmpty) {
      editor.commands.setContent(defaultValue);
      setValue(readMarkdown(editor));
    }
  }, [editor, defaultValue]);

  return (
    <div className="overflow-hidden rounded-lg border border-input bg-transparent transition-colors focus-within:border-ring">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      <input type="hidden" name={name} value={value} />
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;
  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-border/60 bg-muted/30 px-2 py-1.5">
      <ToolButton
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
        label="굵게"
      >
        <Bold className="size-3.5" />
      </ToolButton>
      <ToolButton
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        label="기울임"
      >
        <Italic className="size-3.5" />
      </ToolButton>
      <ToolButton
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        label="취소선"
      >
        <Strikethrough className="size-3.5" />
      </ToolButton>
      <Divider />
      <ToolButton
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        label="제목 2"
      >
        <Heading2 className="size-3.5" />
      </ToolButton>
      <ToolButton
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        label="제목 3"
      >
        <Heading3 className="size-3.5" />
      </ToolButton>
      <Divider />
      <ToolButton
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        label="글머리"
      >
        <List className="size-3.5" />
      </ToolButton>
      <ToolButton
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        label="번호 목록"
      >
        <ListOrdered className="size-3.5" />
      </ToolButton>
      <ToolButton
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        label="인용"
      >
        <Quote className="size-3.5" />
      </ToolButton>
      <ToolButton
        active={editor.isActive("codeBlock")}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        label="코드 블록"
      >
        <Code className="size-3.5" />
      </ToolButton>
      <Divider />
      <ToolButton
        active={editor.isActive("link")}
        onClick={() => {
          const previous = editor.getAttributes("link").href as
            | string
            | undefined;
          const url = window.prompt("링크 URL", previous ?? "https://");
          if (url === null) return;
          if (url === "") {
            editor.chain().focus().unsetLink().run();
            return;
          }
          editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }}
        label="링크"
      >
        <LinkIcon className="size-3.5" />
      </ToolButton>
    </div>
  );
}

function ToolButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
        active && "bg-secondary text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-0.5 h-4 w-px bg-border/60" />;
}
