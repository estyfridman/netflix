import React, { useState, useContext } from 'react'
import { toast } from 'react-toastify';
import './RegisterFinishPage.scss';
import { FaCheck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import Navbar from '../../Components/navbar/navbar.jsx';
import { registerCall } from '../../Reducer/AuthReducer';

const RegisterFinishPage = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState(sessionStorage.getItem('email'));
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mailingList, setMailingList] = useState(false);

    const navigate = useNavigate();

    const { dispatch: ctxDispatch } = useContext(AuthContext);

    function nextStep() {
        setStep(step + 1);
    };

    //TODO: Confirmation of saving the email to a distribution list
    function mailingListHandler() {
        setMailingList(true);
    };

    async function registerHandler() {
        const newUser = { username: username, email: email, password: password }

        try {
            const registrationSuccess = await registerCall(newUser, ctxDispatch);

            localStorage.setItem('user', JSON.stringify(newUser));
            toast("Congratulations, your registered completed.", {
                position: toast.POSITION.TOP_CENTER,
                className: 'success-toast'
            });

            if (registrationSuccess) {
                navigate('/home');
            }
        } catch (err) {
            //A test that verifies that an answer is returned by the server with response, data and message
            if (err.response && err.response.data && err.response.data.message) {
                // Check if the error message contains duplicate key information
                if (err.response.data.message.includes("duplicate key")) {
                    toast.error("Email is already registered. Please use a unique email.");
                } else {
                    toast.error(err.response.data.message);
                }
            } else {
                toast.error("An error occurred during registration.");
            }
        }
    };

    //יש עניין להוסיף פה useEffect?

    return (
        <div>
            <Navbar />
            <div className='finish-register-page'>
                <div className='step'>STEP {step} OF 6</div>
                {step === 1 &&
                    <div className='step step1'>
                        <h3>Finish setting up your account</h3>
                        <div>Netflix is personalized for you.<br /> Create a password to start watching Netflix.</div>
                        <button onClick={nextStep}>Next</button>
                    </div>
                }

                {step === 2 &&
                    <div className='step step2'>
                        <h2 className='step'>Create a password to start your membership</h2>
                        <div className='step'>Just a few more steps and you're done!<br /> We hate paperwork, too.</div>
                        <div className='step'>
                            <lable>Email</lable>
                            <input
                                type='email'
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='step'>
                            <lable>Name</lable>
                            <input
                                type='text'
                                value={username}
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className='step'>
                            <lable>Add a password</lable>
                            <input
                                type='password'
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='mailingList'>  
                            <input
                            type='checkbox'
                            value={mailingList}
                            onChange={mailingListHandler}
                        />
                        <p>Yes, please email me Netflix special offers</p>
                        </div>
                      
                        <button onClick={nextStep}>Next</button>
                    </div>
                }

                {step === 3 &&
                    <div className='step step3'>
                        <FaCheck size={50} />
                        <h3>Choose your plan.</h3>
                        <div>No commitments, cancel anytime.</div>
                        <div>Everything on Netflix for one low price.</div>
                        <div>Unlimited viewing on all your devices.</div>
                        <button onClick={nextStep}>Next</button>
                    </div>
                }
                {step === 4 &&
                    <div className='step step4'>
                        <h3>Choose the plan that’s right for you</h3>
                        <div>
                            <FaCheck size={20} />
                            <div>Watch all you want. Ad-free.</div>
                        </div>
                        <div>
                            <FaCheck size={20} />
                            <div>Recommendations just for you.</div>
                        </div>
                        <div>
                            <FaCheck size={20} />
                            <div>Change or cancel your plan anytime.</div>
                        </div>
                        <button onClick={nextStep}>Next</button>
                    </div>

                }
                {step === 5 &&
                    <div className='step step5'>
                        <h3>FINISH</h3>
                        <div>
                            <div>finish</div>
                        </div>
                        <button onClick={registerHandler}>register</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default RegisterFinishPage;
