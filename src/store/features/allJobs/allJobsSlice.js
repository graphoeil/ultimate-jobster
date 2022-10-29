// Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllJobsThunkFn, showStatsThunkFn } from "./allJobsThunk";

// Initial states
const initialFilterState = {
	search:'',
	searchStatus:'all',
	searchType:'all',
	sort:'latest',
	sortOptions:['latest','oldest','a-z','z-a']
};
const initialState = {
	isLoading:false,
	jobs:[],
	totalJobs:0,
	numOfPages:1,
	page:1,
	stats:{},
	monthlyApplications:[],
	...initialFilterState
};

// Async methods
// Don't forget we trigger getAllJobs in JobsContainer.js 
// by watching change of the filters in the useEffect ,-)
export const getAllJobs = createAsyncThunk('allJobs/getAllJobs', getAllJobsThunkFn);
export const showStats = createAsyncThunk('allJobs/showStats', showStatsThunkFn);

// Slice
const allJobsSlice = createSlice({
	name:'allJobs',
	initialState,
	reducers:{
		// showLoading and hideLoading, because the request
		// is in JobSlice.js but we use the isLoading of allJobsSlice,
		// then to manage here we will dispatch showLoading and hideLoading
		// from async methods in allJobsSlice ,-)
		showLoading:(state) => {
			state.isLoading = true;
		},
		hideLoading:(state) => {
			state.isLoading = false;
		},
		// Search, handle inputs change
		handleChange:(state, { payload:{ name, value } }) => {
			// We reset page to page 1 because we change filters
			state.page = 1;
			state[name] = value;
		},
		// Clear filters
		clearFilters:() => {
			return { ...initialState, ...initialFilterState };
		},
		// Change page (JobsContainer.js)
		changePage:(state, { payload }) => {
			state.page = payload;
		},
		// Clear all state and filters
		clearAllJobsState:() => {
			return initialState;
		}
	},
	extraReducers:{
		// Get all jobs
		[getAllJobs.pending]:(state) => {
			state.isLoading = true;
		},
		[getAllJobs.fulfilled]:(state, { payload:{ jobs, totalJobs, numOfPages } }) => {
			// state.isLoading = false;
			// state.jobs = jobs;
			// state.totalJobs = totalJobs;
			// state.numOfPages = numOfPages;
			// Or
			return { ...state, jobs, totalJobs, numOfPages, isLoading:false };
		},
		[getAllJobs.rejected]:(state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		// Show stats
		[showStats.pending]:(state) => {
			state.isLoading = true;
		},
		[showStats.fulfilled]:(state, { payload:{ defaultStats, monthlyApplications } }) => {
			// state.isLoading = false;
			// state.stats = payload.defaultStats;
			// state.monthlyApplications = payload.monthlyApplications;
			// Or
			return { ...state, isLoading:false, stats:defaultStats, monthlyApplications };
		},
		[showStats.rejected]:(state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
	}
});

// Actions export
export const { showLoading, hideLoading, handleChange, clearFilters, changePage, clearAllJobsState } = allJobsSlice.actions;

// Reducer export
export default allJobsSlice.reducer;