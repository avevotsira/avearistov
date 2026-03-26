import type React from "react";
import { useState, useEffect } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

const TableOfContents: React.FC = () => {
  const [toc, setToc] = useState<TOCItem[]>([]);

  useEffect(() => {
    const generateTOC = () => {
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      const tocItems: TOCItem[] = Array.from(headings)
        .filter((heading) => heading.textContent !== "Table of Contents")
        .map((heading) => ({
          id: heading.id,
          text: heading.textContent || "",
          level: Number.parseInt(heading.tagName.charAt(1)),
        }));
      setToc(tocItems);
    };

    generateTOC();

    // Optional: Re-generate TOC when content changes
    const observer = new MutationObserver(generateTOC);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav>
      <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {toc.map((item) => (
          <li
            key={item.id}
            style={{ marginLeft: `${(item.level - 1) * 1}rem` }}
            className={`
              ${item.level === 1 ? "font-bold" : ""}
              ${item.level === 2 ? "font-semibold" : ""}
              ${item.level > 2 ? "text-sm" : ""}
            `}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className="hover:text-neon-pink transition-colors duration-200"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;

