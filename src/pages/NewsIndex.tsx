import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { siteContent } from "@/content/siteContent";

const NewsIndex = () => {
  const posts = [...siteContent.newsPosts].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <header className="mb-10">
        <p className="mb-3 text-sm uppercase tracking-[0.24em] text-muted-foreground">news</p>
        <h1 className="mb-3 text-2xl font-semibold text-foreground sm:text-3xl">notes on what is shipping</h1>
        <p className="max-w-2xl text-sm leading-7 text-foreground/80">
          This page collects product notes, release highlights, and the bigger stories behind the things I am building.
        </p>
      </header>

      <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded border border-border bg-card/70 p-4 sm:p-5 transition-colors hover:border-primary/60"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2 text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  <span>{post.date}</span>
                  {post.featured ? <span className="text-primary">featured</span> : null}
                </div>
                <h2 className="mb-2 text-lg font-semibold text-foreground">{post.title}</h2>
                <p className="text-sm leading-7 text-foreground/80">{post.summary}</p>
              </div>
              <Link to={`/news/${post.slug}`} className="inline-flex items-center gap-2 text-sm text-primary no-underline hover:underline">
                read note
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default NewsIndex;
