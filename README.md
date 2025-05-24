# Dynamix

> A Vue 3 component library for building custom interfaces with Tailwind CSS and more.

---

## 🚀 Installation

### 📦 From Latest GitHub Release

```bash
yarn add https://github.com/sohypekhaled/dynamix/releases/latest/download/dynamix.tgz
# or
npm install https://github.com/sohypekhaled/dynamix/releases/latest/download/dynamix.tgz
```

### 🧪 From a Specific Tag

```bash
yarn add https://github.com/sohypekhaled/dynamix/releases/download/v0.1.0/dynamix.tgz
```

### 🛠️ From Source (if building locally)

```bash
yarn add github:sohypekhaled/dynamix
```

> ⚠️ This requires the consuming project to build the library using `prepare` or `build` scripts.

---

## 📦 Usage

```ts
import { createApp } from 'vue';
import { DynamixPlugin } from 'dynamix';

const app = createApp(App);
app.use(DynamixPlugin);
```

Then use any of the components:

```vue
<template>
  <DXButton label="Click me" />
</template>
```

> Styles like Tailwind CSS must be set up in the parent project.

---

## 🔁 Updating

To update to the latest version:

```bash
yarn remove dynamix && yarn add https://github.com/sohypekhaled/dynamix/releases/latest/download/dynamix.tgz
```

---

## 🛠 GitHub Workflow for Releasing

This repo includes an automated GitHub Actions workflow:

### ✅ Triggered on:

- Push to `main` or `dev`
- Manual dispatch with optional version input

### 🧰 What it does:

- Bumps the version in `package.json` (auto or manually)
- Tags the release
- Builds the library using Vite
- Packs it into `dynamix.tgz`
- Uploads it to a GitHub Release

### 💡 Manual Trigger Example

Go to **Actions > Run Workflow**, and optionally provide a version like `0.2.0`.

---

## 📁 Folder Structure (dist)

The published tarball includes:

- `dynamix.umd.js` / `dynamix.es.js` (library)
- `index.d.ts` (types)
- `index.css` (optional, if exported)
- Tree-shakable, externalized peer dependencies

---

## 📦 Peer Dependencies

Make sure these are installed in the host project:

```json
{
  "@tailwindcss/vite": "^4.0.13",
  "tailwindcss": "^4.0.13",
  "vue": "^3.5.13",
  "pinia": "^3.0.1",
  "yup": "^1.6.1"
}
```

---

## 🧑‍💻 Contributing

1. Clone the repo
2. Run `yarn dev`
3. Build with `yarn build:lib`
4. Trigger release with `yarn pack:lib` or push to `main`

---

## 📄 License

MIT © Sohype Khaled
```
