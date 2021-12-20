'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('@younho9/generator-typescript-esm:app', () => {
	describe('default', () => {
		beforeAll(() => helpers
			.run(path.join(__dirname, '../app/index.cjs'))
			.withPrompts({
				moduleName: 'my-awesome-module',
				moduleDescription: 'Lorem ipsum dolor sit amet',
				githubUsername: 'younho9',
				website: 'https://younho9.dev',
				nodePackageManager: 'yarn',
				commitlint: true,
				ci: true,
				vscode: true,
			}));

		it('creates files', () => {
			assert.file([
				'.github/workflows/main.yml',
				'.husky/_/husky.sh',
				'.husky/_/.gitignore',
				'.husky/pre-commit',
				'.husky/commit-msg',
				'.vscode/extensions.json',
				'.vscode/settings.json',
				'.editorconfig',
				'.gitignore',
				'.npmrc',
				'index.js',
				'index.d.ts',
				'index.test-d.ts',
				'LICENSE',
				'package.json',
				'README.md',
				'test.js',
			]);
		});

		it('husky field', () => {
			assert.fileContent('package.json', 'husky');
			assert.fileContent('package.json', 'commitlint');
		});

		it('README badge', () => {
			assert.fileContent('README.md', '![CI]');
			assert.fileContent('README.md', '![Conventional Commits]');
		});
	});

	describe('husky option', () => {
		beforeAll(() => helpers
			.run(path.join(__dirname, '../app/index.cjs'))
			.withOptions({husky: false})
			.withPrompts({
				moduleName: 'my-awesome-module',
				moduleDescription: 'Lorem ipsum dolor sit amet',
				githubUsername: 'younho9',
				website: 'https://younho9.dev',
				nodePackageManager: 'yarn',
				commitlint: true,
				ci: true,
				vscode: true,
			}));

		it('creates files', () => {
			assert.file([
				'.github/workflows/main.yml',
				'.vscode/extensions.json',
				'.vscode/settings.json',
				'.editorconfig',
				'.gitignore',
				'.npmrc',
				'index.js',
				'index.d.ts',
				'index.test-d.ts',
				'LICENSE',
				'package.json',
				'README.md',
				'test.js',
			]);

			assert.noFile([
				'.husky/_/husky.sh',
				'.husky/_/.gitignore',
				'.husky/pre-commit',
				'.husky/commit-msg',
			]);
		});

		it('no husky field', () => {
			assert.noFileContent('package.json', 'husky');
			assert.noFileContent('package.json', 'commitlint');
		});

		it('README badge', () => {
			assert.fileContent('README.md', '![CI]');
			assert.noFileContent('README.md', '![Conventional Commits]');
		});
	});

	describe('ci option', () => {
		beforeAll(() => helpers
			.run(path.join(__dirname, '../app/index.cjs'))
			.withPrompts({
				moduleName: 'my-awesome-module',
				moduleDescription: 'Lorem ipsum dolor sit amet',
				githubUsername: 'younho9',
				website: 'https://younho9.dev',
				nodePackageManager: 'yarn',
				commitlint: true,
				ci: false,
				vscode: true,
			}));

		it('creates files', () => {
			assert.file([
				'.husky/_/husky.sh',
				'.husky/_/.gitignore',
				'.husky/pre-commit',
				'.husky/commit-msg',
				'.vscode/extensions.json',
				'.vscode/settings.json',
				'.editorconfig',
				'.gitignore',
				'.npmrc',
				'index.js',
				'index.d.ts',
				'index.test-d.ts',
				'LICENSE',
				'package.json',
				'README.md',
				'test.js',
			]);

			assert.noFile([
				'.github/workflows/main.yml',
			]);
		});

		it('README badge', () => {
			assert.noFileContent('README.md', '![CI]');
			assert.fileContent('README.md', '![Conventional Commits]');
		});
	});

	describe('vscode option', () => {
		beforeAll(() => helpers
			.run(path.join(__dirname, '../app/index.cjs'))
			.withPrompts({
				moduleName: 'my-awesome-module',
				moduleDescription: 'Lorem ipsum dolor sit amet',
				githubUsername: 'younho9',
				website: 'https://younho9.dev',
				nodePackageManager: 'yarn',
				commitlint: true,
				ci: true,
				vscode: false,
			}));

		it('creates files', () => {
			assert.file([
				'.github/workflows/main.yml',
				'.husky/_/husky.sh',
				'.husky/_/.gitignore',
				'.husky/pre-commit',
				'.husky/commit-msg',
				'.editorconfig',
				'.gitignore',
				'.npmrc',
				'index.js',
				'index.d.ts',
				'index.test-d.ts',
				'LICENSE',
				'package.json',
				'README.md',
				'test.js',
			]);

			assert.noFile([
				'.vscode/extensions.json',
				'.vscode/settings.json',
			]);
		});

		it('README badge', () => {
			assert.fileContent('README.md', '![CI]');
			assert.fileContent('README.md', '![Conventional Commits]');
		});
	});
});
