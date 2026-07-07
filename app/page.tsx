"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
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
import Icon from "@cloudscape-design/components/icon";
import CopyToClipboard from "@cloudscape-design/components/copy-to-clipboard";
import Textarea from "@cloudscape-design/components/textarea";
import Link from "@cloudscape-design/components/link";
import Alert from "@cloudscape-design/components/alert";
import Modal from "@cloudscape-design/components/modal";

type ImageRef = {
  src: string;
  alt: string;
  caption?: string;
};

type VideoRef = {
  src: string;
  caption?: string;
};

function renderTextWithInlineLink(
  text: string,
  link?: { text: string; href: string },
  boldText?: string
) {
  let content: string | ReactNode = text;
  if (boldText) {
    const index = text.indexOf(boldText);
    if (index !== -1) {
      content = (
        <>
          {text.slice(0, index)}
          <strong>{boldText}</strong>
          {text.slice(index + boldText.length)}
        </>
      );
    }
  }
  if (!link) return content;
  const index = text.indexOf(link.text);
  if (index === -1) return content;
  return (
    <>
      {text.slice(0, index)}
      <Link href={link.href} external externalIconAriaLabel="Opens in a new tab">
        {link.text}
      </Link>
      {text.slice(index + link.text.length)}
    </>
  );
}

