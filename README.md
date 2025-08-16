# Docerium

<div align="center">

<img src = "src/app/favicon.ico" height=200 width=200>

</div>

---

<div align="center">

![CI](https://github.com/docerium/docerium.com/actions/workflows/ci.yml/badge.svg)
<a href="https://github.com/docerium/docerium.com/stargazers"><img src="https://img.shields.io/github/stars/docerium/docerium.com?style=for-the-badge&logo=github&color=C9CBFF&logoColor=white" /></a>
<a href="https://github.com/docerium/docerium.com/network/members"><img src="https://img.shields.io/github/forks/docerium/docerium.com?style=for-the-badge&logo=github&color=C9CBFF&logoColor=white" /></a>
<a href="https://github.com/docerium/docerium.com/issues"><img src="https://img.shields.io/github/issues/docerium/docerium.com?style=for-the-badge&logo=github&color=C9CBFF&logoColor=white" /></a>
<a href="https://github.com/docerium/docerium.com/graphs/contributors"><img src="https://img.shields.io/github/contributors/docerium/docerium.com?style=for-the-badge&logo=github&color=C9CBFF&logoColor=white" /></a>

</div>

<div align="center">

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge&logo=github&color=C9CBFF&logoColor=white)](https://choosealicense.com/licenses/mit/)
<img src="https://img.shields.io/github/repo-size/docerium/docerium.com?style=for-the-badge&logo=github&color=C9CBFF&logoColor=white" />
<img src="https://img.shields.io/github/last-commit/docerium/docerium.com?style=for-the-badge&logo=github&color=C9CBFF&logoColor=white" />

</div>

Welcome to **Docerium**, an all-in-one web application designed to be the ultimate tool for teaching and learning. Docerium integrates a powerful suite of tools including an interactive whiteboard, a dynamic graphing calculator, and a real-time markdown notebook, making it easier than ever to visualize concepts, solve problems, and take notes.

---

## ✨ Features

- **Interactive Whiteboard:** A fully-featured digital whiteboard powered by Excalidraw. Perfect for drawing diagrams, sketching ideas, and collaborating in real-time.
- **Dynamic Graphing Calculator:** Plot multiple functions, zoom in and out of the coordinate plane, and analyze mathematical expressions with ease, powered by the **Desmos API**.
- **Live-Preview Notebook:** A split-screen markdown editor that renders LaTeX equations and markdown syntax as you type, providing immediate visual feedback for your notes.
- **Persistent State:** Your work on the whiteboard, grapher, and notebook is automatically saved to local storage, so you can pick up right where you left off.
- **Sleek, Modern UI:** A clean and intuitive interface with a macOS-inspired dock for easy navigation between tools.

---

## 🛠️ Tech Stack

<p align="center">
  <a href="https://nextjs.org/" target="_blank"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"></a>
  <a href="https://react.dev/" target="_blank"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"></a>
  <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://tailwindcss.com/" target="_blank"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
  <a href="https://sass-lang.com/" target="_blank"><img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="SCSS"></a>
  <a href="https://jotai.org/" target="_blank"><img src="https://img.shields.io/badge/Jotai-000000?style=for-the-badge&logo=jotai&logoColor=white" alt="Jotai"></a>
</p>

This project is built with a modern, robust technology stack:

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Library:** [React](https://reactjs.org/)
- **State Management:** [Jotai](https://jotai.org/)
- **Styling:** [SCSS](https://sass-lang.com/) and [Tailwind CSS](https://tailwindcss.com/)
- **Whiteboard:** [Excalidraw](https://excalidraw.com/)
- **Graphing:** [Desmos API](https://www.desmos.com/api/v1.8/docs/index.html) and [Math.js](https://mathjs.org/)
- **Markdown & LaTeX:** [Katex](https://katex.org/)

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js (version 20.0 or higher) and npm installed on your machine.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/docerium/docerium.com.git
    cd docerium.com/public
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

### Running the Development Server

Once the dependencies are installed, you can start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page will auto-update as you edit the files.

---

## Usage

Navigate between the three main tools using the icons in the dock:

- **Whiteboard:** Use the various tools to draw, write, and create diagrams. Your canvas is saved automatically.
- **Graphs:** Enter mathematical expressions (e.g., `sin(x) * x`) into the input fields. You can add or remove functions, and the graph will update in real-time. Use your mouse or trackpad to pan and zoom.
- **Notebook:** Write in the left pane using markdown and LaTeX syntax. A live preview will be rendered in the right pane.

---

## 📂 Project Structure

```
src/
    ├── app/                  # Next.js App Router pages
    │   ├── graphs/
    │   ├── notebook/
    │   └── whiteboard/
    ├── components/           # Reusable React components (like Dock)
    ├── store.ts              # Jotai atoms for global state management
    └── styles/               # Global and component-specific SCSS files
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". For more details, see the [contributing guide](CONTRIBUTING.md).

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
