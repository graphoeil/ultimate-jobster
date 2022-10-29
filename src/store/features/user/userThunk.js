// Imports
import customAxiosFetch from "../../../utils/axios";
import firstLetterUpper from "../../../utils/firstLetterUpper";
import authHeader from "../../../utils/authHeader";
// Clear all values when logout
import { logoutUser, clearStore } from "./userSlice";
import { clearValues } from "../job/jobSlice";
import { clearAllJobsState } from "../allJobs/allJobsSlice";

// Thunk methods
export const registerUserThunkFn = async(user, thunkAPI) => {
	try {
		const response = await customAxiosFetch.post('/auth/register', user);
		return response.data;
	} catch (error){
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};
export const loginUserThunkFn = async(user, thunkAPI) => {
	try {
		const response = await customAxiosFetch.post('auth/login', user);
		return response.data;
	} catch (error){
		return thunkAPI.rejectWithValue(firstLetterUpper(error.response.data.msg));
	}
};
export const updateUserThunkFn = async(user, thunkAPI) => {
	try {
		const response = await customAxiosFetch.patch('/auth/updateUser', user, authHeader(thunkAPI));
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
// Clear all values when logout
export const clearStoreThunkFn = async(message, thunkAPI) => {
	try {
		// Logout user
		thunkAPI.dispatch(logoutUser());
		// Clear job input values (JobSlice.js)
		thunkAPI.dispatch(clearValues());
		// Clear all jobs values (AllJobsSlice.js)
		thunkAPI.dispatch(clearAllJobsState());
		// Return
		return Promise.resolve();
	} catch (error){
		return Promise.reject();
	}
};