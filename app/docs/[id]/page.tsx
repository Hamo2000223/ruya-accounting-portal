import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { ALLOWED_DOC_IDS, DOCS_INDEX } from "@/lib/docs-index";
import { MarkdownDocBody } from "@/components/MarkdownDocBody";

type Props = {
  params: Promise<{ id: string }>;
};

function getDocTitle(id: string) {
  return DOCS_INDEX.find((d) => d.id === id)?.title ?? id;
}

export default async function DocArticlePage({ params }: Props) {
  const { id } = await params;

  if (!ALLOWED_DOC_IDS.has(id)) {
    notFound();
  }

  const filePath = path.join(process.cwd(), "content", `${id}.md`);

  let content: string;
  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <nav className="mb-6 text-sm text-zinc-500">
        <Link href="/" className="hover:text-zinc-300">
          الرئيسية
        </Link>
        <span className="mx-2 text-zinc-600">/</span>
        <Link href="/docs" className="hover:text-zinc-300">
          الدليل
        </Link>
        <span className="mx-2 text-zinc-600">/</span>
        <span className="text-zinc-300">{getDocTitle(id)}</span>
      </nav>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-10">
        <MarkdownDocBody content={content} />
      </div>

      <div className="mt-8 flex justify-between gap-4">
        <Link href="/docs" className="text-sm text-accent hover:underline">
          ← العودة إلى فهرس الدليل
        </Link>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return Array.from(ALLOWED_DOC_IDS).map((id) => ({ id }));
}