type Block =
  | { type: "eyebrow"; text: string }
  | { type: "paragraph"; text: string; strongLead?: string; link?: { text: string; href: string } }
  | { type: "heading"; text: string }
  | { type: "bullets"; items: { text: string; example?: string; link?: { text: string; href: string } }[] }
  | {
      type: "numbered";
      items: {
        title: string;
        text: string;
        boldText?: string;
        prompt?: string;
        command?: string;
        image?: ImageRef;
        video?: VideoRef;
        link?: { text: string; href: string };
      }[];
    }
  | { type: "prompt"; text: string; image?: ImageRef }
  | { type: "image"; image: ImageRef }
  | { type: "alert"; alertType: "success" | "error" | "warning" | "info"; header?: string; text: string };

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
        text: "We are going to build a custom dashboard using the Cloudscape design system and the Builder's Fusion product, while exploring different workflows that our Fusion product enables.",
      },
      {
        type: "paragraph",
        strongLead: "Your goal",
        text: ": Add a new dashboard to Cloudscape and make it your own. You don't need to know how to code to do this, and can do so by prompting with natural language. You can find the full list of suggested prompts and required resources for the workshop exercise beginning after going to the next step.",
      },
      {
        type: "alert",
        alertType: "warning",
        header: "TODO",
        text: "Builder team still needs to figure out a way to link attendees to the workshop space and automatically authenticate both in-person and online Amazon employees.",
      },
      { type: "heading", text: "Pro tips" },
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
            title: "Create Your Branch",
            text: "Find the \"Cloudscape\" project in the Projects section and click \"+ New Branch\" to create a new branch for your workshop testing.",
            image: {
              src: "https://cdn.builder.io/api/v1/image/assets%2Fda9013cf334340238f9e2401de83cc04%2F4f405dd7a45e44fcb812ecc14a3d85e8?format=webp&width=1600",
              alt: "Cloudscape project, New Branch",
              caption: "Cloudscape project, New Branch",
            },
          },
          {
            title: "Rename Your Branch",
            text: "Rename the branch to \"{your-name}-WDC\" by clicking on the branch name in the top-left of the screen.",
            image: {
              src: "https://cdn.builder.io/api/v1/image/assets%2Fda9013cf334340238f9e2401de83cc04%2Fa3cea28d8f1743d6896ff917bdd3c998?format=webp&width=1600",
              alt: "Rename branch UI",
              caption: "Rename branch",
            },
          },
          {
            title: "Open the Design File",
            text: "Open the Cloudscape dashboard file in Figma by clicking the \"Open in Figma\" button. Make sure you open it in a Figma Organization where you can install plugins.",
            link: {
              text: "Open the Cloudscape dashboard file in Figma",
              href: "https://www.figma.com/community/file/1441915505995376925/builder-io-cloudscape-example-design",
            },
            image: {
              src: "https://cdn.builder.io/api/v1/image/assets%2Fda9013cf334340238f9e2401de83cc04%2F5b64fc826a2d43818e1d4c368aa6b63c?format=webp&width=1600",
              alt: "Open in Figma",
              caption: "Open in Figma",
            },
          },
          {
            title: "Install the Figma Plugin",
            text: "Install the Builder.io Figma plugin on the design file you just opened. Open the plugin and select the \"Dashboard\" layer in Figma.",
            link: {
              text: "Install the Builder.io Figma plugin",
              href: "https://www.figma.com/community/plugin/747985167520967365",
            },
            video: {
              src: "https://cdn.builder.io/o/assets%2FYJIGb4i01jvw0SRdL5Bt%2Fdd4aab2a40e54e1ea6fa36f74983e371?alt=media&token=f1a4489f-cf18-4981-bb4f-932fffe1302c&apiKey=YJIGb4i01jvw0SRdL5Bt",
            },
          },
          {
            title: "Export & Paste the Design",
            text: "Click the \"Smart Export\" button. Once the plugin is done exporting, paste into the Fusion prompt box. Don't submit your prompt yet! Proceed to Step 03 to continue.",
            boldText: "Don't submit your prompt yet!",
            image: {
              src: "https://cdn.builder.io/api/v1/image/assets%2Fda9013cf334340238f9e2401de83cc04%2F471b86a0abe1411b969def9442e839c2?format=webp&width=1600",
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
        text: "Create code commits dashboard using this Figma design and the mock data found in repo.",
        image: {
          src: "https://cdn.builder.io/api/v1/image/assets%2Fda9013cf334340238f9e2401de83cc04%2F7ead95da82384033b46e1e61d8c954ab?format=webp&width=1600",
          alt: "Figma design prompt",
          caption: "Figma design prompt",
        },
      },
    ],
  },
  {
    navTitle: "Add Theming with Plan mode",
    heading: "Add Theming with Plan mode",
    blocks: [
      { type: "paragraph", text: "Add theming functionality to the Code Commits dashboard." },
      {
        type: "numbered",
        items: [
          {
            title: "Switch to Plan Mode",
            text: "Click the mode selector next to the prompt box and choose \"Plan\" so Fusion collaborates on an approach before generating any code.",
            image: {
              src: "https://cdn.builder.io/api/v1/image/assets%2Fda9013cf334340238f9e2401de83cc04%2Fb3a4968ac0514794b5f010d405118f19?format=webp&width=1600",
              alt: "Mode selector, Plan",
              caption: "Mode selector, Plan",
            },
          },
          {
            title: "Paste in the Prompt",
            text: "Paste the following prompt into the prompt box, then submit it.",
            prompt: "Add a floating settings icon that on click opens up a small tool tip that allows the user to change their theme, the current UI should be the default \"light\" theme, the users should be able to choose a \"dark\" theme and a \"creative\" theme that freely implements a creative UI as a theme.",
            image: {
              src: "https://cdn.builder.io/api/v1/image/assets%2Fda9013cf334340238f9e2401de83cc04%2F3a14f809979e481d8e255632aed3259a?format=webp&width=1600",
              alt: "Prompt ready to submit in Plan mode",
              caption: "Prompt ready to submit in Plan mode",
            },
          },
          {
            title: "Review the Plan & Submit for Action",
            text: "Read through the plan Fusion proposes, making changes if necessary. Once it looks right, implement the plan so Fusion can generate the code.",
            image: {
              src: "https://cdn.builder.io/api/v1/image/assets%2Fda9013cf334340238f9e2401de83cc04%2F25d836efcb734e8a8d6b2ccb50b60c55?format=webp&width=1600",
              alt: "Reviewing and implementing the plan",
              caption: "Reviewing and implementing the plan",
            },
          },
        ],
      },
    ],
  },
  {
    navTitle: "Incorporate Storybook",
    heading: "Incorporate Storybook",
    blocks: [
      {
        type: "paragraph",
        text: "Set up Storybook so the dashboard's Cloudscape components can be developed and reviewed in isolation.",
      },
      {
        type: "prompt",
        text: "Set up Storybook for this project and add stories for all of the current design system components, with controls for switching between the light, dark, and creative themes so we can see how the new theming affects each component. Add scripts to run Storybook locally and build a static Storybook, and add a link in the dashboard header to open Storybook, plus a link back to the dashboard from Storybook.",
      },
      {
        type: "bullets",
        items: [
          { text: "Storybook lets you preview and test components outside of the full dashboard, one component at a time." },
          { text: "Once generated, switch to the Code tab to find the new story files alongside the component they document." },
        ],
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
        type: "numbered",
        items: [
          {
            title: "Navigate to the Style Tab",
            text: "Switch from \"Interact\" to \"Design\" mode, then select the \"Style\" tab. Select an element in the visual editor to access Figma-like editing controls.",
            image: {
              src: "https://cdn.builder.io/api/v1/image/assets%2Fda9013cf334340238f9e2401de83cc04%2F4dd9ff9956644463bee4e3f61692e56d?format=webp&width=1600",
              alt: "Design Mode, Style tab",
              caption: "Design Mode, Style tab",
            },
          },
          {
            title: "Apply the Visual Changes",
            text: "After adjusting styles in the Style tab, click \"Apply Visual Changes\" to have Fusion implement your edits directly.",
            image: {
              src: "https://cdn.builder.io/api/v1/image/assets%2Fda9013cf334340238f9e2401de83cc04%2F3cc323b429bf4c24b3b740f4087a1bc5?format=webp&width=1600",
              alt: "Apply Visual Changes",
              caption: "Apply Visual Changes",
            },
          },
        ],
      },
      {
        type: "paragraph",
        text: "You can add a prompt from the \"Generate\" tab, or click the \"Apply Visual Changes\" button to have Fusion implement updates directly.",
      },
    ],
  },
  {
    navTitle: "Pull branch into local Kiro",
    heading: "Pull branch into local Kiro",
    blocks: [
      {
        type: "paragraph",
        text: "Take the branch Fusion generated and bring it down to your local machine to keep working in your own editor or terminal.",
      },
      {
        type: "numbered",
        items: [
          {
            title: "Clone the Repo",
            text: "Clone this repo locally.",
            link: {
              text: "Clone this repo locally",
              href: "https://github.com/JasonYangCIS/cloudscape-demo-july-2026",
            },
          },
          {
            title: "Copy the Pull Command",
            text: "Open the Share panel and click \"Pull\" under Code Handoff. Copy the CLI command shown there.",
            image: {
              src: "https://cdn.builder.io/api/v1/image/assets%2Fda9013cf334340238f9e2401de83cc04%2Fa22103b8ca9a4201b7e994ecda45baa2?format=webp&width=800",
              alt: "Share Project, Pull CLI command",
              caption: "Share Project, Pull CLI command",
            },
          },
          {
            title: "Authenticate with the Builder.io CLI",
            text: "In your terminal, run the following command and follow the prompt to authenticate with Builder.io.",
            command: "npx builder.io@latest auth --spaceId da9013cf334340238f9e2401de83cc04",
            image: {
              src: "https://cdn.builder.io/api/v1/image/assets%2Fda9013cf334340238f9e2401de83cc04%2Fa010b9328e514d439180896a8d0bf5bb?format=webp&width=1600",
              alt: "Builder.io CLI authentication",
              caption: "Builder.io CLI authentication",
            },
          },
          {
            title: "Checkout the Branch Locally",
            text: "Click \"Share\" in the top right, then click \"Pull\" under Code Handoff to copy the command. In Kiro or any terminal, cd into the cloned repo and paste the copied command to check out your branch locally.",
            image: {
              src: "https://cdn.builder.io/api/v1/image/assets%2Fda9013cf334340238f9e2401de83cc04%2F7b07d6405b9d4d60952a7fe8be3811c9?format=webp&width=1600",
              alt: "Share Project, Pull CLI command",
              caption: "Share Project, Pull CLI command",
            },
          },
          {
            title: "Make Changes in Your Local IDE",
            text: "Open the repo in your own editor (VS Code, Kiro, etc.) and make whatever code changes you like: install packages, refactor, add features, fix bugs. For example, add or simply make a change in the README, then commit the changes.",
          },
        ],
      },
    ],
  },
  {
    navTitle: "Push local Kiro branch up",
    heading: "Push local Kiro branch up",
    blocks: [
      {
        type: "paragraph",
        text: "Once you've made changes locally, send them back up to the Fusion project.",
      },
      {
        type: "numbered",
        items: [
          {
            title: "Option A: Push Back with the Push Command",
            text: "Open the Share panel, switch to \"Push\", and copy the CLI command shown there. Run it from your local repo to send your changes straight back into the Fusion project. It updates automatically, so there's no manual sync needed.",
            image: {
              src: "https://cdn.builder.io/api/v1/image/assets%2Fda9013cf334340238f9e2401de83cc04%2F7a6b54b38a7449418747fcbbb5eba30e?format=webp&width=1600",
              alt: "Share Project, Push CLI command",
              caption: "Share Project, Push CLI command",
            },
          },
          {
            title: "Option B: git push and Sync Manually",
            text: "Alternatively, commit and `git push` your changes to the remote branch as usual. Back in Fusion, the top bar will show you're behind the remote. Click the sync icon to pull those changes into the project.",
            image: {
              src: "https://cdn.builder.io/api/v1/image/assets%2Fda9013cf334340238f9e2401de83cc04%2Fa7314b9f95704816abf7602ae65d560f?format=webp&width=1600",
              alt: "Fusion, commit behind remote, click to sync",
              caption: "Fusion, commit behind remote, click to sync",
            },
          },
        ],
      },
    ],
  },
  {
    navTitle: "Free Experimentation",
    heading: "Experiment!",
    blocks: [
      {
        type: "paragraph",
        text: "Experiment using prompts, screenshots, and more. You're low-key coding now, so keep flexing your vibe-coding skills with any time you have left. Share what you've built with your peers around you.",
      },
      { type: "heading", text: "Other recommendations" },
      {
        type: "bullets",
        items: [
          { text: "Change the theme of the entire application", example: "\"Match the visual style of Manchester United\"" },
          { text: "Ask questions to Fusion", example: "\"Am I using all Cloudscape design tokens and components?\"" },
          { text: "Ask Fusion to give you recommendations", example: "\"How can I make this dashboard adhere to WCAG 2.1 AA accessibility guidelines? Give me recommendations.\"" },
          { text: "Add gamification to the application", example: "\"Gamify the dashboard to make progress feel more fun.\"" },
        ],
      },
      { type: "heading", text: "Explore the Code" },
      {
        type: "paragraph",
        text: "Switch to the Code tab to see what Fusion generated, browse files, and learn how Cloudscape tokens are applied.",
      },
    ],
  },
  {
    navTitle: "Recap & Resources",
    heading: "Recap & Resources",
    blocks: [
      {
        type: "paragraph",
        text: "Nice work! Over the course of this workshop, you used Fusion to go from a Figma design to a fully themed, production-ready Cloudscape dashboard.",
      },
      { type: "heading", text: "What we covered" },
      {
        type: "bullets",
        items: [
          { text: "Generating a dashboard from a Figma design using the Builder.io Figma plugin and Smart Export." },
          { text: "Using Plan mode to collaborate with Fusion on an approach before generating code, then adding theming support." },
          { text: "Setting up Storybook to develop and review components in isolation." },
          { text: "Using Design mode's Style tab to make Figma-like visual edits and apply them directly to the code." },
          { text: "Handing code off between Fusion and a local IDE with Push/Pull, or plain git push/sync." },
          { text: "Submitting a pull request and using the Builder bot review agent, including tagging @builder-bot to address feedback." },
          { text: "Free experimentation with prompts, theming, and accessibility recommendations." },
        ],
      },
      { type: "heading", text: "Keep learning" },
      {
        type: "bullets",
        items: [
          {
            text: "To keep exploring Fusion beyond this workshop, check out the Get Started with Fusion docs.",
            link: {
              text: "Get Started with Fusion docs",
              href: "https://www.builder.io/c/docs/fusion",
            },
          },
          {
            text: "To learn more about connecting a local repo to your Fusion project, check out the Connecting local repos docs.",
            link: {
              text: "Connecting local repos docs",
              href: "https://www.builder.io/c/docs/projects-local-repo",
            },
          },
          {
            text: "To learn more about pushing and pulling changes with the CLI, check out the Builder CLI docs.",
            link: {
              text: "Builder CLI docs",
              href: "https://www.builder.io/c/docs/builder-cli-api",
            },
          },
          {
            text: "To learn how to connect MCP servers to your Fusion project, check out the MCP integrations docs.",
            link: {
              text: "MCP integrations docs",
              href: "https://www.builder.io/c/docs/fusion-integrations-for-developers",
            },
          },
        ],
      },
    ],
  },
];

