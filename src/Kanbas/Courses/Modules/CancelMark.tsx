import { TiCancel } from "react-icons/ti";
import { FaCircle } from "react-icons/fa";
export default function CancelMark() {
  return (
    <span className="me-1 position-relative">
      <TiCancel
        style={{ top: "2px" }}
        className="text-secondary me-1 position-absolute fs-5"
      />
      <FaCircle className="text-white me-1 fs-6" />
    </span>
  );
}
