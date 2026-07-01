"use client";

import { useState } from "react";
import AppLayout from "@cloudscape-design/components/app-layout";
import ContentLayout from "@cloudscape-design/components/content-layout";
import SideNavigation, {
  SideNavigationProps,
} from "@cloudscape-design/components/side-navigation";
import Container from "@cloudscape-design/components/container";
import Grid from "@cloudscape-design/components/grid";
import Header from "@cloudscape-design/components/header";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import TextContent from "@cloudscape-design/components/text-content";
import Button from "@cloudscape-design/components/button";
import ProgressBar from "@cloudscape-design/components/progress-bar";

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
      { type: "eyebrow", text: "AMAZON WDC SEATTLE · BUILDER.IO WORKSHOP · CLOUDSCAPE DESIGN SYSTEM EXERCISE" },
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

function Figure({ image }: { image: ImageRef }) {
  return (
    <Box margin={{ top: "s" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        style={{ width: "100%", borderRadius: "8px", border: "1px solid #e9ebed" }}
      />
      {image.caption && (
        <Box variant="small" color="text-body-secondary" textAlign="center" margin={{ top: "xs" }}>
          {image.caption}
        </Box>
      )}
    </Box>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "eyebrow":
      return <Box variant="awsui-key-label">{block.text}</Box>;
    case "paragraph":
      return (
        <Box variant="p" color="text-body-secondary">
          {block.strongLead && <strong>{block.strongLead}</strong>}
          {block.text}
        </Box>
      );
    case "heading":
      return <Box variant="h3">{block.text}</Box>;
    case "bullets":
      return (
        <TextContent>
          <ul style={{ listStyleType: "disc" }}>
            {block.items.map((item, i) => (
              <li key={i}>
                {item.text}
                {item.example && (
                  <Box variant="small" color="text-body-secondary" margin={{ top: "xxxs" }}>
                    {item.example}
                  </Box>
                )}
              </li>
            ))}
          </ul>
        </TextContent>
      );
    case "numbered":
      return (
        <TextContent>
          <ol style={{ listStyleType: "decimal" }}>
            {block.items.map((item, i) =>
              item.image ? (
                <li key={i}>
                  <Grid
                    gridDefinition={[
                      { colspan: { default: 12, m: 6 } },
                      { colspan: { default: 12, m: 6 } },
                    ]}
                  >
                    <Box variant="p" color="text-body-secondary">
                      {item.text}
                    </Box>
                    <Figure image={item.image} />
                  </Grid>
                </li>
              ) : (
                <li key={i}>{item.text}</li>
              )
            )}
          </ol>
        </TextContent>
      );
    case "prompt":
      return (
        <SpaceBetween size="s">
          <Box variant="awsui-key-label" color="text-status-info">
            Prompt:
          </Box>
          <Container disableContentPaddings={false}>
            <Box variant="pre" margin="n">
              {block.text}
            </Box>
          </Container>
          {block.image && <Figure image={block.image} />}
        </SpaceBetween>
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

  const navItems: SideNavigationProps.Item[] = steps.map((s, i) => ({
    type: "link",
    text: `${String(i + 1).padStart(2, "0")}  ${s.navTitle}`,
    href: `#step-${i}`,
  }));

  return (
    <div className="workshop-scale min-h-screen flex flex-col bg-slate-50">
      <div className="w-full bg-[#0a0a0a] text-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F76e39d6cb5b24501bed5149204e569f5%2Fb429f8c62fb847318f4ac4285981b7e2?format=webp&width=800"
              alt="Builder.io logo"
              className="h-8 w-auto"
            />
            <span className="mt-0.5 flex items-center gap-1.5 text-sm md:text-base font-semibold tracking-wide">
              ×
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://builder.aws.com/assets/logo-dark-mode-BWHgg2gz.svg"
                alt="AWS"
                className="h-4 w-auto md:h-5"
              />
            </span>
          </div>
          <span className="hidden sm:block text-[19px] leading-[19.5px] font-semibold text-white/90">
            <p>Visual Development Platform</p>
          </span>
        </div>
      </div>

      <AppLayout
        navigationWidth={300}
        toolsHide
        stickyNotifications
        notifications={
          <ProgressBar
            value={progressPct}
            label={`Step ${stepIndex + 1} of ${total}`}
          />
        }
        navigation={
          <SideNavigation
            header={{ text: "Workshop steps", href: "#step-0" }}
            activeHref={`#step-${stepIndex}`}
            items={navItems}
            onFollow={(event) => {
              event.preventDefault();
              const index = Number(event.detail.href.replace("#step-", ""));
              setStepIndex(index);
            }}
          />
        }
        content={
          <ContentLayout>
            <Container
              header={<Header variant="h2">{step.heading}</Header>}
              footer={
                <div className="flex items-center justify-between">
                  <Button
                    iconName="angle-left"
                    disabled={stepIndex === 0}
                    onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                  >
                    Previous
                  </Button>
                  <Button
                    iconName="angle-right"
                    iconAlign="right"
                    variant="primary"
                    disabled={stepIndex === total - 1}
                    onClick={() => setStepIndex((i) => Math.min(total - 1, i + 1))}
                  >
                    Next
                  </Button>
                </div>
              }
            >
              <SpaceBetween size="m">
                {step.blocks.map((block, i) => (
                  <BlockRenderer key={i} block={block} />
                ))}
              </SpaceBetween>
            </Container>
          </ContentLayout>
        }
      />
    </div>
  );
}
