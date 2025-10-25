#!/bin/zsh
# Run local lib build, pack, and update app with auto-rebuild on changes

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

set_terminal_title() {
    # This works in VS Code's integrated terminal
    echo -ne "\033]0;$1\007"
    # Also set it as a variable that can be used in prompt
    export TERMINAL_TITLE="$1"
}

# For VS Code, also update the tab name via prompt
update_vscode_title() {
    print -Pn "\e]0;$1\a"
}

set_terminal_title "dev 🌙"
update_vscode_title "dev 🌙"

echo "${BLUE}→ Initial build and pack...${NC}"

# Build lib
cd lib

# Build and create local tarball
npm run build >/dev/null 
tsc --project tsconfig.lib.json >/dev/null

# Capture only the filename from npm pack (no log noise)
PKG_TGZ=$(npm pack 2>/dev/null)

# Get packed version
LIB_VERSION=$(node -p "require('./package.json').version")

# Install packed lib in app
cd ../app

echo "${BLUE}→ Installing packed lib in app...${NC}"
npm i ../lib/$PKG_TGZ >/dev/null

echo "${GREEN}✓ App running with @moondreamsdev/dreamer-ui@$LIB_VERSION (local tarball)${NC}"
echo "${BLUE}→ Watching lib for changes...${NC}\n"

# Function to rebuild and reinstall
rebuild_lib() {
    echo "\n${BLUE}→ Change detected, rebuilding lib...${NC}"
    
    cd ../lib
    
    # Clean up old tarballs
    rm -f *.tgz
    
    # Rebuild
    npm run build >/dev/null 2>&1
    tsc --project tsconfig.lib.json >/dev/null 2>&1
    
    # Pack
    PKG_TGZ=$(npm pack 2>/dev/null)
    
    # Reinstall in app
    cd ../app
    npm i ../lib/$PKG_TGZ >/dev/null 2>&1
    
    echo "${GREEN}✓ Lib rebuilt and reinstalled${NC}"
    cd ../lib
}

# Start app in background
cd ../app
npm run dev:local &
APP_PID=$!

# Watch lib src for changes
cd ../lib

# Trap to kill app when script exits
trap "kill $APP_PID 2>/dev/null; exit" INT TERM EXIT

# Use fswatch if available, otherwise fall back to basic approach
if command -v fswatch >/dev/null 2>&1; then
    fswatch -o ./src | while read; do
        rebuild_lib
    done
else
    echo "${BLUE}Note: Install fswatch for better file watching (brew install fswatch)${NC}\n"
    
    # Fallback: manual rebuild command
    echo "Press 'r' + Enter to rebuild, 'q' + Enter to quit"
    while true; do
        read -r key
        case $key in
            r|R)
                rebuild_lib
                ;;
            q|Q)
                echo "\n${BLUE}→ Shutting down...${NC}"
                kill $APP_PID 2>/dev/null
                exit 0
                ;;
        esac
    done
fi