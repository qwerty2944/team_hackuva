import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export function PostBody({ markdown }: { markdown: string }) {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:tracking-tight prose-h1:text-3xl prose-h2:text-xl prose-pre:bg-muted/60 prose-code:before:hidden prose-code:after:hidden prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.85em] prose-blockquote:border-l-2 prose-blockquote:not-italic prose-blockquote:text-muted-foreground">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          [rehypeHighlight, { aliases: { typescript: "tsx", javascript: "jsx" } }],
        ]}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
