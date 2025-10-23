#!/bin/zsh
# Run local lib build, bump, publish (test tag), and update app

set -e

# Build lib
cd lib

# Build and publish lib (test tag) using package scripts

# Build lib and create local tarball
echo "→ Building and packing lib..."
npm run build >/dev/null 2>&1
tsc --project tsconfig.lib.json >/dev/null 2>&1

# Capture only the filename from npm pack (no log noise)
PKG_TGZ=$(npm pack 2>/dev/null)

# Get packed version
LIB_VERSION=$(node -p "require('./package.json').version")

# Install latest test version in app
cd ../app

# Install packed lib in app
echo "→ Installing packed lib in app..."
npm i ../lib/$PKG_TGZ >/dev/null 2>&1

# Start app
npm run dev

echo "→ App running with @moondreamsdev/dreamer-ui@$LIB_VERSION (local tarball)"
