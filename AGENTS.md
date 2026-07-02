<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Builder.io CDN images

When adding or editing an `img.builder.io/api/v1/image/...` URL, always request `width=1600` in the query string (not `width=800` or lower), so images render at high resolution.
