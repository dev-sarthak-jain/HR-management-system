import React, { useState } from 'react';
import { MdCancelPresentation } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { update_survey_by_id } from '../../redux/Thunks/chatBotThunk';
import { surveyCards } from '../../redux/Thunks/policyCardThunk';
import { endSurvey } from '../../redux/Slices/sharedUseEffectSlice';



const ChatSurvey = ({ isOpen, onClose, onError, transcript_id }) => {
    const dispatch = useDispatch()
    const surveyObject = useSelector(state => state.botChats.surveyByChat)
    const [rankings, setRankings] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false)
    let surveyOptions;

    if (surveyObject) {
        surveyOptions = surveyObject.options
    }


    const handleRankingChange = (optionName, value) => {
        // Find the index of the option in the ranking array
        const optionIndex = rankings.findIndex((item) => item[0] === optionName);
        // If the option is not in the ranking array, add it; otherwise, update the value
        if (optionIndex === -1) {
            setRankings((prevRanking) => [...prevRanking, [optionName, value]]);
        } else {
            setRankings((prevRanking) => {
                const newRanking = [...prevRanking];
                newRanking[optionIndex][1] = value;

                // Remove empty arrays with no values
                const filteredRanking = newRanking.filter((item) => item[1] !== undefined);

                return filteredRanking;
            });
        }
    };

    const handleSubmit = async () => {
        setIsSubmitted(!isSubmitted) // Close Pop up

        if (surveyObject) {
            try {
                // Update user survey
                const surveyUpdate = await dispatch(
                    update_survey_by_id({
                        survey_id: surveyObject.survey_id,
                        ranking: rankings
                    })
                ).unwrap()

                if (surveyUpdate) {
                    // If the update was successful, create a policy card and set the
                    // surveyEnd from the sharedUseEffectSlice file to true.
                    // This will stop a survey being generated.
                    dispatch(
                        surveyCards({
                            survey_id: surveyObject.survey_id,
                            transcript_id: transcript_id
                        })
                    )
                    dispatch(
                        endSurvey()
                    )
                    // AT THE END OF THE SURVEY, AND AFTER A POLIOCY CARD IS GENERATED
                    // SET THE RANKINGS BACK TO EMPTY

                    update_survey_by_id({
                        survey_id: surveyObject.survey_id,
                        ranking: []
                    })
                    onClose(); //Thank the user
                } else {
                    onError();
                }


            } catch (error) {
                if (error) {
                    onError();
                    setIsSubmitted(!isSubmitted)
                }
            }

        }



    };


    if (!isSubmitted && surveyOptions) {
        if (surveyOptions.length > 1 && surveyOptions.length <= 10) {
            const minValue = Math.round(-(surveyOptions.length / 2))
            const maxValue = Math.round(surveyOptions.length / 2)
            return (
                <div className="absolute top-0 z-10 w-full h-full flex justify-center items-center  bg-nightModeDark">
                    <div className="h-[80vh] overflow-y-scroll text-black relative backdrop-blur-xl p-4 bg-white h-10/12 w-11/12 sm:w-2/4 rounded-xl border-2">

                        <MdCancelPresentation
                            onClick={() => {
                                setIsSubmitted(!isSubmitted)
                            }}
                            className="cursor-pointer hover:opacity-70 absolute top-1 sm:top-2 right-2 text-4xl"
                        />
                        <h3 className="text-2xl my-6 font-bold text-center">Policy Card Generation Survey</h3>
                        <form className='p-5'>
                            <h1 className='text-center mb-7 sm:text-xl'>
                                {surveyObject.questions} from <b>{minValue} to {maxValue}</b></h1>
                            {surveyOptions.map((option, index) => {
                                let optionEdited;
                                if (option) {
                                    optionEdited = option.slice(0, -1)
                                }


                                return (<div key={index} className='m-3'>
                                    <label className='block'>{optionEdited}</label>
                                    <input
                                        className="appearance-none w-[85%] bg-gray-300 h-3
                            rounded-full outline-none"
                                        type="range"
                                        min={minValue}
                                        max={maxValue}
                                        step="1"
                                        value={(rankings.find((item) => item[0] === option[0]) || [])[1] || 0}
                                        onChange={(e) =>
                                            handleRankingChange(option[0], parseInt(e.target.value))}
                                    />
                                    <span className='ml-3'>
                                        {(rankings.find((item) => item[0] === option[0]) || [])[1] || 0}
                                    </span>
                                </div>)
                            })}
                            <div className='w-full flex justify-center'>
                                <button
                                    type="button"
                                    className='bg-blue-700 hover:bg-opacity-75
                                        m-2.5 px-3.5 py-2 text-white rounded
                                        border-solid border-2'
                                    onClick={handleSubmit}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>


            )
        }

    }
};

export default ChatSurvey;
