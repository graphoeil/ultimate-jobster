// Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addUserToLocalStorage, removeUserFromLocalStorage, getUserFromLocalStorage } from "../../../utils/localStorage";
import { registerUserThunkFn, loginUserThunkFn, updateUserThunkFn, clearStoreThunkFn } from "./userThunk";

// Initial state
const initialState = {
	isLoading:false,
	isSidebarOpen:false,
	user:getUserFromLocalStorage()
};

/* HTTP Methods
GET - Get resources from the server
POST - Submit resource to the server
PUT / PATCH - Modify resource on the server
PUT, replaces the data with that which is sent in the request.
PATCH, allows the partial modification of a resource by merging the data sent with the data already present or through the use of modification operations.
DELETE - Delete resource from the server */

// Async methods
export const registerUser = createAsyncThunk('user/registerUser', registerUserThunkFn);
export const loginUser = createAsyncThunk('user/loginUser', loginUserThunkFn);
export const updateUser = createAsyncThunk('user/updateUser', updateUserThunkFn);
export const clearStore = createAsyncThunk('user/clearStore', clearStoreThunkFn);

// Slice
const userSlice = createSlice({
	name:'user',
	initialState,
	reducers:{
		// Toggle sidebar
		toggleSidebar:(state) => {
			state.isSidebarOpen = !state.isSidebarOpen;
		},
		// Logout
		logoutUser:(state, { payload }) => {
			state.user = null;
			state.isSidebarOpen = false;
			removeUserFromLocalStorage();
			if (payload){
				toast.success(payload);
			}
		}
	},
	extraReducers:{
		// Register user
		[registerUser.pending]:(state) => {
			state.isLoading = true;
		},
		[registerUser.fulfilled]:(state, { payload:{ user } }) => {
			state.isLoading = false;
			state.user = user;
			addUserToLocalStorage(user);
			toast.success(`Hello there ${ user.name }`);
		},
		[registerUser.rejected]:(state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		// Login user
		[loginUser.pending]:(state) => {
			state.isLoading = true;
		},
		[loginUser.fulfilled]:(state, { payload:{ user } }) => {
			state.isLoading = false;
			state.user = user;
			addUserToLocalStorage(user);
			toast.success(`Welcome back ${ user.name }`);
		},
		[loginUser.rejected]:(state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		// Update user
		[updateUser.pending]:(state) => {
			state.isLoading = true;
		},
		[updateUser.fulfilled]:(state, { payload:{ user } }) => {
			state.isLoading = false;
			state.user = user;
			addUserToLocalStorage(user);
			toast.success('User updated !');
		},
		[updateUser.rejected]:(state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		// Clear store
		[clearStore.rejected]:() => {
			toast.error('There was an error...');
		}
	}
});

// Actions export
export const { toggleSidebar, logoutUser } = userSlice.actions;

// Reducer export
export default userSlice.reducer;