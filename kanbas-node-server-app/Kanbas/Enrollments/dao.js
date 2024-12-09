import Database from "../Database/index.js";
export function findAllEnrollments() {
  return Database.enrollments;
}

export function createEnrollment(enrollment) {
  const newEnrollment = { ...enrollment, _id: Date.now().toString() };
  Database.enrollments = [...Database.enrollments, newEnrollment];
  return newEnrollment;
}
export function deleteEnrollment(enrollmentId) {
  const { enrollments } = Database;
  Database.enrollments = enrollments.filter(
    (enrollment) => enrollment._id !== enrollmentId
  );
}
export function findEnrollmentsByCourseId(courseId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.course === courseId);
}
export function findEnrollmentsByUserId(userId) {
  const { enrollments } = Database;
  return enrollments.filter((enrollment) => enrollment.user === userId);
}
export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: Date.now(), user: userId, course: courseId });
}
