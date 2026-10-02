import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { articles, getArticle } from "@/data/insights";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/insights/${article.slug}`,
    type: "article",
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const more = articles.filter((item) => item.slug !== article.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    mainEntityOfPage: absoluteUrl(`/insights/${article.slug}`),
    author: { "@type": "Organization", name: "Kno8" },
    publisher: { "@type": "Organization", name: "Kno8" },
  };

  return (
    <article className="pb-24 pt-32 sm:pb-32 sm:pt-40">
      <Container>
        <Link
          href="/insights"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          All insights
        </Link>

        <header className="mt-8 max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {article.category}
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            {article.readingMinutes} min read
          </p>
          <h1 className="display mt-6 text-[clamp(2.5rem,6vw,4.75rem)]">{article.title}</h1>
          <p className="mt-8 text-xl leading-relaxed text-muted sm:text-2xl">{article.excerpt}</p>
        </header>

        <div className="mt-14 max-w-2xl border-t border-line pt-12">
          {article.body.map((section, index) => (
            <section key={section.heading ?? index} className="mt-12 first:mt-0">
              {section.heading && (
                <h2 className="font-display text-3xl font-semibold tracking-tight">
                  {section.heading}
                </h2>
              )}
              <div className="mt-5 space-y-5 text-lg leading-[1.75] text-fg/85">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {more.length > 0 && (
          <aside aria-labelledby="more-title" className="mt-24 border-t border-line pt-12">
            <h2 id="more-title" className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              Keep reading
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {more.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/insights/${item.slug}`}
                    className="block h-full rounded-3xl border border-line bg-surface shadow-card p-7 transition-colors hover:border-fg/25"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                      {item.category}
                    </span>
                    <span className="mt-3 block font-display text-2xl font-semibold leading-tight tracking-tight">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </article>
  );
}
