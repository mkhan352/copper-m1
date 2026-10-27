import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/copper/site-footer";
import { SiteHeader } from "@/components/copper/site-header";
import { Button } from "@/components/ui/button";
import {
  formatMemory,
  formatNotesHours,
  formatUsd,
  getPlans,
  getPrivacySummary,
  getProducts,
  type Product,
} from "@/lib/copper/catalog";

const TAGLINE = "From raw ideas to refined answers.";

// Image sizes in pixels, so the browser reserves the right space.
const CUTOUT = { width: 1254, height: 1254 };
const LIFESTYLE = { width: 1672, height: 941 };

const CUTOUT_ALT: Record<Product["id"], string> = {
  "copper-home": "Copper Home smart speaker in polished copper",
  "copper-notes": "Copper Notes clip-on recorder in brushed copper",
};

const LIFESTYLE_TEXT: Record<string, { alt: string; caption: string }> = {
  "copper-home-desert-light.png": {
    alt: "Copper Home speaker in a living room lit by warm desert light",
    caption:
      "Copper Home keeps the house running, from morning light to monsoon storms.",
  },
  "copper-notes-stone-desk.png": {
    alt: "Copper Notes recorder on a stone desk",
    caption:
      "Copper Notes turns every meeting into clear decisions and action items.",
  },
  "copper-notes-golden-hour.png": {
    alt: "Copper Notes recorder in golden-hour sunlight",
    caption: "Take it anywhere: lectures, walks and golden-hour brainstorms.",
  },
};

function lifestyleText(src: string, productName: string) {
  const file = src.split("/").pop() ?? src;
  return (
    LIFESTYLE_TEXT[file] ?? {
      alt: `${productName} in an Arizona setting`,
      caption: `${productName}, at home in Arizona.`,
    }
  );
}

export default function Home() {
  const products = getProducts();
  const plans = getPlans();
  const privacy = getPrivacySummary();
  const free = plans.find((plan) => plan.id === "free");
  const plus = plans.find((plan) => plan.id === "copper-plus");

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section
          id="top"
          data-testid="hero"
          className="bg-secondary text-secondary-foreground scroll-mt-16"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
            <div className="flex flex-col items-start gap-5">
              <h1 className="font-display text-4xl leading-tight font-bold sm:text-5xl">
                Meet the AI helpers made in Arizona
              </h1>
              <p className="text-xl">{TAGLINE}</p>
              <Button asChild size="lg" className="h-11 px-6 text-base">
                <Link href="#products">See products</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 items-end gap-2 sm:gap-4">
              {products.map((product) => (
                <Image
                  key={product.id}
                  src={product.cutout}
                  alt={CUTOUT_ALT[product.id]}
                  {...CUTOUT}
                  className="h-auto w-full"
                />
              ))}
            </div>
          </div>
        </section>

        <section
          id="products"
          data-testid="products"
          className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16"
        >
          <h2 className="font-display mb-8 text-3xl font-bold">Our products</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <article
                key={product.id}
                data-testid="product-card"
                data-product={product.id}
                className="bg-card text-card-foreground flex flex-col gap-4 rounded-2xl border p-6"
              >
                <Image
                  src={product.cutout}
                  alt={CUTOUT_ALT[product.id]}
                  {...CUTOUT}
                  className="mx-auto h-auto w-3/4 max-w-xs"
                />
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl font-bold">
                    {product.name}
                  </h3>
                  <p className="text-primary text-2xl font-bold">
                    {formatUsd(product.priceUsd)}
                  </p>
                </div>
                <p className="text-muted-foreground">{product.type}</p>
                <ul className="flex flex-col gap-2">
                  {product.features.map((feature) => (
                    <li key={feature.name}>
                      <span className="font-semibold">{feature.name}.</span>{" "}
                      <span className="text-muted-foreground">
                        {feature.description}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground mt-auto text-sm">
                  Colors: {product.colors.join(", ")}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="showcase"
          data-testid="showcase"
          className="bg-muted scroll-mt-16"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16">
            <h2 className="font-display text-3xl font-bold">
              In the real world
            </h2>
            {products
              .flatMap((product) =>
                product.lifestyle.map((src) => ({ src, name: product.name })),
              )
              .map(({ src, name }, index) => {
                const { alt, caption } = lifestyleText(src, name);
                return (
                  <figure
                    key={src}
                    className="grid items-center gap-6 md:grid-cols-2"
                  >
                    <Image
                      src={src}
                      alt={alt}
                      {...LIFESTYLE}
                      className={`h-auto w-full rounded-2xl ${index % 2 === 1 ? "md:order-2" : ""}`}
                    />
                    <figcaption className="font-display text-xl font-semibold">
                      {caption}
                    </figcaption>
                  </figure>
                );
              })}
          </div>
        </section>

        <section
          id="plus"
          data-testid="plus-pricing"
          className="mx-auto max-w-6xl scroll-mt-16 px-4 py-16"
        >
          <h2 className="font-display mb-2 text-3xl font-bold">Copper Plus</h2>
          <p className="text-muted-foreground mb-8">
            Longer memory, more Notes recording and Refined answers.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {[free, plus].map((plan) =>
              plan ? (
                <div
                  key={plan.id}
                  className={`flex flex-col gap-4 rounded-2xl border p-6 ${
                    plan.id === "copper-plus"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-card-foreground"
                  }`}
                >
                  <h3 className="font-display text-2xl font-bold">
                    {plan.name}
                  </h3>
                  <p className="text-3xl font-bold">
                    {formatUsd(plan.monthlyUsd)}
                    <span className="text-base font-normal">/month</span>
                  </p>
                  <p>or {formatUsd(plan.annualUsd)}/year</p>
                  <ul className="flex flex-col gap-2">
                    <li>Memory kept: {formatMemory(plan.memoryDays)}</li>
                    <li>
                      Copper Notes recording:{" "}
                      {formatNotesHours(plan.notesHoursPerMonth)}
                    </li>
                    <li>
                      Refined answers:{" "}
                      {plan.refinedAnswers ? "Included" : "Not included"}
                    </li>
                  </ul>
                </div>
              ) : null,
            )}
          </div>
        </section>

        <section
          id="privacy"
          data-testid="privacy-summary"
          className="bg-accent text-accent-foreground scroll-mt-16"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-[1fr_auto]">
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-3xl font-bold">
                Your privacy, in plain words
              </h2>
              <p>
                How Copper handles your recordings under our {privacy.policy}{" "}
                policy:
              </p>
              <ul className="flex list-disc flex-col gap-3 pl-5">
                {privacy.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <Image
              src="/assets/brand/copper-mascot.png"
              alt="Copper, the friendly robot mascot of Copper State Labs"
              width={1254}
              height={1254}
              className="mx-auto h-auto w-40 md:w-56"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
