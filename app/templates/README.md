# <%= repoName %>

<%_ if (useCi) { -%>
[![CI](https://github.com/<%= githubUsername %>/<%= repoName %>/actions/workflows/main.yml/badge.svg)](https://github.com/<%= githubUsername %>/<%= repoName %>/actions/workflows/main.yml)
<%_ } -%>
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
<%_ if (useHusky && useCommitlint) { -%>
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
<%_ } -%>

> <%= moduleDescription %>

## Install

```sh
$ npm install <%= moduleName %>
```

## Usage

```ts
import <%= camelModuleName %> from '<%= moduleName %>';

<%= camelModuleName %>('<%= githubUsername %>');
//=> 'Hello <%= githubUsername %>'
```

## LICENSE

[MIT](LICENSE)
