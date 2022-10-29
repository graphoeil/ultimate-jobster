// Imports
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, loginUser } from "../store/features/user/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPage";
import { FormRow, Logo } from "../components/";

// Global state
const initialState = {
	name:'',
	email:'',
	password:'',
	isMember:true
};

// Component
const Register = () => {

	// Dispatch
	const dispatch = useDispatch();

	// Store
	const { isLoading, user } = useSelector((store) => { return store.user; });

	// Autofocus on first input
	const nameRef = useRef();
	const emailRef = useRef();
	useEffect(() => {
		emailRef.current.focus();
	},[]);

	// State
	const [values, setValues] = useState(initialState);
	const { name, email, password, isMember } = values;

	// Redirect to dashboard if already connected
	const navigate = useNavigate();
	useEffect(() => {
		if (user){
			setTimeout(() => {
				navigate('/');
			}, 1000);
		}
	},[user, navigate]);

	// Input change
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setValues((oldState) => {
			return {
				...oldState, [name]:value
			};
		});
	};

	// Submit form
	const submitForm = (e) => {
		e.preventDefault();
		if (!email || !password || (!isMember && !name)){
			toast.error('Please fill out all fields !', {
				autoClose:1777
			});
			return;
		}
		if (isMember){
			dispatch(loginUser({ email, password }));
			return;
		}
		dispatch(registerUser({ name, email, password }));
	};

	// Demo
	const showDemo = () => {
		dispatch(loginUser({ email:'testUser@test.com', password:'secret' }));
	};

	// Toggle member, login / register
	const toggleMember = () => {
		setValues((oldState) => {
			return {
				...oldState, isMember:!isMember
			};
		});
		// Reset autofocus, setTimeout => because it's asynchronous ,-)
		setTimeout(() => {
			if (!isMember){
				emailRef.current.focus();
			} else {
				nameRef.current.focus();
			}
		}, 10);
	};

	// Return
	return(
		<Wrapper className="full-page">
			<form className="form" onSubmit={ submitForm }>

				{/* Header */}
				<Logo/>
				<h3>{ isMember ? 'Login' : 'Register' }</h3>
				{/* Header */}

				{/* Name */}
				{
					!isMember && <FormRow ref={ nameRef } type="text" name="name" 
					value={ name } handleChange={ handleChange }/>
				}
				{/* Name */}

				{/* Email */}
				<FormRow type="email" name="email" ref={ emailRef } 
					value={ email } handleChange={ handleChange }/>
				{/* Email */}

				{/* Password */}
				<FormRow type="password" name="password" 
					value={ password } handleChange={ handleChange }/>
				{/* Password */}

				{/* Buttons */}
				{/* Disabled also if user, because of the timeout to redirect to dashboard, 
				which allows to click for one second after the login or register is fullfilled 
				which resets isLoading to false ,-) */}
				<button disabled={ isLoading || user } type="submit" className="btn btn-block">
					{ isLoading ? 'Loading...' : 'Submit' }
				</button>
				<button disabled={ isLoading } type="button" className="btn btn-block btn-hipster" onClick={ showDemo }>
					Demo
				</button>
				<p>
					{ isMember ? 'Not a member yet ?' : 'Already a member ?' }
					<button type="button" onClick={ toggleMember } className="member-btn">
						{ isMember ? 'Register' : 'Login' }
					</button>
				</p>
				{/* Buttons */}

			</form>
		</Wrapper>
	);
	
};

// Export
export default Register;