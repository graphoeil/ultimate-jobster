// Imports
import customAxiosFetch from "../../../utils/axios";
import firstLetterUpper from "../../../utils/firstLetterUpper";
import authHeader from "../../../utils/authHeader";
import { clearStore } from "../user/userSlice";

// Thunk methods
export const getAllJobsThunkFn = async(_, thunkAPI) => {
	// Get state variables inside async methods with getState()
	const { search, searchStatus, searchType, sort, page } = thunkAPI.getState().allJobs;
	let url = `/jobs?status=${ searchStatus }&jobType=${ searchType }&sort=${ sort }&page=${ page }`;
	if (search){
		// Because sometimes when search is empty the request add %27%27
		// like this => &search=%27%27
		url = url + `&search=${ search }`;
	}
	try {
		const response = await customAxiosFetch.get(url, authHeader(thunkAPI));
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
export const showStatsThunkFn = async(_, thunkAPI) => {
	try {
		const response = await customAxiosFetch.get('/jobs/stats', authHeader(thunkAPI));
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