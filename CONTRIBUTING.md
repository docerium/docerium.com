# Contributing to Teaching Made Easy

First off, thank you for considering contributing to TME! It's people like you that make TME such a great tool.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20 or later)

### Fork & Clone

1.  **Fork** the repository to your own GitHub account.
2.  **Clone** your fork to your local machine:
    ```bash
    git clone https://github.com/YOUR_USERNAME/tme.git
    cd tme/public
    ```

### Setup

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Making Changes

1.  **Create a new branch** for your changes:

    ```bash
    git checkout -b your-feature-name
    ```

    Please use a descriptive branch name (e.g., `feat/add-new-button` or `fix/fix-dock-bug`).

2.  **Make your changes** to the codebase.

    - The main application code is in the `public/src` directory.
    - Ensure your code follows the existing style. We use ESLint for linting. You can check your code by running `npm run lint`.

3.  **Commit your changes** with a descriptive commit message. We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
    ```bash
    git commit -m "feat: Add a new amazing feature"
    ```

## Submitting a Pull Request

1.  **Push your branch** to your fork:

    ```bash
    git push origin your-feature-name
    ```

2.  **Open a Pull Request** from your fork to the `master` branch of the original repository.

3.  **Fill out the Pull Request template** with the required information.

4.  **Wait for a review.** We'll review your pull request as soon as possible. We may suggest some changes or improvements.

## Code of Conduct

We have a [Code of Conduct](./CODE_OF_CONDUCT.md) that we expect all contributors to adhere to. Please read it before contributing.

Thank you again for your contribution!
