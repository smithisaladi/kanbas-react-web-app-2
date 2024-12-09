import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as userClient from "./Account/client";
import * as coursesClient from "./Courses/client";
import * as enrollmentClient from "./client";
import { addEnrollments, deleteEnrollments, setEnrollments } from "./reducer";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector(
    (state: any) => state.enrollmentReducer.enrollments || []
  );
  const dispatch = useDispatch();
  const cid = useParams();

  const [showAllCourses, setShowAllCourses] = useState(false);

  const toggleEnrollmentView = () => {
    setShowAllCourses(!showAllCourses);
  };

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const userEnrollments = await userClient.getEnrollmentsForCurrentUser();
        dispatch(setEnrollments(userEnrollments));
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      }
    };

    if (currentUser) {
      fetchEnrollments();
    }
  }, [currentUser, dispatch]);

  const addNewEnrollment = async (course: any) => {
    const enrollment = {
      _id: Date.now().toString(),
      user: currentUser._id,
      course: course._id,
    };
    try {
      console.log("Creating enrollment:", enrollment);
      const newEnrollment = await userClient.createEnrollment(enrollment);
      console.log("New enrollment created:", newEnrollment);

      dispatch(setEnrollments([...enrollments, newEnrollment]));
    } catch (error) {
      console.error("Error adding new enrollment:", error);
    }
  };

  const removeEnrollment = async (courseId: string) => {
    const enrollmentToRemove = enrollments.find(
      (enrollment: any) => enrollment.course === courseId
    );
    if (enrollmentToRemove) {
      await enrollmentClient.deleteEnrollment(enrollmentToRemove._id);
      dispatch(deleteEnrollments(enrollmentToRemove._id));
    }
  };

  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (enrollment: any) => enrollment.course === courseId
    );
  };

  useEffect(() => {
    console.log("Enrollments updated:", enrollments);
  }, [enrollments]);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <button
          onClick={() => setEnrolling(!enrolling)}
          className="float-end btn btn-primary"
        >
          {enrolling ? "My Courses" : "All Courses"}
        </button>
      </h1>
      <hr />
      {currentUser.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
            >
              Update
            </button>
          </h5>
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}
      {currentUser.role === "STUDENT" && (
        <button
          className="btn btn-primary float-end"
          onClick={toggleEnrollmentView}
        >
          {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
        </button>
      )}

      <h2>
        {showAllCourses ? "Published Courses" : "Published Courses"} (
        {courses.length})
      </h2>
      <hr />

      <div className="row row-cols-1 row-cols-md-5 g-4">
        {courses.map((course) => (
          <div key={course._id} className="col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                to={
                  //currentUser.role === "FACULTY" || isEnrolled(course._id)
                  `/Kanbas/Courses/${course._id}/Home`
                }
                className="text-decoration-none text-dark"
              >
                <img
                  src="/images/full-stack-developer.jpg"
                  width="100%"
                  height={160}
                  alt="course"
                />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">
                    {enrolling && (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          updateEnrollment(course._id, !course.enrolled);
                        }}
                        className={`btn ${
                          course.enrolled ? "btn-danger" : "btn-success"
                        } float-end`}
                      >
                        {course.enrolled ? "Unenroll" : "Enroll"}
                      </button>
                    )}
                    {course.name}
                  </h5>
                  <p
                    className="card-text overflow-y-hidden"
                    style={{ maxHeight: 100 }}
                  >
                    {course.description}
                  </p>
                  {currentUser.role === "STUDENT" && (
                    <div>
                      {isEnrolled(course._id) ? (
                        <button
                          className="btn btn-danger"
                          onClick={(e) => {
                            e.preventDefault();
                            removeEnrollment(course._id);
                          }}
                        >
                          Unenroll
                        </button>
                      ) : (
                        <button
                          className="btn btn-success"
                          onClick={(e) => {
                            e.preventDefault();
                            addNewEnrollment(course);
                          }}
                        >
                          Enroll
                        </button>
                      )}
                    </div>
                  )}
                  {currentUser.role === "FACULTY" && (
                    <>
                      <button
                        className="btn btn-danger float-end"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteCourse(course._id);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-warning float-end me-2"
                        onClick={(e) => {
                          e.preventDefault();
                          setCourse(course);
                        }}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
