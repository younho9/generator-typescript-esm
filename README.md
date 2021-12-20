# @younho9/generator-typescript-esm

[![CI](https://github.com/younho9/generator-typescript-esm/actions/workflows/main.yml/badge.svg)](https://github.com/younho9/generator-typescript-esm/actions/workflows/main.yml)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

> Personal TypeScript ES module scaffold generator

![screenshot](https://user-images.githubusercontent.com/48426991/146701242-4d1fa744-e715-4fe2-a896-66e35046c2a3.png)

## Install

```sh
$ npm install --global yo @younho9/generator-typescript-esm
```

## Usage

With [yo](https://github.com/yeoman/yo):

```sh
$ yo @younho9/typescript-esm
```

```sh
$ yo @younho9/typescript-esm --help

Usage:
  yo @younho9/typescript-esm:app [options]

Options:
  -h,   --help           # Print the generator's options and usage
        --skip-cache     # Do not remember prompt answers               Default: false
        --skip-install   # Do not automatically install dependencies    Default: false
        --force-install  # Fail on install dependencies error           Default: false
        --ask-answered   # Show prompts for already configured options  Default: false
        --org            # Publish to a GitHub organization account
        --husky          # Add Git hooks via husky                      Default: true
```

The `--org` option takes a string value (i.e. `--org=avajs`). All others are boolean flags and can be negated with the no prefix (i.e. `--no-husky`). You will be prompted for any options not passed on the command-line.

## LICENSE

[MIT](LICENSE)
