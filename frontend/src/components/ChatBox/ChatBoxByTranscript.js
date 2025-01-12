import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ChatPrompt from "./ChatPrompt"
import ChatSurvey from './chatSurvey';
import { LiaToggleOffSolid, LiaToggleOnSolid } from "react-icons/lia"
import { IoMenu } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { allBotsChats, userInfo } from "../../redux/Selectors/selectors";
import { changeBackgoundMode, selectbackground, } from "../../redux/Slices/toggleBackgroundSlice";
import { getUserChatFromAPIAsync, postUserNeed } from "../../redux/Thunks/chatBotThunk";
import { addOne, selectRenderedState, surveyActivity, toggleChatSideBar } from '../../redux/Slices/sharedUseEffectSlice';
import { generateSurvey } from '../../redux/Thunks/chatBotThunk';
import Loading from '../common/loading';
import Alert from "../common/Alert";

const ChatBoxByTranscript = () => {
    const divRef = useRef(null);
    const isSurveyTime = useSelector(state => state.shared_useEffect.isFive)
    const surveyCarriedOut = useSelector(state => surveyActivity(state))

    let userID;
  const userDetails = useSelector(state => userInfo(state))
  if (userDetails) {
    userID = userDetails.id;
  }

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    const { transcriptID } = useParams(); // Access the parameter value
    const dispatch = useDispatch();
    const currentMode = useSelector(state => selectbackground(state)) //Light and Dark Mode
    const isRendered = useSelector(state => selectRenderedState(state))

    const [userPrompt, setUserPrompt] = useState("")
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    //Fetch each user transcripts and unique chats
    const userChats = useSelector(state => allBotsChats(state))
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    async function timeoutAlert(){
        if (showError || showSuccess) {
            // Set a timeout to hide the error alert after 5 seconds
            const timeout = setTimeout(() => {
                setShowError(false);
                setShowSuccess(false)
            }, 4000);

            // Clear the timeout if the component unmounts or if showError changes
            return () => clearTimeout(timeout);
        }
    }

    function fetchData(){
        if (isRendered && userDetails) {
            dispatch(
                getUserChatFromAPIAsync({
                    transcript_id: transcriptID
                })
            );

            const timer = setTimeout(() => {
                setIsPopupOpen(true);
            }, 5000); // 10 seconds
            return () => clearTimeout(timer);
        }
        divRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
    }

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setShowSuccess(true)
    };

    const handleError = () => {
        setShowError(true)
    }

    // Background change
    const handleBackgroundChange = () => {
        dispatch(
            changeBackgoundMode()
        )
    }
    const toggleNavbar = () => {
      dispatch(toggleChatSideBar())
  }

    const handleClick = async (e) => {
        e.preventDefault()
        setLoading(true)
        if(userDetails){
            dispatch(
            addOne({  // Increase isSurveyTime by 1.
                isFive : isSurveyTime + 1
            })
            )


        try {
            // DISPATCH THE USER PROMPT
            const sendChats = await dispatch(
                postUserNeed({
                    accessToken: token,
                    prompt: userPrompt,
                    transcriptID: transcriptID,
                    user_id: userID
                })
            ).unwrap()

            if (sendChats) {
                setLoading(false)
                setUserPrompt("")
                // IF THE USER CHATS GOT A RESPONSE, CHECK IF SURVEY HAS BEEN CARRIED OUT
                // AND IF THE SURVEY NUMBER IS IN THE RANGE OF 2 AND 4.
                // IF SO, GENERATE A SURVEY
                if (isSurveyTime >= 1 && !surveyCarriedOut ){
                    await dispatch(
                        generateSurvey({
                            user_id: userID,
                            transcript_id: transcriptID
                        })
                    ).unwrap()
                }


                }

        } catch (error) {
            if (error) {
                setLoading(false)
                setShowError(true)
            }
        }


        }

    }


    useEffect(() => {
        timeoutAlert()
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userDetails, showError, showSuccess, isRendered]);


    return (

        <div className={`w-full lg:w-4/5 relative h-screen ${!currentMode ? `bg-white text-black` : `bg-nightModeDark text-white`} `}>
      <button
        className="m-2.5 text-2xl lg:text-4xl absolute top-2 right-3 z-10"
        onClick={handleBackgroundChange}>
        {currentMode ? <LiaToggleOnSolid /> : <LiaToggleOffSolid />}
      </button>

      <button
        className="lg:hidden m-2.5 text-2xl absolute top-2 left-3 z-10"
        onClick={toggleNavbar}>
        <IoMenu  className={`${currentMode ? "text-chatTipBackground" : "text-nightModeDark"}`}/>
      </button>

            <div className='overflow-y-scroll no-scrollbar h-screen p-3 sm:p-5 pb-[70px]'>

                {userChats.map(({ chat_id, transcript, timestamp, user,
                    user_response, ai_response }) => {
                    return <div key={chat_id} className='my-12'>
                        <div className={`float-right w-3/4 md:w-3/5 mx-2 relative `}>

                                {userDetails && <p className='float-right font-bold text-sm sm:text-[16px] my-1 sm:my-2.5 sm:mr-7'>
                                {userDetails.first_name + " "}{userDetails.last_name}</p>}
                            <p
                                className={`my-2 sm:m-4 rounded-2xl p-2.5 clear-both
bg-chatTipBackground text-black border-transparent `}
                            >
                                {user_response}
                            </p>
                        </div>

                        <div className={`clear-both w-[90%] md:w-3/5 mt-5 mx-2 `}>
                            <p className='my-1 sm:m-2.5 font-bold text-sm sm:text-[16px]'>HR assistant</p>

                            <div className={`bg-chatTipBackground text-black sm:my-2.5 rounded-2xl`}>
                                <div
                                    className={`rounded-t-lg p-4 border-transparent`}
                                >
                                    {ai_response}
                                </div>
                            </div>
                        </div>
                    </div>
                })}
                <div ref={divRef} className="pt-[40px]" style={{ float: "left", clear: "both" }}></div>

            </div>

            {loading && <Loading width="w-full lg:w-4/5"/>}
            {showError && <Alert
                isVisible={showError}
                message="Oops! Something went wrong."
                type="error"
            />}
            {showSuccess && <Alert
                isVisible={showSuccess}
                message="Thank you for your feedback."
                type="success"
            />}

            <ChatPrompt
                currentMode={currentMode}
                bgOnDark="bg-nightModeDark"
                placeholder='Hi, Let’s talk policies today!'
                position="absolute"
                submitPrompt={handleClick}
                value={userPrompt}
                handleChange={e => setUserPrompt(e.target.value)} />

            <ChatSurvey
                onError={handleError}
                isOpen={isPopupOpen}
                transcript_id={transcriptID}
                onClose={handleClosePopup}
            />


        </div>
    );
}

export default ChatBoxByTranscript;
