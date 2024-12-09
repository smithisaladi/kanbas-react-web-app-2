import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addAssignment,
  updateAssignment,
  editAssignment,
  deleteAssignment,
} from "./reducer";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as assignmentsClient from "./client";
import * as coursesClient from "../client";

export default function AssignmentEditor({
  dialogTitle,
  assignmentTitle = "",
  assignmentDescription = "",
  assignmentPoints = 100,
  assignmentDueDate = "",
  assignmentAvailableFromDate = "",
  assignmentAvailableUntilDate = "",
  isEdit = false,
}: {
  dialogTitle: string;
  assignmentTitle?: string;
  assignmentDescription?: string;
  assignmentPoints?: number;
  assignmentDueDate?: string;
  assignmentAvailableFromDate?: string;
  assignmentAvailableUntilDate?: string;
  isEdit?: boolean;
}) {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const assignments = useSelector(
    (state: any) => state.assignmentReducer.assignments
  );
  const assignmentToEdit = isEdit
    ? assignments.find((assignment: any) => assignment._id === aid)
    : null;

  const [title, setTitle] = useState(assignmentTitle);
  const [description, setDescription] = useState(assignmentDescription);
  const [points, setPoints] = useState(assignmentPoints);
  const [dueDate, setDueDate] = useState(assignmentDueDate);
  const [availableFrom, setAvailableFrom] = useState(
    assignmentAvailableFromDate
  );
  const [availableUntil, setAvailableUntil] = useState(
    assignmentAvailableUntilDate
  );

  useEffect(() => {
    if (isEdit && assignmentToEdit) {
      setTitle(assignmentToEdit.title || "");
      setDescription(assignmentToEdit.description || "");
      setPoints(assignmentToEdit.points || 100);
      setDueDate(assignmentToEdit.dueDate || "");
      setAvailableFrom(assignmentToEdit.availableFromDate || "");
      setAvailableUntil(assignmentToEdit.availableUntilDate || "");
    }
  }, [assignmentToEdit, isEdit]);

  const generateUniqueId = () => Date.now().toString();

  const createAssignmentForCourse = async () => {
    if (!cid) return;
    const newAssignment = {
      _id: Date.now().toString(),
      title,
      description,
      points,
      dueDate,
      availableFromDate: availableFrom,
      availableUntilDate: availableUntil,
      course: cid,
    };
    const assignment = await coursesClient.createAssignmentForCourse(
      cid,
      newAssignment
    );
    dispatch(addAssignment(assignment));
  };
  const saveAssignment = async (assignment: any) => {
    await assignmentsClient.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

  const handleSave = () => {
    const assignmentData = {
      _id: aid || generateUniqueId(),
      title,
      description,
      points,
      dueDate,
      availableFromDate: availableFrom,
      availableUntilDate: availableUntil,
      course: cid,
    };
    if (isEdit) {
      saveAssignment(assignmentData);
    } else {
      createAssignmentForCourse();
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{dialogTitle}</h1>
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">
          Assignment Name
        </label>
        <input
          id="wd-name"
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label">
          Description
        </label>
        <textarea
          id="wd-description"
          className="form-control"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="row mb-3">
        <div className="col-sm-2 text-end align-middle">
          <label htmlFor="wd-points" className="form-label">
            Points
          </label>
        </div>
        <div className="col-sm-10">
          <input
            id="wd-points"
            type="number"
            className="form-control"
            value={points}
            onChange={(e) => setPoints(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-2 text-end align-middle">
          <label htmlFor="wd-assign-to" className="form-label">
            Assign
          </label>
        </div>
        <div className="col-sm-10">
          <div className="form-control p-3">
            <b>Due</b>
            <label htmlFor="wd-due-date" className="form-label"></label>
            <input
              type="date"
              id="wd-due-date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <br />
            <div className="row">
              <div className="col-sm-6">
                <label
                  htmlFor="wd-available-from"
                  className="form-label"
                  style={{ marginRight: "10px" }}
                >
                  <b>Available from</b>
                </label>
                <input
                  type="date"
                  id="wd-available-from"
                  className="form-control"
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                />
              </div>
              <div className="col-sm-6">
                <label
                  htmlFor="wd-available-until"
                  className="form-label"
                  style={{ marginRight: "10px" }}
                >
                  <b>Until</b>
                </label>
                <input
                  type="date"
                  id="wd-available-until"
                  className="form-control"
                  value={availableUntil}
                  onChange={(e) => setAvailableUntil(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments`)}
        >
          Cancel
        </button>
        <button type="button" className="btn btn-danger" onClick={handleSave}>
          {isEdit ? "Save" : "Save"}
        </button>
      </div>
    </div>
  );
}