function getHighResSrc(src: string) {
  if (!src.includes("img.builder.io") && !src.includes("cdn.builder.io")) return src;
  return src.replace(/([?&]width=)\d+/, "$12400");
}

function Figure({ image }: { image: ImageRef }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box margin={{ top: "s" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        onClick={() => setIsOpen(true)}
        className="step-figure-image"
        style={{
          width: "100%",
          borderRadius: "8px",
          border: "1px solid #e9ebed",
          cursor: "zoom-in",
        }}
      />
      <Modal
        visible={isOpen}
        onDismiss={() => setIsOpen(false)}
        closeAriaLabel="Close image preview"
        header={image.caption ?? image.alt}
        size="max"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getHighResSrc(image.src)}
          alt={image.alt}
          style={{ width: "100%", borderRadius: "8px" }}
        />
      </Modal>
    </Box>
  );
}

function LazyVideo({ video }: { video: VideoRef }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Box margin={{ top: "s" }}>
      <div
        ref={containerRef}
        style={{ width: "100%", borderRadius: "8px", overflow: "hidden", border: "1px solid #e9ebed" }}
      >
        {isVisible && (
          <video
            src={video.src}
            controls
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            style={{ width: "100%", display: "block" }}
          />
        )}
      </div>
      {video.caption && (
        <Box variant="small" color="text-body-secondary" textAlign="center" margin={{ top: "xs" }}>
          {video.caption}
        </Box>
      )}
    </Box>
  );
}

