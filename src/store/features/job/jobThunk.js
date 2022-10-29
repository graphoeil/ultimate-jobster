// Imports
import customAxiosFetch from "../../../utils/axios";
import firstLetterUpper from "../../../utils/firstLetterUpper";
import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
import { clearValues } from "./jobSlice";
import { clearStore } from "../user/userSlice";
import authHeader from "../../../utils/authHeader";

// Thunk methods
export const createJobThunkFn = async(job, thunkAPI) => {
	try {
		const response = await customAxiosFetch.post('/jobs', job, authHeader(thunkAPI));
		thunkAPI.dispatch(clearValues());
		return response.data;
	} catch (error){
		if (error.response.status === 401){
			// Logout the user if rejected because the user don't have valid 
			// credentials and have nothing to do here !
			thunkAPI.dispatch(clearStore());
			return thunkAPI.rejectWithValue('Unauthorized ! Logging out...');
		}
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};
export const deleteJobThunkFn = async(jobId, thunkAPI) => {
	thunkAPI.dispatch(showLoading());
	try {
		const response = await customAxiosFetch.delete(`/jobs/${ jobId }`, authHeader(thunkAPI));
		// No need to hideLoading it's included in the extraReducer of getAllJobs
		thunkAPI.dispatch(getAllJobs());
		return response.data;
	} catch (error){
		thunkAPI.dispatch(hideLoading());
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};
export const editJobThunkFn = async({ jobId, job }, thunkAPI) => {
	try {
		const response = await customAxiosFetch.patch(`/jobs/${ jobId }`, job, authHeader(thunkAPI));
		thunkAPI.dispatch(getAllJobs());
		return response.data;
	} catch (error){
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};