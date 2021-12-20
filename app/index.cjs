'use strict';
const Generator = require('yeoman-generator');
const normalizeUrl = require('normalize-url');
const camelCase = require('camelcase');
const is = require('@sindresorhus/is');
const utils = require('./utils.cjs');

module.exports = class extends Generator {
	constructor(...args) {
		super(...args);

		this.option('org', {
			type: String,
			description: 'Publish to a GitHub organization account',
		});

		this.option('husky', {
			type: Boolean,
			description: 'Add Git hooks via husky',
			default: true,
		});
	}

	init() {
		return this.prompt([{
			name: 'moduleName',
			message: 'What do you want to name your module?',
			default: utils.slugifyPackageName(this.appname),
			filter: x => utils.slugifyPackageName(x),
		}, {
			name: 'moduleDescription',
			message: 'What is your module description?',
			default: 'Lorem ipsum dolor sit amet',
		}, {
			name: 'githubUsername',
			message: 'What is your GitHub username?',
			store: true,
			validate: x => x.length > 0 ? true : 'You have to provide a username',
			when: () => !this.options.org,
		}, {
			name: 'website',
			message: 'What is the URL of your website?',
			store: true,
			validate: x => x.length > 0 ? true : 'You have to provide a website URL',
			filter: x => normalizeUrl(x),
		}, {
			name: 'nodePackageManager',
			message: 'Package Manager?',
			type: 'list',
			choices: ['npm', 'yarn'],
			default: 'npm',
		}, {
			name: 'commitlint',
			message: 'Do you need commitlint?',
			type: 'confirm',
			default: true,
			when: () => this.options.husky,
		}, {
			name: 'ci',
			message: 'Do you need GitHub Actions CI for commits and pull requests?',
			type: 'confirm',
			default: true,
		}, {
			name: 'vscode',
			message: 'Do you need VSCode configs?',
			type: 'confirm',
			default: true,
		}]).then(props => {
			const mv = (from, to) => {
				this.fs.move(this.destinationPath(from), this.destinationPath(to));
			};

			const repoName = utils.repoName(props.moduleName);

			const useHusky = this.options.husky;
			const useCommitlint = useHusky && props.commitlint;
			const useYarn = props.nodePackageManager === 'yarn';
			const useCi = props.ci;
			const useVscode = props.vscode;

			const tpl = {
				moduleName: props.moduleName,
				moduleDescription: props.moduleDescription,
				camelModuleName: camelCase(repoName),
				githubUsername: this.options.org || props.githubUsername,
				repoName,
				name: this.user.git.name(),
				email: this.user.git.email(),
				website: props.website,
				useHusky,
				useCommitlint,
				useCi,
				useVscode,
			};

			const filePaths = [
				`${this.templatePath()}/**`,
				useHusky || `!${this.templatePath()}/husky/**`,
				useCi || `!${this.templatePath()}/github/**`,
				useVscode || `!${this.templatePath()}/vscode/**`,
			];

			this.fs.copyTpl(filePaths.filter(filePath => is.string(filePath)), this.destinationPath(), tpl);

			if (useCi) {
				mv('github/workflows/main.yml', '.github/workflows/main.yml');
			}

			if (useHusky) {
				mv('husky/_/husky.sh', '.husky/_/husky.sh');
				mv('husky/_/gitignore', '.husky/_/.gitignore');
				mv('husky/pre-commit', '.husky/pre-commit');

				if (useCommitlint) {
					mv('husky/commit-msg', '.husky/commit-msg');
				}
			}

			if (useVscode) {
				mv('vscode/extensions.json', '.vscode/extensions.json');
				mv('vscode/settings.json', '.vscode/settings.json');
			}

			mv('editorconfig', '.editorconfig');
			mv('gitignore', '.gitignore');
			mv('npmrc', '.npmrc');
			mv('_package.json', 'package.json');

			if (useYarn) {
				this.env.options.nodePackageManager = 'yarn';
			}
		});
	}

	git() {
		this.spawnCommandSync('git', ['init']);
	}
};
