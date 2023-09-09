import React, { useState, useRef } from 'react';
import './SignUpForm.css';
import SuccessModal from './SuccessModal';

const SignUpForm: React.FC<{ switchToSignIn: () => void }> = (props) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const API = 'http://localhost:5000/auth/register'; // use this for local development
    // const API = 'http://backend:5000/auth/register'; 

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: ''
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

        if (formData.password !== formData.repeatPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            const response = await fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (data.success) {
                setShowSuccessModal(true);
            }

            if (formRef.current) {
                formRef.current.reset();
            };

        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            {showSuccessModal ? (
                <SuccessModal onClose={() => setShowSuccessModal(false)} />
            ) : (
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="signUpContainer">
                        <h1>Register</h1>
                        <p>Please fill in this form to create an account.</p>
                        <hr />
                        {/* first name */}
                        <label htmlFor="firstName"><b>First Name</b></label>
                        <input type="text" placeholder="Enter First Name" name="firstName" id="firstName" required onChange={handleInputChange} />

                        {/* last name */}
                        <label htmlFor="lastName"><b>Last Name</b></label>
                        <input type="text" placeholder="Enter Last Name" name="lastName" id="lastName" required onChange={handleInputChange} />

                        <label htmlFor="email"><b>Email</b></label>
                        <input type="text" placeholder="Enter Email" name="email" id="email" required onChange={handleInputChange} />

                        <label htmlFor="password"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="password" id="password" required onChange={handleInputChange} />

                        <label htmlFor="repeatPassword"><b>Repeat Password</b></label>
                        <input type="password" placeholder="Repeat Password" name="repeatPassword" id="repeatPassword" required onChange={handleInputChange} />
                        <hr />
                        <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

                        <button type="submit" className="registerbtn">Register</button>
                    </div>

                    <div className="container signin">
                        <p>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); props.switchToSignIn() }}>Sign in</a>.</p>
                    </div>
                </form>
            )}
        </>
    );
};

export default SignUpForm;
