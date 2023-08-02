// Imports
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleChange, clearValues, createJob, editJob } from "../../store/features/job/jobSlice";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../../components/";
import { toast } from "react-toastify";

// Component
const AddJob = () => {

	// Store
	const { isLoading, position, company, jobLocation, 
		jobType, jobTypeOptions, status, statusOptions, 
		isEditing, editJobId } = useSelector((store) => { return store.job; });
	const { user } = useSelector((store) => { return store.user; });

	// Dispatch
	const dispatch = useDispatch();
	
	// If the user changes his city of residence (Profile.js),
	// and then come to addJob we must update to have the new value
	// First input (position) autofocus
	useEffect(() => {
		// Only for creating a job
		if (!isEditing){
			positionRef.current.focus();
			dispatch(handleChange({ name:'jobLocation', value:user.location }));
		}
	},[dispatch, isEditing, user]);

	// Inputs change
	const handleJobInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		dispatch(handleChange({ name, value }));
	};

	// Submit form
	const navigate = useNavigate();
	const submitForm = (e) => {
		e.preventDefault();
		if (!position || !company || !jobLocation){
			toast.error('Please fill out all fields !');
			return;
		}
		// Send for jobSlice.js
		if (!isEditing){
			dispatch(createJob({ position, company, jobLocation, status, jobType }));
		} else {
			dispatch(editJob({ jobId:editJobId, job:{ position, company, jobLocation, jobType, status } }));
		}
		// Navigate to all-jobs
		navigate('/all-jobs');
	};

    // Return
    return(
        <Wrapper>
			<form className="form" onSubmit={ submitForm }>
				<h3>{ isEditing ? 'Edit job' : 'Add job' }</h3>
				<div className="form-center">

					{/* Position */}
					<FormRow ref={ positionRef } type="text" name="position" 
						value={ position } handleChange={ handleJobInput }/>
					{/* Position */}

					{/* Company */}
					<FormRow type="text" name="company" 
						value={ company } handleChange={ handleJobInput }/>
					{/* Company */}

					{/* Job location */}
					<FormRow type="text" name="jobLocation" labelText="Job location"
						value={ jobLocation } handleChange={ handleJobInput }/>
					{/* Job location */}

					{/* Status */}
					<FormRowSelect name="status" labelText="Job status" options={ statusOptions } 
						value={ status } handleChange={ handleJobInput }/>
					{/* Status */}

					{/* Job type */}
					<FormRowSelect name="jobType" labelText="Job type" options={ jobTypeOptions } 
						value={ jobType } handleChange={ handleJobInput }/>
					{/* Job type */}

					{/* Buttons */}
					<div className="btn-container">
						<button type="button" className="btn btn-block clear-btn" onClick={ () => { dispatch(clearValues()); } }>
							Clear
						</button>
						<button type="submit" className="btn btn-block submit-btn" disabled={ isLoading }>
							Submit
						</button>
					</div>
					{/* Buttons */}

				</div>
			</form>
        </Wrapper>
    );
    
};

// Export
export default AddJob;