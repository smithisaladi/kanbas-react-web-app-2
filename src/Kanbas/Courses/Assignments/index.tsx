import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentListControls from "./AssignmentListControls";
import AssignmentControls from "./AssignmentControls";
import { useParams } from "react-router";
import * as db from "../../Database";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AssignmentLessonControlButtons from "./AssignmentLessonControlButtons";
import { setAssignments, deleteAssignment, addAssignment } from "./reducer";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import { useEffect } from "react";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = useSelector(
    (state: any) => state.assignmentReducer.assignments
  );
  const courseAssignments = assignments.filter(
    (assignment: any) => assignment.course === cid
  );
  const dispatch = useDispatch();

  const fetchAssignments = async () => {
    const modules = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(modules));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);

  const removeAssignment = async (assignmentId: string) => {
    await assignmentsClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "N/A";
    const dateObj = typeof date === "string" ? new Date(date) : date;

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[dateObj.getMonth()];
    const day =
      dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <div id="wd-assignments" style={{ padding: "20px" }}>
      {currentUser.role === "FACULTY" && <AssignmentControls />}
      <br />
      <br />

      <div
        className="wd-assignments-title p-3 ps-2 bg-secondary"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <BsGripVertical className="me-2 fs-3" />
          <IoMdArrowDropdown />
          <b>ASSIGNMENTS</b>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "auto",
          }}
        >
          <span className="border border-dark rounded p-1">40% of Total</span>
          {currentUser.role === "FACULTY" && <AssignmentControlButtons />}
        </div>
      </div>
      <ul id="wd-assignments-list" className="list-group rounded-0">
        {courseAssignments.map((assignment: any, index: any) => (
          <li
            key={index}
            className="wd-assignment-list-item list-group-item p-3 ps-1 border-bottom"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {currentUser.role === "FACULTY" && <AssignmentListControls />}
            <div
              style={{
                flexGrow: 1,
                paddingLeft: "2%",
                paddingRight: "2%",
                textAlign: "left",
              }}
            >
              {currentUser.role === "FACULTY" ? (
                <Link
                  className="wd-assignment-link"
                  to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                >
                  {assignment.title} <br />
                </Link>
              ) : (
                <span className="wd-assignment-title">
                  {assignment.title} <br />
                </span>
              )}
              <span className="text-danger">Multiple Modules</span> |{" "}
              <b>Available from</b>{" "}
              {formatDate(assignment.availableFromDate) || "N/A"} | <b>Until</b>{" "}
              {formatDate(assignment.availableUntilDate) || "N/A"} | <br />
              <b>Due</b> {formatDate(assignment.dueDate) || "N/A"} |{" "}
              {assignment.points || 0} pts
            </div>
            {currentUser.role === "FACULTY" && (
              <AssignmentLessonControlButtons
                assignmentId={assignment._id}
                deleteAssignment={removeAssignment}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
