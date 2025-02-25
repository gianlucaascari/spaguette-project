module.exports = {
	globDirectory: 'app/',
	globPatterns: [
		'**/*.tsx'
	],
	swDest: 'app/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};