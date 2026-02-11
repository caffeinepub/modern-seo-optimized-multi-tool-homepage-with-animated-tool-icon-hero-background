# Specification

## Summary
**Goal:** Make the existing PDF and image tools work end-to-end by integrating real backend processing (upload → process → download) instead of placeholder client-side behavior.

**Planned changes:**
- Add backend endpoints in the single Motoko actor (backend/main.mo) to process: PDF→DOCX, image compress, and image resize+compress by accepting file bytes, calling a real external processing API over HTTPS (or other real implementation), and returning processed bytes with output filename and content type.
- Introduce a backend operation/job workflow to support upload/progress states and reliable download, including operation identifiers, upload initiation/finalization (with chunking if needed), processing, retrieval, and cleanup/retention to avoid unbounded storage growth (using the existing blob storage mixin where appropriate).
- Update frontend/src/hooks/useQueries.ts to replace the placeholder mutation with a real backend call sequence supporting operation selection, resize/compress parameters, upload-progress callbacks, and returning processedBytes/filename/contentType.
- Update the three tool pages to use backend-driven processing and accurate messaging: PdfToWordOnlineFreePage.tsx, ImageCompressorOnlineFreePage.tsx, and ImageResizeCompressOnlineFreePage.tsx (including correct output filenames/content types and user-friendly error display via existing Alert UI).

**User-visible outcome:** Users can upload a PDF or image in the existing tool pages, see meaningful progress, and download a correctly processed output file (DOCX for PDF→Word; compressed/resized images for the image tools), with errors shown clearly when inputs are unsupported or processing fails.
