// "use client";
// import fs from "fs";
// import React from "react";

// const getPostsContent = (slug: string) => {
//   const folder = "posts/";
//   const file = `${folder}${slug}.md`;
//   const content = fs.readdirSync(file, "utf8");
//   return content;
// };

// const PostPage = (props: any) => {
//   const slug = props.params.slug;
//   const content = getPostsContent(slug);
//   return (
//     <div className="text-black">
//       <h1>{content}</h1>
//     </div>
//   );
// };

// export default PostPage;

// pages/posts/[slug].tsx

// pages/posts/[slug].tsx

// import fs from "fs";
// import path from "path";
// import { GetStaticProps, GetStaticPaths } from "next";

// interface PostPageProps {
//   content: string;
// }

// export const getStaticProps: GetStaticProps<PostPageProps> = async ({
//   params,
// }) => {
//   const slug = params?.slug as string;
//   const folder = "posts";
//   const filePath = path.join(process.cwd(), folder, `${slug}.md`);
//   const content = fs.readFileSync(filePath, "utf8");

//   return {
//     props: {
//       content,
//     },
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const folder = path.join(process.cwd(), "posts");
//   const filenames = fs.readdirSync(folder);
//   const paths = filenames.map((filename) => ({
//     params: { slug: filename.replace(/\.md$/, "") },
//   }));

//   return {
//     paths,
//     fallback: false, // or 'blocking' for incremental static regeneration
//   };
// };

// const PostPage: React.FC<PostPageProps> = ({ content }) => {
//   return (
//     <div className="text-black">
//       <h1>{content}</h1>
//     </div>
//   );
// };

// export default PostPage;

// THE CODE ABOVE IS NOT GETSTATITICPROPS IS NOT  SUPPORTED

// import fs from "fs";
// import path from "path";
// import { notFound } from "next/navigation"; // Import to handle 404
// import { FC } from "react";

// interface PostPageProps {
//   params: {
//     slug: string;
//   };
// }

// // Async function to read the markdown content of a given slug
// const getPostContent = (slug: string): string | null => {
//   try {
//     const folder = path.join(process.cwd(), "posts");
//     const filePath = path.join(folder, `${slug}.md`);
//     const content = fs.readFileSync(filePath, "utf8");
//     return content;
//   } catch (error) {
//     console.error("Error loading content:", error);
//     return null; // Return null if file doesn't exist
//   }
// };

// // Define PostPage as an async component
// const PostPage: FC<PostPageProps> = async ({ params }) => {
//   const { slug } = params;
//   const content = getPostContent(slug);

//   // Handle the case where the content was not found
//   if (!content) {
//     notFound();
//   }

//   return (
//     <div className="text-black">
//       <h1>{content}</h1>
//     </div>
//   );
// };

// export default PostPage;

// THE CODE ABOVE ONLY DISPLY TEXTS NOT MEDIA BUT WORKS PERFECLY FINE

// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { notFound } from "next/navigation";

// interface PostPageProps {
//   params: {
//     slug: string;
//   };
// }

// const getPostContent = (
//   slug: string
// ): { content: string; metadata: any } | null => {
//   try {
//     const folder = path.join(process.cwd(), "posts");
//     const filePath = path.join(folder, `${slug}.md`);
//     const fileContents = fs.readFileSync(filePath, "utf8");
//     const { content, data } = matter(fileContents);
//     return { content, metadata: data };
//   } catch (error) {
//     console.error("Error loading content:", error);
//     return null;
//   }
// };

// const PostPage: React.FC<PostPageProps> = async ({ params }) => {
//   const { slug } = params;
//   const post = getPostContent(slug);

//   if (!post) {
//     notFound();
//   }

//   const { content, metadata } = post;

//   return (
//     <div className="post-content">
//       <h1>{metadata.title}</h1>
//       <p>{metadata.subtitle}</p>
//       <small>{metadata.date}</small>
//       {metadata.image && (
//         <img
//           src={metadata.image}
//           alt={metadata.title}
//           className="post-thumbnail"
//         />
//       )}
//       <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
//     </div>
//   );
// };

// export default PostPage;

// THE CODE UNDERNEATH IS STYLED USING TAILWINDS

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: {
    slug: string;
  };
}

const getPostContent = (
  slug: string
): { content: string; metadata: any } | null => {
  try {
    const folder = path.join(process.cwd(), "posts");
    const filePath = path.join(folder, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(fileContents);
    return { content, metadata: data };
  } catch (error) {
    console.error("Error loading content:", error);
    return null;
  }
};

const PostPage: React.FC<PostPageProps> = async ({ params }) => {
  const { slug } = params;
  const post = getPostContent(slug);

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
};

export default PostPage;
