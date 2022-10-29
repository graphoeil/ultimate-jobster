// Imports
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { handleChange, clearFilters } from "../store/features/allJobs/allJobsSlice";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "./";

// Component
const SearchContainer = () => {

	// Stores
	const { isLoading, searchStatus, searchType, 
		sort, sortOptions } = useSelector((store) => { return store.allJobs; });
	const { statusOptions, jobTypeOptions } = useSelector((store) => { return store.job; });

	// Dispatch
	const dispatch = useDispatch();

	// Search change
	const [searchValue, setSearchValue] = useState('');
	useEffect(() => {
		// Search with debouncing
		const timer = setTimeout(() => {
			// Send to allJobsSlice.js
			dispatch(handleChange({ name:'search', value:searchValue }));
		}, 250);
		return () => {
			clearTimeout(timer);
		};
	},[searchValue, dispatch]);

	// Autofocus on first input (search)
	const searchRef = useRef();
	useEffect(() => {
		searchRef.current.focus();
	},[]);

	// Select change
	const handleSearch = (e) => {
		if (isLoading){ return; }
		dispatch(handleChange({ name:e.target.name, value:e.target.value }));
	};

	// Submit form
	const submitForm = (e) => {
		e.preventDefault();
		// As we reset all allJobsSlice.js state, we must watch any change
		// in search, searchStatus, searchType, sort and then 
		// dispatch a new getAllJobs in JobsContainer.js
		// otherwise, the page will show "No jobs to display..."
		dispatch(clearFilters());
		setSearchValue('');
	};

    // Return
    return(
        <Wrapper>
			<form className="form" onSubmit={ submitForm }>
				<h4>Job search</h4>
				<div className="form-center">

					{/* Search position */}
					<FormRow type="text" name="search" labelText="position" ref={ searchRef }  value={ searchValue } 
						handleChange={ (e) => { setSearchValue(e.target.value); } }/>
					{/* Search position */}

					{/* Search status */}
					<FormRowSelect labelText="Job status" name="searchStatus" value={ searchStatus } 
						handleChange={ handleSearch } options={ ['all', ...statusOptions] }/>
					{/* Search status */}

					{/* Search type */}
					<FormRowSelect labelText="Job type" name="searchType" value={ searchType } 
						handleChange={ handleSearch } options={ ['all', ...jobTypeOptions] }/>
					{/* Search type */}

					{/* Sort */}
					<FormRowSelect labelText="Sort by" name="sort" value={ sort } 
						handleChange={ handleSearch } options={ sortOptions }/>
					{/* Sort */}

					{/* Clear btn */}
					<button type="submit" className="btn btn-block btn-danger" disabled={ isLoading }>
						Clear
					</button>

				</div>
			</form>
        </Wrapper>
    );
    
};

// Export
export default SearchContainer;