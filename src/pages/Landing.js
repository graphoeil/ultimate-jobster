// Imports
import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components/";
import jobHunt from "../assets/images/jobHunt.svg";

// Component
const Landing = () => {

	// Return
	return(
		<Wrapper>
			<nav>
				<Logo/>
			</nav>
			<div className="container page">

				{/* Info */}
				<div className="info">
					<h1>Job <span>tracking</span> app</h1>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
						Excepturi itaque ipsam impedit odio ducimus, vitae distinctio 
						quaerat omnis reiciendis doloremque ?</p>
					<Link to="/register" className="btn btn-hero">Login / Register</Link>
				</div>
				{/* Info */}

				{/* Main image, it's a 2 column layout */}
				<img src={ jobHunt } alt="Job hunt" className="img main-img" />
				{/* Main image */}

			</div>
		</Wrapper>
	);

};

// Export
export default Landing;