# Contributing to Fetchtastic

Welcome, and thanks for your interest in contributing! Please take a moment to review the following:

## Style Guide

- **Commits** follow the ["Conventional Commits" specification](https://www.conventionalcommits.org/en/v1.0.0/). This allows for changelogs to be generated automatically upon release.
- **Code** is formatted via [Prettier](https://prettier.io/) and statically analyzed by [ESLint](https://eslint.org/)
- **JavaScript** is written as [TypeScript](https://www.typescriptlang.org/) where possible.
-

## Issues

If you encounter any bugs, have feature requests, or want to suggest improvements, please visit [GitHub Issues](https://github.com/fveracoechea/fetchtastic/issues) and
open an issue (if there isn't one already). When opening an issue, please provide as much detail as possible, including steps to reproduce the problem (if applicable).

## Pull Requests

We appreciate your efforts to contribute directly to the codebase through pull requests.

When contributing with new `features` or `bug-fixes`, please follow these steps:

1. Fork the repository.
2. Create a new branch from the main branch for example `feature/some-new-feature` or `bugfix/some-bugfix`.
3. In the repo, prior to any other installation steps, run:
   ```sh
   corepack enable
   ```
4. Install dependencies:
   ```sh
   pnpm i
   ```
5. Ensure your code follows the project's coding style.
6. Write clear and concise commit messages.
7. Consider including tests and documentation changes if applicable.
8. Add a [changeset](https://www.npmjs.com/package/@changesets/cli) by running:
   ```sh
   pnpm changeset
   ```
9. Submit your pull request, providing a description of the changes made and any additional context.
