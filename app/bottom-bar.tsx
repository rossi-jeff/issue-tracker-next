import { FiList } from "react-icons/fi";
import PaletteSelect from "./palette-select";

export default function BottomBar({
  changePalette,
}: {
  changePalette: Function;
}) {
  return (
    <div id="bottom-bar">
      <div className="flex flex-wrap justify-between">
        <div className="flex">
          <h2>Issue</h2>
          <span className="mx-2 mt-1">
            <FiList size="1.2em" />
          </span>
          <h2>Tracker</h2>
        </div>
        <div>
          Constucted by <strong>Jeff Rossi</strong> &lt;
          <a href="mailto:inquiries@jeff-rossi.com">inquiries@jeff-rossi.com</a>
          &gt;
        </div>
        <PaletteSelect changePalette={changePalette} />
      </div>
    </div>
  );
}
