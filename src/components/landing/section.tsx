import { cn } from "@/lib/utils";

export function Section({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}

export function SectionHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("max-w-3xl mx-auto text-center mb-12 [&>h2]:font-heading [&>h2]:font-bold", className)}>{children}</div>;
}

export function SectionBadge({ children }: { children: React.ReactNode }) {
  return <span className="inline-block px-3 py-1 mb-4 rounded-full bg-audience-soft text-audience text-sm font-semibold tracking-wide uppercase">{children}</span>;
}
