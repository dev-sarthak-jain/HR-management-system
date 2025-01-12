import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Input from '../components/common/input';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextArea from '../components/common/TextArea';
import Alert from '../components/common/Alert';
import { create_policy_card_API } from '../redux/Thunks/policyCardThunk';
import { userInfo } from '../redux/Selectors/selectors';
import { toast } from "react-toastify";

const CreatePolicyCard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let userID;
    const user = useSelector(state => userInfo(state))
    if (user) {
        userID = user.id;
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    const [showError, setShowError] = useState(false);
    const [input, setInput] = useState({
        content: "",
        category: "",
        policy_makers: "",
        regional_info: "",

    })


    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.loading("Creating Policy...")

        try {
            const post = await dispatch(
                create_policy_card_API({
                    accessToken: token,
                    content: input.content,
                    category: input.category,
                    policy_makers: input.policy_makers,
                    regional_info: input.regional_info,
                    userneed_id: userID,
                    effective_date: new Date(),
                    voting_status: true,
                    location:user.state
                })
            ).unwrap()
            if (post) {
                toast.dismiss()
                toast.success("Policy card created.")
                navigate(`/dashboard`)
            }

        } catch (error) {
            if (error) {
                toast.dismiss()
                setShowError(true)
            }
        }

    };

    const handleChange = async (e) => {
        let { name, value } = e.target;

        setInput((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    };



    useEffect(() => {
        if (!user) {
            return navigate("/signin");
        }
        if (showError) {
            // Set a timeout to hide the error alert after 5 seconds
            const timeout = setTimeout(() => {
                setShowError(false);
            }, 3000);

            // Clear the timeout if the component unmounts or if showError changes
            return () => clearTimeout(timeout);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showError, user]);




    return (
        <div className="min-h-screen flex items-center justify-center bg-backgroundColor py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full bg-white p-5 rounded-md">

                <div className="bg-[#3C6E71] rounded-md p-5">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Create Policy Card
                    </h2>

                    <form>
                        <Input
                            htmlFor="category"
                            id="category"
                            name="category"
                            value={input.category}
                            onChange={handleChange}
                            labelName="Category"
                        />

                        <Input
                            htmlFor="policy_makers"
                            id="policy_makers"
                            name="policy_makers"
                            value={input.policy_makers}
                            onChange={handleChange}
                            labelName="Policy Makers"
                        />

                        <Input
                            htmlFor="regional_info"
                            id="regional_info"
                            name="regional_info"
                            value={input.regional_info}
                            onChange={handleChange}
                            labelName="Regional Information"
                        />


                        <section className="mb-6 grid grid-cols-2 mt-10 space-x-9 justify-center items-end">
                            <TextArea
                                htmlFor="content"
                                handleChange={handleChange}
                                name="content"
                                value={input.content}
                                id="content"
                                label="Content"
                                rows={10}
                                cols={40}

                            />
                            <div className="col-span-1 flex justify-end">
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="text-white bg-[#868BC7] hover:bg-[#474B7D] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center "
                                >
                                    Submit
                                </button>
                            </div>
                        </section>


                    </form>
                </div>
            </div>

            {showError && <Alert
                isVisible={showError}
                message="Oops! Something went wrong."
                type="error"
            />}

        </div>
    );



}

export default CreatePolicyCard;
