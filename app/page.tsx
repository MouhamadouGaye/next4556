
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
