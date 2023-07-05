import PaletteSelect from './palette-select'

export default function BottomBar({
	changePalette,
}: {
	changePalette: Function
}) {
	return (
		<div id="bottom-bar">
			<PaletteSelect changePalette={changePalette} />
		</div>
	)
}
