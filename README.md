# Teaching Made Easy (TME)

Welcome to **Teaching Made Easy (TME)**, an all-in-one web application designed to be the ultimate tool for teaching and learning. TME integrates a powerful suite of tools including an interactive whiteboard, a dynamic graphing calculator, and a real-time markdown notebook, making it easier than ever to visualize concepts, solve problems, and take notes.

## ✨ Features

- **Interactive Whiteboard:** A fully-featured digital whiteboard powered by Excalidraw. Perfect for drawing diagrams, sketching ideas, and collaborating in real-time.
- **Dynamic Graphing Calculator:** Plot multiple functions, zoom in and out of the coordinate plane, and analyze mathematical expressions with ease.
- **Live-Preview Notebook:** A split-screen markdown editor that renders LaTeX equations and markdown syntax as you type, providing immediate visual feedback for your notes.
- **Persistent State:** Your work on the whiteboard, grapher, and notebook is automatically saved to local storage, so you can pick up right where you left off.
- **Sleek, Modern UI:** A clean and intuitive interface with a macOS-inspired dock for easy navigation between tools.

## 🛠️ Tech Stack

This project is built with a modern, robust technology stack:

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Library:** [React](https://reactjs.org/)
- **State Management:** [Jotai](https://jotai.org/)
- **Styling:** [SCSS](https://sass-lang.com/) and [Tailwind CSS](https://tailwindcss.com/)
- **Whiteboard:** [Excalidraw](https://excalidraw.com/)
- **Graphing:** [Victory](https://formidable.com/open-source/victory/) and [Math.js](https://mathjs.org/)
- **Markdown & LaTeX:** [Katex](https://katex.org/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js (version 18.0 or higher) and npm installed on your machine.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/andrinoff/tme.git
    cd tme
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

## Usage

Navigate between the three main tools using the icons in the sidebar:

- **Whiteboard:** Use the various tools to draw, write, and create diagrams. Your canvas is saved automatically.
- **Graphs:** Enter mathematical expressions (e.g., `sin(x) * x`) into the input fields. You can add or remove functions, and the graph will update in real-time. Use your mouse or trackpad to pan and zoom.
- **Notebook:** Write in the left pane using markdown and LaTeX syntax. A live preview will be rendered in the right pane.

## 📂 Project Structure

```
public/
src/
├── app/                  # Next.js App Router pages
│   ├── graphs/
│   ├── notebook/
│   └── whiteboard/
├── components/           # Reusable React components (like Sidebar)
├── store.ts              # Jotai atoms for global state management
└── styles/               # Global and component-specific SCSS files
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
