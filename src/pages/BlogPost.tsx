import { useParams, Link } from "react-router-dom";
import { getBlogPosts } from "@/lib/content";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPosts().find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="px-[5vw] py-24">
        <p className="text-muted">No encontramos ese artículo.</p>
        <Link to="/blog" className="mt-4 inline-block underline underline-offset-4 hover:text-accent">
          ← Volver al blog
        </Link>
      </div>
    );
  }

  return (
    <article className="px-[5vw] py-24">
      <Link to="/blog" className="text-sm text-muted underline underline-offset-4 hover:text-accent">
        ← Blog
      </Link>
      <p className="mt-6 text-xs text-muted">{post.date}</p>
      <h1 className="mt-2 max-w-3xl font-display text-4xl md:text-6xl">{post.title}</h1>
      <div className="prose prose-invert mt-12 max-w-2xl whitespace-pre-wrap text-ink">{post.content}</div>
    </article>
  );
}
