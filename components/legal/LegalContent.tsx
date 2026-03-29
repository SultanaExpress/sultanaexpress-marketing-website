import type { ReactNode } from "react";

interface LegalSection {
  title: string;
  content: string;
}

interface LegalContentProps {
  lastUpdated: string;
  sections: LegalSection[];
}

/**
 * Parses simple markdown-like content into React elements.
 * Handles: **bold**, \n\n paragraphs, - list items, and email mailto links.
 */
function parseContent(content: string): ReactNode[] {
  const blocks = content.split("\n\n");
  const elements: ReactNode[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i].trim();
    if (!block) continue;

    const lines = block.split("\n");
    const listItems = lines.filter((line) => line.trimStart().startsWith("- "));

    if (listItems.length > 0 && listItems.length === lines.length) {
      // Entire block is a list
      elements.push(
        <ul
          key={`list-${i}`}
          className="space-y-2 my-4"
        >
          {listItems.map((item, j) => (
            <li
              key={j}
              className="flex gap-3 text-text-secondary leading-relaxed"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-400 mt-2.5 shrink-0" />
              <span>{parseInline(item.replace(/^\s*-\s*/, ""))}</span>
            </li>
          ))}
        </ul>
      );
    } else {
      // Mixed content: could have paragraphs and lists
      const groups: { type: "paragraph" | "list"; lines: string[] }[] = [];
      let current: { type: "paragraph" | "list"; lines: string[] } | null =
        null;

      for (const line of lines) {
        const isList = line.trimStart().startsWith("- ");
        const type = isList ? "list" : "paragraph";

        if (current && current.type === type) {
          current.lines.push(line);
        } else {
          if (current) groups.push(current);
          current = { type, lines: [line] };
        }
      }
      if (current) groups.push(current);

      for (let g = 0; g < groups.length; g++) {
        const group = groups[g];
        if (group.type === "list") {
          elements.push(
            <ul
              key={`list-${i}-${g}`}
              className="space-y-2 my-4"
            >
              {group.lines.map((item, j) => (
                <li
                  key={j}
                  className="flex gap-3 text-text-secondary leading-relaxed"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-400 mt-2.5 shrink-0" />
                  <span>{parseInline(item.replace(/^\s*-\s*/, ""))}</span>
                </li>
              ))}
            </ul>
          );
        } else {
          elements.push(
            <p
              key={`p-${i}-${g}`}
              className="text-text-secondary leading-relaxed"
            >
              {parseInline(group.lines.join(" "))}
            </p>
          );
        }
      }
    }
  }

  return elements;
}

/**
 * Parses inline formatting: **bold** and email addresses (mailto links).
 */
function parseInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  // Match **bold** or email patterns
  const regex = /(\*\*(.+?)\*\*)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // Bold text
      parts.push(
        <strong key={match.index} className="font-semibold text-text-primary">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      // Email address
      parts.push(
        <a
          key={match.index}
          href={`mailto:${match[3]}`}
          className="text-brand-500 hover:text-brand-600 underline underline-offset-2"
        >
          {match[3]}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export function LegalContent({ lastUpdated, sections }: LegalContentProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Last updated badge */}
      <div className="mb-12 flex justify-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-surface-200 text-text-muted">
          {lastUpdated}
        </span>
      </div>

      {/* Sections */}
      <div className="space-y-12">
        {sections.map((section, index) => (
          <section key={index}>
            <h2 className="text-2xl font-bold text-text-primary border-b border-surface-300 pb-3 mb-4">
              {section.title}
            </h2>
            <div className="space-y-3">
              {parseContent(section.content)}
            </div>
          </section>
        ))}
      </div>

      {/* Back to top */}
      <div className="mt-16 pt-8 border-t border-surface-300 text-center">
        <a
          href="#main-content"
          className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-brand-500 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
          Back to top
        </a>
      </div>
    </div>
  );
}
