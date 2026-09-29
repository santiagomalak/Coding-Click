import { Link } from "react-router-dom";
import SectionLabel from "@/components/SectionLabel";
import { getBlogPosts } from "@/lib/content";

export default function Blog() {
  const posts = getBlogPosts();

  return (
    <div className="px-[5vw] py-24">
      <SectionLabel number="06" label="Blog" />
      <h1 className="mt-4 font-display text-4xl md:text-6xl">Novedades</h1>

      {posts.length === 0 ? (
        <p className="mt-16 max-w-md text-muted">
          Todavía no hay artículos publicados. Cada post se suma como un archivo en{" "}
          <code className="text-ink">src/content/blog</code>, sin tocar el diseño.
        </p>
      ) : (
        <div className="mt-16">
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="block border-b border-line py-8 hover:text-accent">
              <p className="text-xs text-muted">{post.date}</p>
              <p className="mt-2 font-display text-2xl md:text-3xl">{post.title}</p>
              <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
