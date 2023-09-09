import React, { useState } from 'react';
import './SignUpForm.css';  // You can style this similarly to SignUpForm

interface SignInFormProps {
    switchToSignUp: () => void;
    onUserData: (user: any) => void;
}

const SignInForm: React.FC<SignInFormProps> = (props) => {

    const API = 'http://localhost:5000/auth/login'; // use this for local development
    // const API = 'http://backend:5000/auth/login'; 

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (data.success) {
                props.onUserData(data.user);  // Pass user data to parent
            }

            console.log(data);

            if (!response.ok) {
                // Handle error - you might want to set some state here to display an error message
                console.error(data.message);
            } else {
                // Handle successful login - navigate to dashboard or show a success message
            }

        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className="signUpContainer">
                <h1>Sign In</h1>
                <label htmlFor="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" id="email" required onChange={handleInputChange} />
                <input type="password" placeholder="Enter Password" name="password" id="password" required onChange={handleInputChange} />
                <button type="submit" className="loginbtn">Login</button>

                <div className="container signin">
                    <p>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); props.switchToSignUp() }}>Register</a>.</p>
                </div>
            </div>
        </form>
    );
};

export default SignInForm;
