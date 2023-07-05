import { FiLoader } from "react-icons/fi";
export default function LoadingIndicator() {
  return (
    <div className="modal-overlay open" id="loading-indicator">
      <div id="loading-dialog">
        <FiLoader size="8em" className="animate-spin" />
        <h2 className="animate-bounce">Loading...</h2>
      </div>
    </div>
  );
}
