import { BsGripVertical } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
export default function AssignmentListControls() {
  return (
    <span className="me-1 position-relative">
      <BsGripVertical />
      <MdAssignment className="text-success" />
    </span>
  );
}
