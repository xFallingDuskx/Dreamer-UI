# Build and release flow: technical context

## Root causes

- [`app/tsconfig.dev.json`](../../../../../app/tsconfig.dev.json) mapped
  `react` and `react-dom` to runtime packages, bypassing `@types/react`.
- Resolving library source from outside `app/` exposed separate React type
  identities from `app/node_modules` and `lib/node_modules`.
- Timeout refs declared as `number` failed when the app's Node declarations
  made `setTimeout` return `NodeJS.Timeout`.
- Vite emptied `dist` before declaration generation, while TypeScript's
  composite cache could treat declarations as current and emit nothing on a
  repeated build.
- CommonJS export targets ended in `.cjs.js`; because the package uses
  `"type": "module"`, Node treated those files as ESM.
- PR previews installed a local package but used source-based `build:local`, so
  they did not validate published exports or declaration paths.
- Publishing and deployment were separate workflows joined by
  `workflow_run`. The publish job could publish successfully and then fail on
  an unmergeable version PR, which skipped deployment.
- Deployment used a fixed delay and `@latest`, making the selected artifact
  timing-dependent. Its app-only trigger retained a `workflow_run`-only guard.

## Architecture

### Local development

[`app/vite.config.dev.ts`](../../../../../app/vite.config.dev.ts) aliases the
package and stylesheet to `lib/src`. [`app/tsconfig.dev.json`](../../../../../app/tsconfig.dev.json)
mirrors those package paths and resolves React declarations from the app's
single `@types` installation. Vite deduplicates the React runtime. The default
app `dev` script uses this config.

### Pull requests

[`preview-pr.yml`](../../../../../.github/workflows/preview-pr.yml) performs:

1. Clean library install and build.
2. `npm pack` into `RUNNER_TEMP`.
3. Clean app install plus a no-save tarball install.
4. Production app build and Firebase preview deployment.

This validates the same JavaScript, CSS, exports, and declarations that npm
consumers receive.

### Post-merge release and deployment

[`publish-lib.yml`](../../../../../.github/workflows/publish-lib.yml) is a
serialized workflow triggered by `lib/**` or `app/**` changes:

- Registry metadata supplies `dist-tags.latest`, all published versions, and
  each version's `gitHead`.
- A library-changing commit reuses an existing version with the same `gitHead`
  on rerun; otherwise it increments the latest stable patch.
- The release version is written only to the CI working tree, then built and
  published.
- App-only commits use the existing latest version.
- Registry polling requires both the exact version and `latest` tag to match.
- A stale run may publish its library version but does not deploy over a newer
  `master`; the newer queued run performs the deployment.
- The app installs the exact resolved version before its production build.

## Package invariants

- [`lib/package.json`](../../../../../lib/package.json) uses
  `0.0.0-development` in git; npm owns release numbering.
- `types` and every export map to the declaration tree emitted under
  `dist/src`.
- Type generation uses `tsc --build --force` after Vite clears `dist`.
- CommonJS entries end in `.cjs`; ESM entries end in `.esm.js`.
- [`app/package.json`](../../../../../app/package.json) and its lockfile use a
  registry dependency. Local source loading is a Vite/TypeScript concern, not
  an npm `file:` dependency.
- [`lib/src/styles.css`](../../../../../lib/src/styles.css) is the local HMR
  stylesheet entry; packaged CSS remains `dist/styles.css`.
- Timeout refs use `ReturnType<typeof setTimeout>` so DOM-only and Node-aware
  TypeScript projects can both consume the source.

## Verification

```bash
npm --prefix lib ci
npm --prefix lib run build
npm --prefix lib pack --pack-destination /tmp
npm --prefix app ci
npm --prefix app install --no-save /tmp/moondreamsdev-dreamer-ui-*.tgz
npm --prefix app run build
npm --prefix app run build:local
```

Also parse both workflow YAML files and validate the registry metadata resolver
against `@moondreamsdev/dreamer-ui`.

All commands above passed on July 25, 2026. `actionlint` accepted both workflow
files, and browser inspection observed 197 `/lib/src/` modules with one
optimized React runtime.

## External requirements

- `NPM_TOKEN` must retain publish access.
- `FIREBASE_SERVICE_ACCOUNT_DREAMERUI` must retain Firebase Hosting access.
- `master` workflow runs must have npm registry and Firebase network access.
