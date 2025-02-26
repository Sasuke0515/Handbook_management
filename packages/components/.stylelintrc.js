/** @type {import('stylelint').Config} */
module.exports = {
	extends: '../../.stylelintrc.json',
	rules: {
		'declaration-property-value-disallowed-list': [
			{
				'/.*/': '/--wp-admin-theme-/',
			},
			{
				message:
					'--wp-admin-theme-* variables do not support component theming. Use Sass variables from packages/components/src/utils/theme-variables.scss instead.',
			},
		],
	},
	overrides: [
		{
			files: [ './src/utils/theme-variables.scss' ],
			rules: {
				'declaration-property-value-disallowed-list': null,
			},
		},
	],
};
