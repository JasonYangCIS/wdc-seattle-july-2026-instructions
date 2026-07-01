"use client";

import { useState } from "react";

type PromptBlock = {
  label?: string;
  text: string;
};

type StepContent = {
  navTitle: string;
  heading: string;
  eyebrow?: string;
  paragraphs?: string[];
  goal?: { lead: string; rest: string };
  subheading?: string;
  bullets?: { title: string; example?: string }[];
  simpleBullets?: string[];
  numbered?: string[];
  prompts?: PromptBlock[];
  note?: { lead: string; rest: string };
};

const CLOUDSCAPE_STEPS: StepContent[] = [
  {
    navTitle: "Welcome & Overview",
    heading: "Overview",
    eyebrow: "AMAZON WDC LONDON · BUILDER.IO WORKSHOP · CLOUDSCAPE DESIGN SYSTEM EXERCISE",
    paragraphs: [
      "We are going to build some custom dashboards using the Cloudscape design system and the Builder's Fusion product.",
    ],
    goal: {
      lead: "Your goal",
      rest: ": In the next hour, add a new dashboard to Cloudscape and make it your own. You don't need to know how to code to do this—and can do so by prompting with natural language. You can find the full list of suggested prompts and required resources for the workshop exercise beginning after clicking 'Next ->'",
    },
    subheading: "Builder 101",
    simpleBullets: [
      "You may see your app briefly appear, disappear, and then reappear. This is normal.",
      "Check the left sidebar if you're unsure. If there's active coding or \"thinking\" in progress, the task isn't finished.",
      "If you run into an issue, click \"Attempt to Fix\" (if available). Otherwise, raise your hand for help.",
    ],
  },
  {
    navTitle: "Setup Instructions",
    heading: "Setup",
    numbered: [
      "Find the \"Cloudscape\" project in the Projects section and click \"+ New Branch\" to create a new branch for your workshop testing.",
      "Rename the branch to \"{your-name}-WDC\" by clicking on the branch name in the top-left of the screen.",
      "Open the Cloudscape dashboard file in Figma by clicking the \"Open in Figma\" button. Make sure you open it in a Figma Organization where you can install plugins.",
      "Install the Builder.io Figma plugin on the design file you just opened. Open the plugin and select the \"Dashboard\" layer in Figma.",
      "Click the \"Smart Export\" button. Once the plugin is done exporting, paste into the Fusion prompt box. Don't submit your prompt yet!—proceed to Step 03 to continue.",
    ],
  },
  {
    navTitle: "Create Code Commits Dashboard",
    heading: "Create Code Commits Dashboard",
    paragraphs: ["Use the Cloudscape Figma design file and a natural language prompt."],
    prompts: [{ text: "Create a Code Commits dashboard based on this design." }],
  },
  {
    navTitle: "Add Real Data",
    heading: "Add Real Data",
    paragraphs: ["Use an API to add real data to the Code Commits dashboard."],
    prompts: [
      {
        text: "Populate the table and graphs using the internal Commits API. I want to be able to filter by branch and author, and the charts should show lines of code added and removed and the number of commits per day.",
      },
    ],
  },
  {
    navTitle: "Add Theming",
    heading: "Add Theming",
    paragraphs: ["Add theming functionality to the Code Commits dashboard."],
    prompts: [{ text: "Add a dark mode toggle to this page." }],
  },
  {
    navTitle: "Use Design Mode",
    heading: "Use Design Mode",
    paragraphs: [
      "Navigate from \"Interact\" → \"Design\" and select the \"Style\" tab. Select an element in the visual editor to access Figma-like editing controls.",
      "You can add a prompt from the \"Generate\" tab, or click the \"Apply Visual Changes\" button to have Fusion implement updates directly.",
    ],
    prompts: [{ text: "Apply visual changes." }],
  },
  {
    navTitle: "Free Experimentation",
    heading: "Experiment!",
    paragraphs: [
      "Experiment using prompts, screenshots, and more. You're low-key coding now—keep flexing your vibe-coding skills with any time you have left. Share what you've built with your table.",
    ],
    subheading: "Other recommendations",
    bullets: [
      { title: "Change the theme of the entire application", example: "e.g. \"Match the visual style of Manchester United\"" },
      { title: "Ask questions to Fusion", example: "e.g. \"Am I using all Cloudscape design tokens and components?\"" },
      { title: "Ask Fusion to give you recommendations", example: "e.g. \"How can I make this dashboard adhere to EAA guidelines? Give me recommendations.\"" },
      { title: "Add gamification to the application", example: "e.g. \"Gamify the dashboard to make progress feel more fun.\"" },
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
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
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
        <div className="sticky top-0 z-40 backdrop-blur bg-white/70">
          <div className="w-full bg-slate-200/60" aria-label={`Step ${stepIndex + 1} of ${total}`}>
            <div className="mx-auto max-w-7xl px-4 py-2 flex items-center gap-4">
              <div className="min-w-24 text-xs font-medium text-slate-600">
                Step {stepIndex + 1} of {total}
              </div>
              <div className="relative h-2 w-full rounded-full bg-slate-300 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[hsl(var(--primary))] transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          <div className="flex flex-col md:flex-row gap-6">
            <aside className="md:w-1/4 w-full md:sticky md:top-24 self-start">
              <nav aria-label="Workshop steps" className="space-y-1">
                {steps.map((s, i) => {
                  const active = i === stepIndex;
                  return (
                    <button
                      key={s.navTitle}
                      type="button"
                      onClick={() => setStepIndex(i)}
                      className={`w-full text-left px-3 rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] h-11 leading-5 flex items-center ${
                        active
                          ? "bg-[hsl(var(--primary))]/10 border-[hsl(var(--primary))]/30 text-[hsl(var(--primary))] font-semibold"
                          : "bg-white hover:bg-[hsl(var(--primary))]/10 hover:border-[hsl(var(--primary))]/40 border-slate-200 text-slate-700 hover:text-slate-900"
                      }`}
                    >
                      <span className="text-sm font-medium">{String(i + 1).padStart(2, "0")}</span>
                      <span className="ml-3 text-sm md:text-[15px]">{s.navTitle}</span>
                    </button>
                  );
                })}
              </nav>
            </aside>

            <section className="md:w-3/4 w-full">
              <article className="rounded-lg border border-slate-200 bg-white text-slate-900 p-5 md:p-6 shadow-sm">
                <header className="mb-4 md:mb-6 font-sans">
                  <div className="text-xs font-medium tracking-wider text-slate-500 uppercase">
                    Cloudscape
                  </div>
                </header>

                <div className="prose prose-slate max-w-none">
                  <h2>{step.heading}</h2>

                  {step.eyebrow && <p>{step.eyebrow}</p>}

                  {step.paragraphs?.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}

                  {step.goal && (
                    <p>
                      <strong>{step.goal.lead}</strong>
                      {step.goal.rest}
                    </p>
                  )}

                  {step.note && (
                    <p>
                      <strong>{step.note.lead}</strong>
                      {step.note.rest}
                    </p>
                  )}

                  {step.prompts?.map((p, i) => (
                    <div key={i} className="not-prose my-4 rounded-md border border-slate-200 bg-slate-50 p-4">
                      <div className="text-xs font-medium tracking-wider text-slate-500 uppercase mb-1">
                        Prompt
                      </div>
                      <code className="text-sm text-slate-800">{p.text}</code>
                    </div>
                  ))}

                  {step.numbered && (
                    <ol>
                      {step.numbered.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ol>
                  )}

                  {step.subheading && <h3>{step.subheading}</h3>}

                  {step.simpleBullets && (
                    <ul>
                      {step.simpleBullets.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {step.bullets && (
                    <ul>
                      {step.bullets.map((b, i) => (
                        <li key={i}>
                          {b.title}
                          {b.example && (
                            <div className="not-prose text-sm text-slate-500 italic mt-1">
                              {b.example}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <footer className="mt-8 flex items-center justify-between gap-3 font-sans">
                  <button
                    type="button"
                    disabled={stepIndex === 0}
                    onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                    className="inline-flex items-center h-10 px-4 py-2 rounded-md bg-slate-100 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeftIcon />
                    Previous
                  </button>
                  <button
                    type="button"
                    disabled={stepIndex === total - 1}
                    onClick={() => setStepIndex((i) => Math.min(total - 1, i + 1))}
                    className="inline-flex items-center h-10 px-4 py-2 pr-6 md:pr-7 rounded-md border border-transparent bg-[hsl(var(--primary))] text-white hover:shadow-md hover:bg-white hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary))] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
