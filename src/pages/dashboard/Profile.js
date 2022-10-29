// Imports
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../store/features/user/userSlice";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow } from "../../components/";

// Component
const Profile = () => {

	// Store
	const { isLoading, user } = useSelector((store) => { return store.user; });

	// Dispatch
	const dispatch = useDispatch();

	// First input (name) autofocus
	const nameRef = useRef();
	useEffect(() => {
		nameRef.current.focus();
	},[]);

	// User data
	const [userData, setUserData] = useState({
		name:user.name || '',
		email:user.email || '',
		lastName:user.lastName || '',
		location:user.location || ''
	});
	const { name, email, lastName, location } = userData;

	// Inputs change
	const handleChange = (e) => {
		setUserData((oldState) => {
			return { ...oldState, [e.target.name]:e.target.value };
		});
	};

	// Submit form
	const submitForm = (e) => {
		e.preventDefault();
		if (!name || !email || !lastName || !location){
			toast.error('Please fill out all fields !');
			return;
		}
		dispatch(updateUser(userData));
		// or dispatch(updateUser({ name, email, lastName, location }));
	};

    // Return
    return(
        <Wrapper>
			<form className="form" onSubmit={ submitForm }>
				<h3>Profile</h3>
				<div className="form-center">

					{/* First name */}
					<FormRow ref={ nameRef } type="text" name="name" labelText="First name"
						value={ name } handleChange={ handleChange }/>
					{/* First name */}

					{/* Last name */}
					<FormRow type="lastName" name="lastName" labelText="Last name"
						value={ lastName } handleChange={ handleChange }/>
					{/* Last name */}

					{/* Email */}
					<FormRow type="email" name="email" disabled
						value={ email } handleChange={ handleChange }/>
					{/* Email */}

					{/* Location */}
					<FormRow type="location" name="location" 
						value={ location } handleChange={ handleChange }/>
					{/* Location */}

					{/* Submit btn */}
					<button type="submit" className="btn btn-block" disabled={ isLoading }>
						{ isLoading ? 'Please wait...' : 'Save changes' }
					</button>
					{/* Submit btn */}

				</div>
			</form>
        </Wrapper>
    );
    
};

// Export
export default Profile;