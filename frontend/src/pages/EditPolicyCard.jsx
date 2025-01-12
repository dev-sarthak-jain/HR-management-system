import React, { useEffect, useState } from 'react';
import Input from '../components/common/input';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updatePolicyCard } from '../redux/Slices/pagenationSlice';
import { policyByID } from '../redux/Selectors/selectors';
import TextArea from '../components/common/TextArea';
import { toast } from "react-toastify";
import { userInfo } from '../redux/Selectors/selectors';

const EditPolicyCard = () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"


    const { policyCardID } = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const user = useSelector(state => userInfo(state))

    // GET POLICY CARD THAT MATCHES THE policyCardID
    const existingPolicy = useSelector(state => policyByID(state, policyCardID))

    const [editInput, setEditInput] = useState({
        content: "",
        category: "",
        policy_makers: "",
        regional_info: "",
    })



    useEffect(() => {
        if (!user) {
            return navigate("/signin");
        }
        setEditInput(existingPolicy) //Update the editInput state

         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [existingPolicy, user])


    // Update Policy card
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            toast.loading("Processing...")
            dispatch(
            updatePolicyCard({
                accessToken: token,
                eid: policyCardID,
                content: editInput.content,
                category: editInput.category,
                policy_makers: editInput.policy_makers,
                regional_info: editInput.regional_info,
                effective_date: existingPolicy.effective_date,
                voting_status: true
            })
        )
        toast.dismiss()
        navigate(`/dashboard/${policyCardID}`) //Navigate to the newly updated card route.
        } catch (error) {
            toast.error("Failed to update policy card.")
        }

    };

    // On Change
    const handleChange = async (e) => {
        let { name, value } = e.target;
        setEditInput((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    };










    return (
        <div className="min-h-screen flex items-center justify-center bg-backgroundColor py-12 px-4 sm:px-6 lg:px-8">

            <div className="max-w-4xl w-full bg-white p-5 rounded-md">

            <div className="bg-[#3C6E71] rounded-md p-5">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Edit Policy Card
                    </h2>

                    <form>
                        <Input
                            htmlFor="category"
                            id="category"
                            name="category"
                            value={editInput.category}
                            onChange={handleChange}
                            labelName="Category"
                        />

                        <Input
                            htmlFor="policy_makers"
                            id="policy_makers"
                            name="policy_makers"
                            value={editInput.policy_makers}
                            onChange={handleChange}
                            labelName="Policy Makers"
                        />

                        <Input
                            htmlFor="regional_info"
                            id="regional_info"
                            name="regional_info"
                            value={editInput.regional_info}
                            onChange={handleChange}
                            labelName="Regional Info"
                        />



                        <section className="mb-6 grid grid-cols-2 mt-10 space-x-9 justify-center items-end">
                        <TextArea
                                htmlFor="content"
                                handleChange={handleChange}
                                name="content"
                                value={editInput.content}
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
        </div>
    );
}

export default EditPolicyCard;
