# Dreamer UI

Holding the [Dreamer UI library](https://www.npmjs.com/package/@moondreamsdev/dreamer-ui) and its demo app.

## Setup

Install each package from its committed lockfile:

```bash
npm --prefix lib ci
npm --prefix app ci
```

## Local development

Start the app from one terminal:

```bash
cd app
npm run dev
```

Open http://localhost:8888/. The development config loads library components
and styles directly from `lib/src`, so changes receive HMR without rebuilding,
packing, or reinstalling the library.

Use `npm run dev:package` in `app/` only when you intentionally want to test
the registry package instead of local source.

## Pull requests

The preview workflow builds and packs the library, installs that tarball into
the app, runs the production app build, and deploys a Firebase preview. This
validates the package boundary rather than the local source aliases.

## Releases and deployment

Merges to `master` use one serialized workflow:

- Library changes derive the next patch from npm, build, and publish it.
- App-only changes reuse the current npm version without publishing.
- The app installs the exact resolved version, builds, and deploys to Firebase.
- Stale queued runs do not deploy over a newer `master` commit.

The npm registry is the release-version source of truth.
`lib/package.json` intentionally keeps the development version
`0.0.0-development`; CI assigns release versions without opening version PRs.

## Issue documentation

Implementation work must include human and AI documentation under the dated
structure described in [`docs/README.md`](docs/README.md).
