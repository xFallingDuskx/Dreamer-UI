# Repair the build and release flow

## Outcome

Dreamer UI now has one clear path for each stage:

- `npm run dev` in `app/` loads library source directly with HMR.
- Pull requests build and install the packed library before building the app.
- Merges publish a registry-derived patch when library code changed.
- The same workflow builds and deploys the app with one exact library version.

## Why this changed

The previous flow mixed source aliases, local tarballs, npm `@latest`, a fixed
registry delay, and an automated version PR. A preview could pass without
testing the package that consumers receive, while a successful npm publish
could still be reported as failed and prevent deployment.

## Walkthrough

1. Local development uses source aliases for components and styles. React is
   deduplicated to one runtime and one set of TypeScript declarations.
2. PR validation packs the library and runs the app's production build against
   that tarball.
3. Library builds always regenerate declarations and expose working ESM,
   CommonJS, CSS, and type entry points.
4. The post-merge workflow serializes releases, derives the next patch from
   npm, and avoids publishing a second version when the same commit is rerun.
5. Deployment installs the resolved version explicitly. It does not rely on a
   fixed sleep or a moving `@latest` dependency.
6. App-only merges deploy with the current npm version without publishing a
   new library version.

## Review guide

- Confirm local imports resolve to `lib/src` only in the development config.
- Confirm PR CI uses `npm run build`, not `build:local`.
- Confirm the release workflow publishes only for `lib/**` changes.
- Confirm deployment installs `${PACKAGE_NAME}@${VERSION}`.
- Confirm the old deploy workflow and tarball watcher are gone.

## Test steps

```bash
npm --prefix lib ci
npm --prefix lib run build
npm --prefix app ci
npm --prefix app run build:local
```

Pack the library, install the tarball in the app with `--no-save`, and run the
normal app build to reproduce the PR validation path.

Verified on July 25, 2026:

- Library bundle and declaration build passed.
- Registry-package, packed-package, and local-source app builds passed.
- Repeated library builds retained declarations, and the packed CommonJS
  component export loaded successfully.
- Both workflow files passed `actionlint`.
- The local app loaded successfully with 197 library source modules and one
  React runtime.

## Operational note

The npm registry is now the version source of truth. The committed library
version is intentionally `0.0.0-development`; release versions are assigned
only inside CI.
