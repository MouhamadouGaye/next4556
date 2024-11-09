// import fs from "fs";
// import Link from "next/link";

// const PostsMetaData = () => {
//   const folder = "posts/";
//   const files = fs.readdirSync(folder);
//   const markdownPosts = files.filter((file) => file.endsWith(".md"));
//   const slugs = markdownPosts.map((file) => file.replace(".md", ""));
//   return slugs;
// };

// export default function HomePage() {
//   const Metadata = PostsMetaData();
//   const postPreviews = Metadata.map((slug) => (
//     <div>
//       <Link href={`/posts/${slug}`}>
//         <h2>{slug}</h2>
//       </Link>
//     </div>
//   ));

//   return (
//     // grid text-black items-center justify-items-center min-h-screen  p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
//     <div className="">{postPreviews}</div>
//   );
// }

// pages/index.tsx
// import fs from "fs";
// import path from "path";
// import Link from "next/link";
// import { GetStaticProps } from "next";

// interface HomePageProps {
//   metadata: string[];
// }

// // This function will only run on the server side to fetch metadata.
// export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
//   const folder = path.join(process.cwd(), "posts");
//   const files = fs.readdirSync(folder);
//   const markdownPosts = files.filter((file) => file.endsWith(".md"));
//   const slugs = markdownPosts.map((file) => file.replace(".md", ""));

//   return {
//     props: {
//       metadata: slugs,
//     },
//   };
// };

// // Component to render the HomePage
// export default function HomePage({ metadata }: HomePageProps) {
//   const postPreviews = metadata.map((slug) => (
//     <div key={slug}>
//       <Link href={`/posts/${slug}`}>
//         <h2>{slug}</h2>
//       </Link>
//     </div>
//   ));

//   return (
//     <div className="text-black grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       {postPreviews}
//     </div>
//   );
// }

// import fs from "fs";
// import path from "path";
// import Link from "next/link";
// import { FC } from "react";

// // Function to get posts metadata from the "posts" folder
// const getPostsMetaData = async (): Promise<string[]> => {
//   const folder = path.join(process.cwd(), "posts");
//   const files = fs.readdirSync(folder);
//   const markdownPosts = files.filter((file) => file.endsWith(".md"));
//   const slugs = markdownPosts.map((file) => file.replace(".md", ""));
//   return slugs;
// };

// // Define the HomePage component as an async function
// const HomePage: FC = async () => {
//   const metadata = await getPostsMetaData();
//   const postPreviews = metadata.map((slug) => (
//     <div key={slug}>
//       <Link href={`/posts/${slug}`}>
//         <h2>{slug}</h2>
//       </Link>
//     </div>
//   ));

//   return (
//     <div className="text-black grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[var(--font-geist-sans)]">
//       {postPreviews}
//     </div>
//   );
// };

// export default HomePage;

// THE CODE ABOVE ONLY SHOW TEXT NOT IMAGES BUT IT WORKS

// import fs from "fs";
// import path from "path";
// import Link from "next/link";
// import matter from "gray-matter";

// interface PostMetadata {
//   slug: string;
//   title: string;
//   subtitle: string;
//   date: string;
//   image?: string;
// }

// // Function to get metadata from markdown files
// const getPostsMetaData = (): PostMetadata[] => {
//   const folder = path.join(process.cwd(), "posts");
//   const files = fs.readdirSync(folder);
//   const markdownPosts = files.filter((file) => file.endsWith(".md"));

//   return markdownPosts.map((file) => {
//     const slug = file.replace(".md", "");
//     const filePath = path.join(folder, file);
//     const fileContents = fs.readFileSync(filePath, "utf8");
//     const { data } = matter(fileContents);
//     return {
//       slug,
//       title: data.title,
//       subtitle: data.subtitle,
//       date: data.date,
//       image: data.image,
//     };
//   });
// };

// export default function HomePage() {
//   const posts = getPostsMetaData();

//   return (
//     <div className="text-black grid gap-8">
//       {posts.map(({ slug, title, subtitle, date, image }) => (
//         <Link href={`/posts/${slug}`} key={slug}>
//           <div className="post-preview">
//             {image && <img src={image} alt={title} className="thumbnail" />}
//             <h2>{title}</h2>
//             <p>{subtitle}</p>
//             <small>{date}</small>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }

import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";

interface PostMetadata {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  image?: string;
}

// Function to get metadata from markdown files
const getPostsMetaData = (): PostMetadata[] => {
  const folder = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));

  return markdownPosts.map((file) => {
    const slug = file.replace(".md", "");
    const filePath = path.join(folder, file);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    return {
      slug,
      title: data.title,
      subtitle: data.subtitle,
      date: data.date,
      image: data.image,
    };
  });
};

export default function HomePage() {
  const posts = getPostsMetaData();

  return (
    <div className="bg-highlight  min-h-screen p-10 text-primary font-sans">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to My Blog
      </h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(({ slug, title, subtitle, date, image }) => (
          <Link href={`/posts/${slug}`} key={slug}>
            <div className="bg-background p-6 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105">
              {image && (
                <img
                  src={image}
                  alt={title}
                  className="rounded-md mb-4 w-full h-48 object-cover"
                />
              )}
              <h2 className="text-2xl font-semibold text-primary">{title}</h2>
              <p className="text-secondary mt-2">{subtitle}</p>
              <small className="block mt-4 text-secondary">{date}</small>
              <p className="mt-4 text-link font-medium underline hover:text-accent">
                Read more + →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
