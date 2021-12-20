'use strict';
const slugify = require('@sindresorhus/slugify');
const isScoped = require('is-scoped');

exports.repoName = name => isScoped(name) ? name.split('/')[1] : name;
exports.slugifyPackageName = name => isScoped(name) ? name : slugify(name);