function PromptBlock({ text }: { text: string }) {
  const [value, setValue] = useState(text);

  useEffect(() => {
    setValue(text);
  }, [text]);

  return (
    <Container disableContentPaddings={false}>
      <SpaceBetween size="xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="gen-ai" variant="link" />
            <Box variant="awsui-gen-ai-label">Prompt</Box>
          </div>
          <CopyToClipboard
            variant="icon"
            copyButtonAriaLabel="Copy prompt"
            copySuccessText="Prompt copied"
            copyErrorText="Prompt failed to copy"
            textToCopy={value}
          />
        </div>
        <Textarea
          value={value}
          onChange={({ detail }) => setValue(detail.value)}
          rows={3}
          style={{ root: { boxShadow: { focus: "none" }, borderWidth: "0" } }}
        />
      </SpaceBetween>
    </Container>
  );
}

function CommandBlock({ text }: { text: string }) {
  return (
    <Container disableContentPaddings={false}>
      <SpaceBetween size="xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="command-prompt" variant="subtle" />
            <Box variant="awsui-key-label">Command</Box>
          </div>
          <CopyToClipboard
            variant="icon"
            copyButtonAriaLabel="Copy command"
            copySuccessText="Command copied"
            copyErrorText="Command failed to copy"
            textToCopy={text}
          />
        </div>
        <Box variant="code">{text}</Box>
      </SpaceBetween>
    </Container>
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
          {renderTextWithInlineLink(block.text, block.link)}
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
                <Box margin={{ bottom: "n" }}>
                  {renderTextWithInlineLink(item.text, item.link)}
                  {item.example ? ":" : ""}
                </Box>
                {item.example && (
                  <Box variant="small" color="text-body-secondary" margin={{ top: "xxs" }}>
                    <CopyToClipboard
                      variant="inline"
                      copyButtonAriaLabel="Copy prompt"
                      copySuccessText="Prompt copied"
                      copyErrorText="Prompt failed to copy"
                      textToCopy={item.example.match(/"([^"]*)"/)?.[1] ?? item.example}
                      textToDisplay={item.example}
                    />
                  </Box>
                )}
              </li>
            ))}
          </ul>
        </TextContent>
      );
    case "numbered":
      return (
        <SpaceBetween size="s">
          {block.items.map((item, i) => (
            <Container key={i}>
              <SpaceBetween size="s">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-7 shrink-0 items-center justify-center rounded-full px-3 text-sm font-bold"
                    style={{
                      border: "1px solid var(--color-border-status-info, #006ce0)",
                      color: "var(--color-text-status-info, #006ce0)",
                    }}
                  >
                    Step - {i + 1}
                  </div>
                  <Box variant="h4" margin="n">
                    {item.title}
                  </Box>
                </div>
                {item.image || item.video ? (
                  <Grid
                    gridDefinition={[
                      { colspan: { default: 12, m: 5 } },
                      { colspan: { default: 12, m: 7 } },
                    ]}
                  >
                    <SpaceBetween size="xs">
                      <Box variant="p" color="text-body-secondary" margin="n">
                        {renderTextWithInlineLink(item.text, item.link, item.boldText)}
                      </Box>
                      {item.prompt && <PromptBlock text={item.prompt} />}
                      {item.command && <CommandBlock text={item.command} />}
                    </SpaceBetween>
                    {item.video ? <LazyVideo video={item.video} /> : <Figure image={item.image!} />}
                  </Grid>
                ) : (
                  <SpaceBetween size="xs">
                    <Box variant="p" color="text-body-secondary" margin="n">
                      {renderTextWithInlineLink(item.text, item.link, item.boldText)}
                    </Box>
                    {item.prompt && <PromptBlock text={item.prompt} />}
                    {item.command && <CommandBlock text={item.command} />}
                  </SpaceBetween>
                )}
              </SpaceBetween>
            </Container>
          ))}
        </SpaceBetween>
      );
    case "prompt":
      return block.image ? (
        <Grid
          gridDefinition={[
            { colspan: { default: 12, m: 5 } },
            { colspan: { default: 12, m: 7 } },
          ]}
        >
          <PromptBlock text={block.text} />
          <Figure image={block.image} />
        </Grid>
      ) : (
        <PromptBlock text={block.text} />
      );
    case "image":
      return <Figure image={block.image} />;
    case "alert":
      return (
        <Alert type={block.alertType} header={block.header}>
          {block.text}
        </Alert>
      );
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
    ...(i === 0 && {
      info: <Icon name="status-warning" variant="warning" ariaLabel="Has an open TODO" />,
    }),
  }));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stepIndex]);

  return (
    <div className="workshop-scale min-h-screen flex flex-col bg-slate-50">
      <div className="w-full bg-[#0a0a0a] text-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <svg
              width="608"
              height="130"
              viewBox="0 0 608 130"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-auto"
              role="img"
              aria-label="Builder.io logo"
            >
              <path
                d="M115.14 39C115.14 17.36 97.58 0 76.14 0H10.27C4.58002 0 0 4.62002 0 10.27C0 20.79 22.2899 28.78 22.2899 65C22.2899 101.22 0 109.21 0 119.73C0 125.38 4.58002 130 10.27 130H76.14C97.58 130 115.14 112.64 115.14 91C115.14 75.1 105.59 65.41 105.21 65C105.58 64.59 115.14 54.9 115.14 39ZM13.58 11.1504H76.14C83.58 11.1504 90.58 14.0501 95.84 19.3101C101.1 24.5701 104 31.5703 104 39.0103C104 46.4503 101.26 53.0102 96.38 58.1602L13.59 11.1504H13.58ZM95.83 110.7C90.57 115.96 83.57 118.86 76.13 118.86H13.5699L96.36 71.8501C101.24 77.0001 103.98 83.8 103.98 91C103.98 98.2 101.08 105.44 95.8199 110.7H95.83ZM25.7 99.1602C26.36 97.7802 33.4199 84.08 33.4199 65C33.4199 45.92 26.36 32.2203 25.7 30.8403L85.86 65L25.7 99.1602Z"
                fill="white"
              />
              <path
                d="M195.12 47.6802C212 47.6802 221.53 61.1602 221.53 77.4902C221.53 93.8202 212 107.19 195.12 107.19C186.35 107.19 179.67 103.68 175.94 97.77L174.41 105.88H163.88V27.5103H176.92V56.46C180.1 51.64 186.34 47.6899 195.11 47.6899L195.12 47.6802ZM192.49 95.6704C202.35 95.6704 208.49 87.67 208.49 77.48C208.49 67.29 202.35 59.1802 192.49 59.1802C182.63 59.1802 176.49 67.07 176.49 77.48C176.49 87.89 182.52 95.6704 192.49 95.6704Z"
                fill="white"
              />
              <path
                d="M267.45 82.4102V48.9902H280.49V81.7603C280.49 96.3303 273.81 107.18 255.39 107.18C236.97 107.18 230.29 96.3303 230.29 81.7603V48.9902H243.33V82.4102C243.33 91.2902 247.49 95.6704 255.38 95.6704C263.27 95.6704 267.43 91.2902 267.43 82.4102H267.45Z"
                fill="white"
              />
              <path
                d="M290.92 31.46C290.92 26.39 294.49 22.8203 299.56 22.8203C304.63 22.8203 308.08 26.39 308.08 31.46C308.08 36.53 304.51 39.8701 299.56 39.8701C294.61 39.8701 290.92 36.42 290.92 31.46Z"
                fill="white"
              />
              <path
                d="M523.58 31.46C523.58 26.39 527.15 22.8203 532.22 22.8203C537.29 22.8203 540.74 26.39 540.74 31.46C540.74 36.53 537.17 39.8701 532.22 39.8701C527.27 39.8701 523.58 36.42 523.58 31.46Z"
                fill="white"
              />
              <path
                d="M498.48 97.9302C498.48 92.8602 502.05 89.29 507.12 89.29C512.19 89.29 515.64 92.8602 515.64 97.9302C515.64 103 512.07 106.34 507.12 106.34C502.17 106.34 498.48 102.89 498.48 97.9302Z"
                fill="white"
              />
              <path d="M306.02 48.9902H292.98V105.86H306.02V48.9902Z" fill="white" />
              <path d="M319.06 105.87V27.5H332.1V105.87H319.06Z" fill="white" />
              <path
                d="M385.91 27.4902H398.95V105.86H388.42L386.89 97.75C383.27 103.67 376.59 107.17 367.71 107.17C350.94 107.17 341.41 93.6902 341.41 77.4702C341.41 61.2502 350.94 47.6602 367.71 47.6602C376.59 47.6602 382.72 51.6002 385.9 56.4302V27.48L385.91 27.4902ZM370.46 59.1802C360.6 59.1802 354.46 67.07 354.46 77.48C354.46 87.89 360.6 95.6704 370.46 95.6704C380.32 95.6704 386.46 87.67 386.46 77.48C386.46 67.29 380.43 59.1802 370.46 59.1802Z"
                fill="white"
              />
              <path
                d="M462.62 90.3003C458.57 100.49 449.14 107.18 436.76 107.18C419.56 107.18 408.38 94.3601 408.38 77.3701C408.38 60.3801 419.78 47.6704 436.65 47.6704C453.52 47.6704 464.59 60.4904 464.59 77.1504C464.59 79.2304 464.5 80.0202 464.24 81.2002H421.19C422.18 90.1902 427.98 95.9902 437.08 95.9902C443.33 95.9902 448.48 92.9202 450.89 87.2202L462.62 90.29V90.3003ZM421.41 71.5703H451.66C450.56 63.6803 445.08 58.3101 436.65 58.3101C428.22 58.3101 422.73 63.7903 421.42 71.5703H421.41Z"
                fill="white"
              />
              <path
                d="M504.48 60.7202C504.48 60.7202 502.95 60.5 501.52 60.5C492.32 60.5 486.84 65.3203 486.84 76.2803V105.87H473.8V49H484.33L485.86 56.8901C487.94 53.2701 492.76 48.4502 502.63 48.4502C503.18 48.4502 504.49 48.5601 504.49 48.5601V60.7202H504.48Z"
                fill="white"
              />
              <path d="M538.67 48.9902H525.63V105.86H538.67V48.9902Z" fill="white" />
              <path
                d="M547.99 77.48C547.99 61.48 559.39 47.6704 577.47 47.6704C595.55 47.6704 607.06 61.48 607.06 77.48C607.06 93.48 595.66 107.18 577.47 107.18C559.28 107.18 547.99 93.48 547.99 77.48ZM577.47 95.6704C587 95.6704 594.02 88.44 594.02 77.48C594.02 66.52 587.01 59.1802 577.47 59.1802C567.93 59.1802 561.03 66.41 561.03 77.48C561.03 88.55 568.04 95.6704 577.47 95.6704Z"
                fill="white"
              />
            </svg>
            <span className="flex items-center gap-2 text-base md:text-lg font-semibold tracking-wide">
              ×
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fda9013cf334340238f9e2401de83cc04%2Fd522358f89fa47d7943ab6239b6fb7b3?format=webp&width=1600"
                alt="Amazon"
                className="h-9 w-auto md:h-8 mt-2"
              />
            </span>
          </div>
        </div>
      </div>

      <AppLayout
        navigationWidth={360}
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
              <SpaceBetween size="xs">
                {step.blocks.map((block, i) => (
                  <BlockRenderer key={i} block={block} />
                ))}
              </SpaceBetween>
            </Container>
          </ContentLayout>
        }
      />

      <footer className="w-full bg-gray-100 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-2 md:px-6 text-center text-sm text-gray-600">
          Builder.io &lt;&gt; AWS Cloudscape Workshop Seattle 2026
        </div>
      </footer>
    </div>
  );
}
