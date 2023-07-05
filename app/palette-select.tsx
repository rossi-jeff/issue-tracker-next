'use client'
import { useState } from 'react'
import { paletteNames } from '../lib/palette'

export default function PaletteSelect({
	changePalette,
}: {
	changePalette: Function
}) {
	const [palette, setPalette] = useState<string>(paletteNames[0])

	const selectChanged = (ev: any) => {
		const { value } = ev.target
		setPalette(value)
		changePalette(value)
	}
	return (
		<div id="palette-select-wrapper">
			<label htmlFor="palette-select" className="mr-1">
				Palette
			</label>
			<select
				name="palette-select"
				id="palette-select"
				defaultValue={palette}
				onChange={selectChanged}
			>
				{paletteNames.map((name, idx) => (
					<option key={idx} value={name}>
						{name}
					</option>
				))}
			</select>
		</div>
	)
}
