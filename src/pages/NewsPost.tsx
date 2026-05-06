import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { siteContent } from "@/content/siteContent";
import NotFound from "./NotFound";

const NewsPost = () => {
  const { slug } = useParams();
  const post = siteContent.newsPosts.find((entry) => entry.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <Link to="/news" className="inline-flex items-center gap-2 text-sm text-muted-foreground no-underline hover:text-primary">
        <ArrowLeft className="h-4 w-4" />
        back to news
      </Link>

      <header className="mt-6 mb-10">
        <p className="mb-3 text-sm uppercase tracking-[0.24em] text-muted-foreground">{post.date}</p>
        <h1 className="mb-4 text-2xl font-semibold text-foreground sm:text-3xl">{post.title}</h1>
        <p className="text-sm leading-7 text-foreground/80">{post.summary}</p>
      </header>

      <div className="space-y-10">
        {post.contentSections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-3 text-base font-semibold text-foreground">{section.heading}</h2>
            <div className="mb-4 h-px bg-border" />
            <div className="space-y-4 text-sm leading-7 text-foreground/85">
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.listItems ? (
                <ul className="space-y-2">
                  {section.listItems.map((item) => (
                    <li key={item} className="text-foreground/80">
                      - {item}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.code ? (
                <pre className="overflow-x-auto rounded border border-border bg-secondary/70 p-4 text-sm text-foreground">
                  <code>{section.code.content}</code>
                </pre>
              ) : null}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="mb-3 text-base font-semibold text-foreground">links</h2>
        <div className="mb-4 h-px bg-border" />
        <div className="flex flex-wrap gap-3">
          {post.hrefs.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-2 rounded border border-border px-3 py-2 text-sm text-foreground no-underline hover:border-primary"
            >
              {link.label}
              {link.external ? <ArrowUpRight className="h-4 w-4" /> : null}
            </a>
          ))}
        </div>
      </section>
    </article>
  );
};

export default NewsPost;
