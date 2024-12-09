import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentControls() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();
  const { cid } = useParams();

  const handleAddAssignment = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments/New`); // Navigate to the editor for a new assignment
  };

  return (
    <div id="wd-assignment-controls">
      <button
        id="wd-add-assignment-group"
        className="btn btn-lg btn-danger me-1 float-end"
        onClick={handleAddAssignment}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </button>
      <button
        id="wd-add-assignment"
        className="btn btn-lg btn-secondary me-1 float-end"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </button>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: "25%",
        }}
      >
        <CiSearch style={{ position: "absolute", left: "10px" }} />
        <input
          id="wd-search-assignment"
          placeholder="Search..."
          className="form-control"
          style={{ paddingLeft: "40px" }}
        />
      </div>
    </div>
  );
}
