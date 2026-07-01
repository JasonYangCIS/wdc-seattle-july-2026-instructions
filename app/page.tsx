"use client";

import { useState } from "react";

type ImageRef = {
  src: string;
  alt: string;
  caption?: string;
};

type Block =
  | { type: "eyebrow"; text: string }
  | { type: "paragraph"; text: string; strongLead?: string }
  | { type: "heading"; text: string }
  | { type: "bullets"; items: { text: string; example?: string }[] }
  | { type: "numbered"; items: { text: string; image?: ImageRef }[] }
  | { type: "prompt"; text: string; image?: ImageRef }
  | { type: "image"; image: ImageRef };

type StepContent = {
  navTitle: string;
  heading: string;
  blocks: Block[];
};

const CLOUDSCAPE_STEPS: StepContent[] = [
  {
    navTitle: "Welcome & Overview",
    heading: "Overview",
    blocks: [
      { type: "eyebrow", text: "AMAZON WDC LONDON · BUILDER.IO WORKSHOP · CLOUDSCAPE DESIGN SYSTEM EXERCISE" },
      {
        type: "paragraph",
        text: "We are going to build some custom dashboards using the Cloudscape design system and the Builder's Fusion product.",
      },
      {
        type: "paragraph",
        strongLead: "Your goal",
        text: ": In the next hour, add a new dashboard to Cloudscape and make it your own. You don't need to know how to code to do this—and can do so by prompting with natural language. You can find the full list of suggested prompts and required resources for the workshop exercise beginning after clicking 'Next ->'",
      },
      { type: "heading", text: "Builder 101" },
      {
        type: "bullets",
        items: [
          { text: "You may see your app briefly appear, disappear, and then reappear. This is normal." },
          { text: "Check the left sidebar if you're unsure. If there's active coding or \"thinking\" in progress, the task isn't finished." },
          { text: "If you run into an issue, click \"Attempt to Fix\" (if available). Otherwise, raise your hand for help." },
        ],
      },
    ],
  },
  {
    navTitle: "Setup Instructions",
    heading: "Setup",
    blocks: [
      {
        type: "numbered",
        items: [
          {
            text: "Find the \"Cloudscape\" project in the Projects section and click \"+ New Branch\" to create a new branch for your workshop testing.",
            image: {
              src: "https://cdn.builder.io/api/v1/image/assets%2F76e39d6cb5b24501bed5149204e569f5%2F11340c23f80b475abbc4548435a1a8e6?format=webp&width=800",
              alt: "Cloudscape project — New Branch",
              caption: "Cloudscape project — New Branch",
            },
          },
          {
            text: "Rename the branch to \"{your-name}-WDC\" by clicking on the branch name in the top-left of the screen.",
            image: {
              src: "https://cdn.builder.io/api/v1/image/assets%2F76e39d6cb5b24501bed5149204e569f5%2Fb9bc0cbd1eb140ee81c60277769c7cee?format=webp&width=800",
              alt: "Rename branch UI",
              caption: "Rename branch",
            },
          },
          {
            text: "Open the Cloudscape dashboard file in Figma by clicking the \"Open in Figma\" button. Make sure you open it in a Figma Organization where you can install plugins.",
            image: {
              src: "https://cdn.builder.io/api/v1/image/assets%2F76e39d6cb5b24501bed5149204e569f5%2Feda947fe305242e58cbda6b8b9105c92?format=webp&width=800",
              alt: "Open in Figma",
              caption: "Open in Figma",
            },
          },
          {
            text: "Install the Builder.io Figma plugin on the design file you just opened. Open the plugin and select the \"Dashboard\" layer in Figma.",
            image: {
              src: "https://cdn.builder.io/api/v1/image/assets%2F76e39d6cb5b24501bed5149204e569f5%2F53318c29b86941cb96827ad1126687f0?format=webp&width=800",
              alt: "Builder.io Figma plugin",
              caption: "Builder.io Figma plugin",
            },
          },
          {
            text: "Click the \"Smart Export\" button. Once the plugin is done exporting, paste into the Fusion prompt box. Don't submit your prompt yet!—proceed to Step 03 to continue.",
            image: {
              src: "https://cdn.builder.io/api/v1/image/assets%2F76e39d6cb5b24501bed5149204e569f5%2F1b389ac948dc4164afec8fbf2353423f?format=webp&width=800",
              alt: "Fusion prompt with design attachment",
              caption: "Fusion prompt with design attachment",
            },
          },
        ],
      },
    ],
  },
  {
    navTitle: "Create Code Commits Dashboard",
    heading: "Create Code Commits Dashboard",
    blocks: [
      { type: "paragraph", text: "Use the Cloudscape Figma design file and a natural language prompt." },
      {
        type: "prompt",
        text: "Create a Code Commits dashboard based on this design.",
        image: {
          src: "https://cdn.builder.io/api/v1/image/assets%2F76e39d6cb5b24501bed5149204e569f5%2F19433b275c23480990468fb0c3d851f9?format=webp&width=800",
          alt: "Figma design prompt",
          caption: "Figma design prompt",
        },
      },
    ],
  },
  {
    navTitle: "Add Real Data",
    heading: "Add Real Data",
    blocks: [
      { type: "paragraph", text: "Use an API to add real data to the Code Commits dashboard." },
      {
        type: "prompt",
        text: "Populate the table and graphs using the internal Commits API. I want to be able to filter by branch and author, and the charts should show lines of code added and removed and the number of commits per day.",
        image: {
          src: "https://cdn.builder.io/api/v1/image/assets%2F76e39d6cb5b24501bed5149204e569f5%2Fcb283c52ccd042e29bd6c44525e07c1f?format=webp&width=800",
          alt: "Real data prompt",
          caption: "Real data prompt",
        },
      },
    ],
  },
  {
    navTitle: "Add Theming",
    heading: "Add Theming",
    blocks: [
      { type: "paragraph", text: "Add theming functionality to the Code Commits dashboard." },
      {
        type: "prompt",
        text: "Add a dark mode toggle to this page.",
        image: {
          src: "https://cdn.builder.io/api/v1/image/assets%2F76e39d6cb5b24501bed5149204e569f5%2F232a0909a8504928b9f03cd3b406370c?format=webp&width=800",
          alt: "Dark mode prompt",
          caption: "Dark mode prompt",
        },
      },
    ],
  },
  {
    navTitle: "Use Design Mode",
    heading: "Use Design Mode",
    blocks: [
      {
        type: "paragraph",
        text: "Navigate from \"Interact\" → \"Design\" and select the \"Style\" tab. Select an element in the visual editor to access Figma-like editing controls.",
      },
      {
        type: "image",
        image: {
          src: "https://cdn.builder.io/api/v1/image/assets%2F76e39d6cb5b24501bed5149204e569f5%2Fc6cd6b3b0cd5489f92206051e776f9dc?format=webp&width=800",
          alt: "Design Mode — Style tab",
          caption: "Design Mode — Style tab",
        },
      },
      {
        type: "prompt",
        text: "Apply visual changes.",
        image: {
          src: "https://cdn.builder.io/api/v1/image/assets%2F76e39d6cb5b24501bed5149204e569f5%2Feebc64d7c2e74a03b8065d86f2f43271?format=webp&width=800",
          alt: "Apply Visual Changes",
          caption: "Apply Visual Changes",
        },
      },
      {
        type: "paragraph",
        text: "You can add a prompt from the \"Generate\" tab, or click the \"Apply Visual Changes\" button to have Fusion implement updates directly.",
      },
    ],
  },
  {
    navTitle: "Free Experimentation",
    heading: "Experiment!",
    blocks: [
      {
        type: "paragraph",
        text: "Experiment using prompts, screenshots, and more. You're low-key coding now—keep flexing your vibe-coding skills with any time you have left. Share what you've built with your table.",
      },
      { type: "heading", text: "Other recommendations" },
      {
        type: "bullets",
        items: [
          { text: "Change the theme of the entire application", example: "e.g. \"Match the visual style of Manchester United\"" },
          { text: "Ask questions to Fusion", example: "e.g. \"Am I using all Cloudscape design tokens and components?\"" },
          { text: "Ask Fusion to give you recommendations", example: "e.g. \"How can I make this dashboard adhere to EAA guidelines? Give me recommendations.\"" },
          { text: "Add gamification to the application", example: "e.g. \"Gamify the dashboard to make progress feel more fun.\"" },
        ],
      },
      { type: "heading", text: "Explore the Code" },
      {
        type: "paragraph",
        text: "Switch to the Code tab to see what Fusion generated, browse files, and learn how Cloudscape tokens are applied.",
      },
    ],
  },
];

function ArrowLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mr-2"
      aria-hidden="true"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ml-2"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function Figure({ image }: { image: ImageRef }) {
  return (
    <figure className="not-prose mt-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        className="w-full rounded-lg border border-slate-200 shadow-sm"
      />
      {image.caption && (
        <figcaption className="mt-2 text-center text-sm italic text-slate-400">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "eyebrow":
      return <p className="text-sm font-medium tracking-wide text-slate-500">{block.text}</p>;
    case "paragraph":
      return (
        <p className="leading-relaxed text-slate-600">
          {block.strongLead && <strong className="text-slate-900">{block.strongLead}</strong>}
          {block.text}
        </p>
      );
    case "heading":
      return <h3 className="mt-2 text-xl font-semibold text-slate-900">{block.text}</h3>;
    case "bullets":
      return (
        <ul className="space-y-3 pl-5 text-slate-600 marker:text-slate-300">
          {block.items.map((item, i) => (
            <li key={i} className="list-disc leading-relaxed">
              {item.text}
              {item.example && (
                <div className="mt-1 text-sm italic text-slate-400">{item.example}</div>
              )}
            </li>
          ))}
        </ul>
      );
    case "numbered":
      return (
        <ol className="space-y-8">
          {block.items.map((item, i) => (
            <li key={i} className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start">
              <div className="flex gap-2">
                <span className="font-semibold text-slate-900">{i + 1}.</span>
                <p className="leading-relaxed text-slate-600">{item.text}</p>
              </div>
              {item.image && <Figure image={item.image} />}
            </li>
          ))}
        </ol>
      );
    case "prompt":
      return (
        <div>
          <p className="mb-1 font-semibold text-blue-600">Prompt:</p>
          <pre className="whitespace-pre-wrap rounded-md border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm text-slate-700">
            `{block.text}`
          </pre>
          {block.image && <Figure image={block.image} />}
        </div>
      );
    case "image":
      return <Figure image={block.image} />;
  }
}

export default function Home() {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = CLOUDSCAPE_STEPS;
  const total = steps.length;
  const step = steps[stepIndex];
  const progressPct = ((stepIndex + 1) / total) * 100;
  const accentVar = "210 90% 45%";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="w-full bg-gradient-to-r from-[#3f1f7a] via-[#2b1c55] to-[#651a00] text-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F76e39d6cb5b24501bed5149204e569f5%2Fb429f8c62fb847318f4ac4285981b7e2?format=webp&width=800"
              alt="Builder.io logo"
              className="h-8 w-auto"
            />
            <span className="mt-0.5 text-sm md:text-base font-semibold tracking-wide">
              × AWS Workshops
            </span>
          </div>
          <span className="hidden sm:block text-[19px] leading-[19.5px] font-semibold text-white/90">
            <p>Visual Development Platform</p>
          </span>
        </div>
      </div>

      <div style={{ "--primary": accentVar, "--ring": accentVar } as React.CSSProperties}>
        <div className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur">
          <div className="w-full" aria-label={`Step ${stepIndex + 1} of ${total}`}>
            <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2.5 md:px-6">
              <div className="min-w-24 text-xs font-medium text-slate-500">
                Step {stepIndex + 1} of {total}
              </div>
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-[hsl(var(--primary))] transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <aside className="w-full self-start md:sticky md:top-20 md:w-1/4">
              <nav aria-label="Workshop steps" className="space-y-1">
                {steps.map((s, i) => {
                  const active = i === stepIndex;
                  return (
                    <button
                      key={s.navTitle}
                      type="button"
                      onClick={() => setStepIndex(i)}
                      className={`flex h-12 w-full items-center rounded-md border-l-4 px-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] ${
                        active
                          ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] font-semibold"
                          : "border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <span className="text-sm font-medium tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="ml-3 text-sm md:text-[15px]">{s.navTitle}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            <section className="w-full md:w-3/4">
              <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <header className="mb-5 md:mb-6">
                  <div className="text-xs font-medium uppercase tracking-widest text-slate-400">
                    Cloudscape
                  </div>
                </header>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">{step.heading}</h2>
                  {step.blocks.map((block, i) => (
                    <BlockRenderer key={i} block={block} />
                  ))}
                </div>

                <footer className="mt-10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    disabled={stepIndex === 0}
                    onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                    className="inline-flex h-10 items-center rounded-md bg-slate-100 px-4 py-2 font-medium text-slate-500 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ArrowLeftIcon />
                    Previous
                  </button>
                  <button
                    type="button"
                    disabled={stepIndex === total - 1}
                    onClick={() => setStepIndex((i) => Math.min(total - 1, i + 1))}
                    className="inline-flex h-10 items-center rounded-md border border-transparent bg-[hsl(var(--primary))] px-5 py-2 font-medium text-white shadow-sm transition-colors hover:border-[hsl(var(--primary))] hover:bg-white hover:text-[hsl(var(--primary))] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                    <ArrowRightIcon />
                  </button>
                </footer>
              </article>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
