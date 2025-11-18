# Tauri + Angular

## Build

### Requirements for Ubuntu

```bash
sudo apt install rustup nodejs
rustup default stable
npm -g install pnpm
sudo apt install libsoup-3.0-dev libwebkit2gtk-4.1-dev
```

### Requirements for Windows

Install Node.js from https://nodejs.org/en/download

Install Rust from https://static.rust-lang.org/rustup/dist/x86_64-pc-windows-msvc/rustup-init.exe

```bash
npm -g install pnpm
```

### Build steps

```bash
pnpm install
pnpm tauri dev
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer) + [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template).
