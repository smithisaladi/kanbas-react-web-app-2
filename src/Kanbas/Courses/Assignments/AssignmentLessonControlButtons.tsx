import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { deleteAssignment } from "./reducer";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import { useDispatch, useSelector } from "react-redux";
export default function AssignmentLessonControlButtons({
  assignmentId,
  deleteAssignment,
}: {
  assignmentId: string;
  deleteAssignment: (moduleId: string) => void;
}) {
  return (
    <div className="float-end">
      <FaTrash
        className="text-danger me-2 fs-5"
        onClick={() => deleteAssignment(assignmentId)}
      />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
