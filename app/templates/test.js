import test from 'ava';
import <%= camelModuleName %> from './index.js';

test('<%= camelModuleName %>()', t => {
	t.is(<%= camelModuleName %>('<%= githubUsername %>'), 'Hello <%= githubUsername %>');
});
