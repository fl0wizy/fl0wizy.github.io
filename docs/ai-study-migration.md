# AI study migration

## Reading structure

All 17 notes open with `서론` / `Introduction`. The lineage article explains the three approaches through the same SSH-detection example before showing a relationship map, then treats historical changes separately. Its former ASCII taxonomy is replaced with localized SVG figures in `public/images/ai-study/ai-lineage-map-{ko,en}.svg`. AI article prose uses neutral light text, a distinct introductory paragraph, and clearer section boundaries within the existing dark theme.

## English editions

All 17 posts have English titles, summaries, and bodies in `src/content/posts/en/` as of 2026-11-24. They share the original IDs, series order, links, and 256 source figures. Image captions and the surrounding explanations are translated; the original figure labels are retained. Executable code is preserved, with Korean comments translated. Python syntax trees were compared for all 33 executable Python examples. Translated prose was checked for numerical and mathematical notation changes, and corrected where needed.

## Original import

Published on 2026-11-24 from the user-selected AI Notion pages.

- 16 source pages became 17 posts: 16 ordered study entries and one standalone MCP concept note.
- Chapter 9 is absent in the source. Original chapter numbers remain unchanged.
- The current SVM source is split before section 9, preserving all text and figures across two posts. Its second part covers kernel SVM prediction and the relationship with neural networks; no missing SMO or dual-problem section was invented.
- All 256 source image blocks are stored as 256 local files under `public/images/ai-study/`. Image bytes are unchanged. Filenames use the first 20 hexadecimal characters of their SHA-256 digest.
- Source code blocks are unchanged. Notion-specific markup is converted to Markdown; tables and captions are retained, source references between migrated pages become local blog links, and source headings are promoted when needed for the article table of contents.
- Body text was checked against all 16 source pages after removing markup and whitespace. SVM parts were combined for this comparison.
- Compact SVG covers are separate from the original body figures.
- The exam page and previously deleted AI series are excluded.

| Reading order | Post | Source image blocks |
| --- | --- | --- |
| 1 | [ai-foundations-01-lineage](../src/content/posts/ai-foundations-01-lineage.md) | 0 |
| 2 | [ai-foundations-02-agent-harness-llm](../src/content/posts/ai-foundations-02-agent-harness-llm.md) | 1 |
| 3 | [ai-foundations-03-machine-learning](../src/content/posts/ai-foundations-03-machine-learning.md) | 15 |
| 4 | [ai-foundations-04-classification](../src/content/posts/ai-foundations-04-classification.md) | 10 |
| 5 | [ai-foundations-05-regression](../src/content/posts/ai-foundations-05-regression.md) | 10 |
| 6 | [ai-foundations-06-knn](../src/content/posts/ai-foundations-06-knn.md) | 6 |
| 7 | [ai-foundations-07-decision-trees](../src/content/posts/ai-foundations-07-decision-trees.md) | 8 |
| 8 | [ai-foundations-08-svm-margin-kernel](../src/content/posts/ai-foundations-08-svm-margin-kernel.md) | 8 |
| 9 | [ai-foundations-09-svm-prediction](../src/content/posts/ai-foundations-09-svm-prediction.md) | 2 |
| 10 | [ai-foundations-10-ensemble](../src/content/posts/ai-foundations-10-ensemble.md) | 10 |
| 11 | [ai-foundations-11-deep-learning](../src/content/posts/ai-foundations-11-deep-learning.md) | 12 |
| 12 | [ai-foundations-12-computational-graphs](../src/content/posts/ai-foundations-12-computational-graphs.md) | 37 |
| 13 | [ai-foundations-13-backpropagation](../src/content/posts/ai-foundations-13-backpropagation.md) | 33 |
| 14 | [ai-foundations-14-cnn](../src/content/posts/ai-foundations-14-cnn.md) | 31 |
| 15 | [ai-foundations-15-rnn](../src/content/posts/ai-foundations-15-rnn.md) | 36 |
| 16 | [ai-foundations-16-transformer](../src/content/posts/ai-foundations-16-transformer.md) | 34 |
| Standalone | [ai-concepts-mcp](../src/content/posts/ai-concepts-mcp.md) | 3 |
