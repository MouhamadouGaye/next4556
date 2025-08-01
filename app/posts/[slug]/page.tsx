// app/posts/[slug]/page.tsx

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";

interface PostMetadata {
  title: string;
  subtitle: string;
  date: string;
  image?: string;
}

interface Props {
  params: {
    slug: string;
  };
}

const getPostContent = async (
  slug: string
): Promise<{ content: string; metadata: PostMetadata } | null> => {
  try {
    const folder = path.join(process.cwd(), "posts");
    const filePath = path.join(folder, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(fileContents);
    return { content, metadata: data as PostMetadata };
  } catch (error) {
    console.error("Error loading content:", error);
    return null;
  }
};

export default async function PostPage({ params }: Props) {
  const { slug } = params;
  const post = await getPostContent(slug);

  if (!post) {
    notFound();
  }

  const { content, metadata } = post;

  return (
    <div className="bg-highlight min-h-screen p-10 text-primary font-sans">
      <article className="max-w-3xl mx-auto bg-background p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">{metadata.title}</h1>
        <p className="text-secondary text-lg mb-6">{metadata.subtitle}</p>
        <small className="block text-secondary mb-8">{metadata.date}</small>
        {metadata.image && (
          <img
            src={metadata.image}
            alt={metadata.title}
            className="rounded-lg mb-8 w-full object-cover"
          />
        )}
        <div className="prose prose-lg prose-img:rounded-lg prose-a:text-link prose-a:underline prose-a:hover:text-accent">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}


