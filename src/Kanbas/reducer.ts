import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [], 
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    deleteEnrollments: (state, { payload: enrollmentId }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => e._id !== enrollmentId
      );
    },
    addEnrollments: (state, { payload: enrollment }) => {
      const newEnrollment: any = {
        _id: new Date().getTime().toString(),
        user: enrollment._id,
        course: enrollment.course._id,
      };
      console.log("Adding Enrollment:", enrollment);
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    updateEnrollments: (state, { payload: enrollment }) => {
      state.enrollments = state.enrollments.map((e: any) =>
        e._id === enrollment._id ? enrollment : e
      ) as any;
    },
  }
});

export const { setEnrollments, deleteEnrollments, updateEnrollments, addEnrollments } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
