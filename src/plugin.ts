import PACKAGE from '@package'

BBPlugin.register(PACKAGE.name, {
	title: PACKAGE.title,
	author: PACKAGE.author.name,
	description: PACKAGE.description,
	icon: PACKAGE.icon,
	variant: PACKAGE.variant as any,
	version: PACKAGE.version,
	min_version: PACKAGE.min_blockbench_version,
	tags: PACKAGE.tags as any,
	await_loading: true,
	onload() {
		console.log(
			`%cEnvbench v${PACKAGE.version}`,
			'border: 2px solid #00aced; padding: 4px 8px; font-size: 1.2em;'
		)
		console.log('%cby ' + PACKAGE.author.name, 'font-size: 1.1em;')
	},
	onunload() {
		console.log('Envbench unloaded')
	},
	oninstall() {
		console.log('Envbench installed')
	},
	onuninstall() {
		console.log('Envbench uninstalled')
	},
})
