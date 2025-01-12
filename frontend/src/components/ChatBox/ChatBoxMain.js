import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LiaToggleOffSolid, LiaToggleOnSolid } from "react-icons/lia";
import { IoMenu } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import ChatHelp from "./chatHelp";
import chatData from "../../mockups/Chat/ChatData";
import ChatPrompt from "./ChatPrompt";
import { createChatTitle, createTranscriptID, postUserNeed } from "../../redux/Thunks/chatBotThunk";
import {
  changeBackgoundMode,
  selectbackground,
} from "../../redux/Slices/toggleBackgroundSlice";
import Loading from "../common/loading";
import Alert from "../common/Alert";
import { userInfo } from "../../redux/Selectors/selectors";
import { addOne, endSurvey, toggleChatSideBar } from "../../redux/Slices/sharedUseEffectSlice";


const ChatBoxEachPromptMain = () => {

  let userID;
  const user = useSelector(state => userInfo(state))

  if (user) {
    userID = user.id;
  }
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentMode = useSelector((state) => selectbackground(state));

  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [userPrompt, setUserPrompt] = useState({ prompt: "" });

  // Background change
  const handleBackgroundChange = () => {
    dispatch(changeBackgoundMode());
  };

  const toggleNavbar = () => {
      dispatch(toggleChatSideBar())
  }


  const handleChange = (e) =>
    setUserPrompt((prevValue) => {
      return {
        ...prevValue,
        prompt: e.target.value,
      };
    })

    // ASK BOT REUSABLE FUNCTION
async function talk_to_bot(question){
  setLoading(true) //Show Loading to user
  try {
    // Create a transcript and also get the details of the transcript
    const postTranscript = await dispatch(
      createTranscriptID({
        accessToken: token,
        user: userID,
      })
    ).unwrap()

    if (postTranscript) {
      setUserPrompt({ prompt: "" });
          // Dispatch the user prompt and the transcript_id from the postTranscript result
    const isFulfilled = await dispatch(
      postUserNeed({
        accessToken: token,
        transcriptID: postTranscript.transcript_id,
        prompt: question, //User Input
        user_id: userID
      })
    ).unwrap()
    // And at the same time create a chat Title
    const chatTitle = await dispatch(
      createChatTitle({
        transcriptID: postTranscript.transcript_id,
        prompt: question,
      })
    ).unwrap()

    // If user gets a successful response, navigate to the transcript page
    if (isFulfilled && chatTitle) {
      // Then switch user to a url by ID
      const newPageURL = `/chat/${postTranscript.transcript_id}`; // new URL with the parameter
      navigate(newPageURL); //navigate
    }
    }



  } catch (rejectedValueOrSerializedError) {
    if (rejectedValueOrSerializedError) {
      setLoading(false) //Hide loading from user
      setShowError(true) //Show error popup
    }
  }
}


  // Submitting the user_prompt
  const handleClick = async (e) => {
    e.preventDefault();
    talk_to_bot(userPrompt.prompt)
  };

// Auto Prompting
const prompt_1_Clicked = (e) => {
  let prompt = e.target.innerText
  talk_to_bot(prompt)
}

const prompt_2_Clicked = (e) => {
  let prompt = e.target.innerText
  talk_to_bot(prompt)
}

  // Rerender the page once showError value changes
  useEffect(() => {

        // RESET STATES IN THE sharedUseEffectSlice file
    dispatch(
      addOne({
        isFive : 0
    })
    )

    if (showError) {
      // Set a timeout to hide the error alert after 5 seconds
      const timeout = setTimeout(() => {
        setShowError(false);
      }, 3000);

      // Clear the timeout if the component unmounts or if showError changes
      return () => clearTimeout(timeout);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showError]);



  return (
    <div
      className={`w-full lg:w-4/5 relative pt-8 pb-5 h-screen
          ${!currentMode ? `bg-white text-black` : `bg-nightModeDark text-white`} `}
    >
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

      {/* Chat data to display on chat page */}
    <div className="px-5 pb-[70px] h-screen overflow-y-scroll no-scrollbar">
      {chatData.map((chat, index) => {
        return <ChatHelp
               key={index}
               chathelp={chat}
                mode={!currentMode}
                prompt1Clicked={prompt_1_Clicked}
                prompt2Clicked={prompt_2_Clicked} />
      })}
      </div>

      {loading && <Loading  width="w-full lg:w-4/5" />}

      {showError && <Alert
        isVisible={showError}
        message="Oops! Something went wrong."
        type="error"
      />}

      <ChatPrompt
        currentMode={currentMode}
        bgOnDark="bg-nightModeDark"
        placeholder='Hi, Let’s talk policies today!'
        position="absolute"
        submitPrompt={handleClick}
        value={userPrompt.prompt}
        handleChange={handleChange} />

    </div>
  );
}

export default ChatBoxEachPromptMain;
