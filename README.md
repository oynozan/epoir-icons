# epoir-icons

Animated icon library forked from [Lucide](https://lucide.dev). Every icon has a bespoke, characterful animation — smoke rises, maps unfold, balls get thrown, shredders shred.

> Work in progress — icons are being added category by category. Not yet published to npm.

## Usage

```tsx
import { Coffee } from "epoir-icons";

<Coffee size={32} />
```

Icons animate on hover and settle back to the exact source glyph.

## Repo layout

- `packages/icons` — the library (this is all that ships to npm)
- `apps/web` — demo gallery ([Next.js](https://nextjs.org))

## Development

```sh
npm install
npm run dev   # builds the icons package and starts the gallery
```

## License

ISC
