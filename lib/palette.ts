export type PaletteType = {
	light: string
	dark: string
	altLight: string
	altDark: string
	accent: string
}

// from https://www.color-hex.com/color-palettes/

export const palettes: { [key: string]: PaletteType } = {
	'Wellington-Point': {
		light: '#b3daf9',
		dark: '#104f85',
		altLight: '#e1bea0',
		altDark: '#73504a',
		accent: '#307ec9',
	},
	'Beach-App': {
		light: '#f7f6f0',
		dark: '#629ec5',
		altLight: '#e4f4f7',
		altDark: '#bfa48f',
		accent: '#f68d6b',
	},
	'Blackberry-Place': {
		light: '#ffdd74',
		dark: '#160f2a',
		altLight: '#b2d7a2',
		altDark: '#13414a',
		accent: '#6c542d',
	},
	'Winter-Deep-Ocean': {
		light: '#dad9d1',
		dark: '#01122e',
		altLight: '#a5b3b6',
		altDark: '#002936',
		accent: '#00394c',
	},
	'Simply-Stay-Home': {
		light: '#f5e1ce',
		dark: '#000000',
		altLight: '#a6807e',
		altDark: '#614a3a',
		accent: '#687766',
	},
	'Ferny-Floor': {
		light: '#d7dea6',
		dark: '#1f220d',
		altLight: '#829e46',
		altDark: '#3b4a14',
		accent: '#687f13',
	},
	'San-Francisco-Bloom': {
		light: '#eeecde',
		dark: '#252627',
		altLight: '#fae8e8',
		altDark: '#50301d',
		accent: '#eebaae',
	},
	'Bullet-Train': {
		light: '#e1e4e5',
		dark: '#081b1a',
		altLight: '#f0ae54',
		altDark: '#365658',
		accent: '#d2402c',
	},
	/*
	'': {
		light: '',
		dark: '',
		altLight: '',
		altDark: '',
		accent: ''
	}
	*/
}

export const paletteNames = Object.keys(palettes)
