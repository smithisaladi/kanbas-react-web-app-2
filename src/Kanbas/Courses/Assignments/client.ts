import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENT_API = `${REMOTE_SERVER}/api/assignment`;
export const updateAssignment = async (assignment: any) => {
    const { data } = await axios.put(`${ASSIGNMENT_API}/${assignment._id}`, assignment);
    return data;
  };  
export const deleteAssignment = async (assignmentId: string) => {
 const response = await axios.delete(`${ASSIGNMENT_API}/${assignmentId}`);
 return response.data;
};
