"use client";

export function MarkdownReport({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="max-w-none" data-testid="text-report-content">
      {lines.map((line, i) => {
        if (line.startsWith("# ")) {
          return (
            <h1
              key={i}
              className="text-2xl font-bold text-foreground mt-6 mb-3"
            >
              {line.slice(2)}
            </h1>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="text-xl font-semibold text-foreground mt-5 mb-2"
            >
              {line.slice(3)}
            </h2>
          );
        }
        if (line.startsWith("### ")) {
          return (
            <h3
              key={i}
              className="text-lg font-semibold text-foreground mt-4 mb-2"
            >
              {line.slice(4)}
            </h3>
          );
        }
        if (line.startsWith("- ") || line.startsWith("* ")) {
          const text = line.slice(2);
          const boldMatch = text.match(/^\*\*(.*?)\*\*(.*)/);
          if (boldMatch) {
            return (
              <li key={i} className="text-muted-foreground ml-4 mb-1 list-disc">
                <strong className="text-foreground">{boldMatch[1]}</strong>
                {boldMatch[2]}
              </li>
            );
          }
          return (
            <li key={i} className="text-muted-foreground ml-4 mb-1 list-disc">
              {text}
            </li>
          );
        }
        if (/^\d+\.\s/.test(line)) {
          const text = line.replace(/^\d+\.\s/, "");
          const boldMatch = text.match(/^\*\*(.*?)\*\*(.*)/);
          if (boldMatch) {
            return (
              <li
                key={i}
                className="text-muted-foreground ml-4 mb-1 list-decimal"
              >
                <strong className="text-foreground">{boldMatch[1]}</strong>
                {boldMatch[2]}
              </li>
            );
          }
          return (
            <li
              key={i}
              className="text-muted-foreground ml-4 mb-1 list-decimal"
            >
              {text}
            </li>
          );
        }
        if (line.trim() === "") return <br key={i} />;
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={i} className="text-muted-foreground mb-2 leading-relaxed">
            {parts.map((part, j) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <strong key={j} className="text-foreground">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
}
