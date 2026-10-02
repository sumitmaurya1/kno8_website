import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { articles } from "@/data/insights";
import { pageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Insights",
  description:
    "Articles and company news from Kno8: how we build companies, what we are learning and what our companies are doing.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={["Notes From", "the Build."]}
        highlight="the Build."
        description="Articles and company news from Kno8: how we build, what we are learning and what our companies are doing."
      />
      <section id="articles" aria-label="Articles" className="py-16 sm:py-24">
        <Container>
          {articles.length === 0 ? (
            <p className="text-lg text-muted">
              Nothing published yet. New articles will appear here.
            </p>
          ) : (
            <ul>
              {articles.map((article) => (
                <li key={article.slug} className="border-b border-line first:border-t">
                  <article className="group relative grid gap-4 py-10 lg:grid-cols-12 lg:gap-10">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted lg:col-span-3 lg:pt-3">
                      {article.category}
                      <span className="mx-2" aria-hidden="true">
                        /
                      </span>
                      <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                    </p>
                    <div className="lg:col-span-8">
                      <h2 className="display text-[clamp(1.75rem,3.2vw,2.75rem)] !leading-[1.05] transition-colors group-hover:text-electric">
                        <Link href={`/insights/${article.slug}`} className="after:absolute after:inset-0">
                          {article.title}
                        </Link>
                      </h2>
                      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
                        {article.excerpt}
                      </p>
                    </div>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="hidden h-7 w-7 justify-self-end text-fg/40 transition-[transform,color] duration-300 ease-out-soft group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-electric lg:col-span-1 lg:block"
                    />
                  </article>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
