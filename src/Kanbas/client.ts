import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;
const axiosWithCredentials = axios.create({ withCredentials: true });
export const deleteEnrollment = async (enrollmentId: string) => {
const response = await axios.delete(`${ENROLLMENTS_API}/${enrollmentId}`);
return response.data;
};

export const getEnrollmentsForCurrentUser = async () => {
    const { data } = await axiosWithCredentials.get(`/api/users/current/enrollments`);
    return data; };


  