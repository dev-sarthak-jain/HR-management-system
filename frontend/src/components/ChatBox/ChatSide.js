import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdContact } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { selectTranscripts, selectUniqueBotChats, userInfo } from "../../redux/Selectors/selectors";
import ChatSideTop from "./ChatSideTop";
import ChatPopUp from "./ChatPopUp";
import ChatListItem from "./ChatListItem";
import { selectbackground } from "../../redux/Slices/toggleBackgroundSlice";
import {
  deleteChatsFromAPI,
  getUserTranscriptFromAPIAsync,
  updateChatTitle
} from "../../redux/Thunks/chatBotThunk";
import { changeArrayItemState, resetActions, arrayInputOnChange } from "../common/show_and_hide";
import { chatSideOpen, selectRenderedState, setSharedState, toggleChatSideBar } from "../../redux/Slices/sharedUseEffectSlice";


const ChatSide = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageID = useParams()

  let userID;

  const user = useSelector(state => userInfo(state))
 if(user){
   userID = user.id;
 }

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"



  const currentMode = useSelector((state) => selectbackground(state));
  const isRendered = useSelector(state => selectRenderedState(state))
  const sideBar = useSelector(state => chatSideOpen(state))
  const uniqueIDByUserIDs = useSelector(state => selectUniqueBotChats(state, userID))
  let transcripts = useSelector(state => selectTranscripts(state))
  if(!user){
    transcripts = []
  }

  const [showActions, setShowActions] = useState(Array.from({ length: uniqueIDByUserIDs.length }, () => false));
  const [isEditClicked, setIsEditClicked] = useState(Array.from({ length: uniqueIDByUserIDs.length }, () => true));

  const [popUp, setPopUp] = useState(false);
  let [inputValue, setInputValue] = useState(Array.from({ length: uniqueIDByUserIDs.length }, () => ""));
  const [popUpInfo, setPopUpInfo] = useState({
    popUpKey: "",
    popUpPrompt: "",
  });


  // INPUT ONCHANGE
  const inputOnChange = (index, e) => {
    arrayInputOnChange(index, e, inputValue, setInputValue)
  };

  // CHECK IF THE EDIT ICON WAS CLICKED FUNCTION
  const editClicked = (index) => {
    changeArrayItemState(index, isEditClicked, setIsEditClicked)
  };

  // show Edit and Delete Buttons when a Prompt Link is clicked twice
  const showEditOrDeleteButton = (index, e, id) => {
    resetActions(index, uniqueIDByUserIDs, setShowActions)
    resetActions(index, uniqueIDByUserIDs, setIsEditClicked)
    dispatch(
      setSharedState({
        isRendered:true
      })
    )

    // Closes sidebar on click for mobiles and tablets
    if(id !== pageID.transcriptID){
      dispatch(
      toggleChatSideBar()
    )
    }

  };

  // On Deleting on Editing form submission
  const deleteAndCancelPopUp = (e) => {
    e.preventDefault();
    // Find the closest form element to the clicked button
    const parentForm = e.target.closest("form");
    const formKey = parentForm.getAttribute("data-form-key"); // Get the form key attribute
    const formPrompt = parentForm.getAttribute("id"); // Get the id attribute

    setPopUpInfo({
      popUpKey: formKey,
      popUpPrompt: formPrompt,
    });
    setPopUp(!popUp);
  };

  // User cancelling editing
  const cancelEditing = (index) => {
    showEditOrDeleteButton(index);
    editClicked(index);
    changeArrayItemState(index, showActions, setShowActions)
  };

  // User decides to update prompt by editing the input
  const handleUpdate = (index, e) => {
    e.preventDefault();
    // Find the closest form element to the clicked button
    const parentForm = e.target.closest("form");
    const formKey = parentForm.getAttribute("data-form-key"); // Get the form key attribute

    if (!inputValue[index]) {
      alert("Conversation Title cannot be empty!");
    } else {
      dispatch(
        updateChatTitle({
          transcriptID: formKey,
          user_response: inputValue[index],
        })
      );

      editClicked(index);
      changeArrayItemState(index, showActions, setShowActions)

    }
  };

  // DELETE CONVERSATION
  const handleDelete = () => {
    dispatch(
      deleteChatsFromAPI({
        accessToken: token,
        transcriptID: popUpInfo.popUpKey,
      })
    );
    setPopUp(!popUp);
    navigate(`/chat`); //Navigate after deletion
  };


  useEffect(() => {
    const fetchAllChats = async () => {
      try {
        const chats = await dispatch(
          getUserTranscriptFromAPIAsync({
            user_id: userID
          })
        ).unwrap()

        setInputValue(
          chats.slice().reverse().map(({ title }) => {
            return title;
          })
        );
        return chats
      } catch (error) {
        console.log(error)
      }
    }

    if (user && isRendered) {
      fetchAllChats()
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user, sideBar]);



  return (
    <div className={`${sideBar ? "block" : "hidden"} lg:block w-4/5 md:11/12 lg:w-1/5 h-screen ${!currentMode ? "bg-[#868BC7]" : "bg-[#171717]"} text-white py-2.5 relative`}>
    
      <ChatSideTop userHomeUrl={`/chat`} />
      <p className="text-sm m-4">Last 30 days</p>

      {transcripts && (
        <div className="space-y-3 pl-4 my-4 overflow-y-scroll no-scrollbar h-2/4 ">
          <ul className="space-y-4 list-none">
            {transcripts.slice().reverse().map(({ transcript_id, title, user, }, index) => {
              if(title){
                return (<ChatListItem
                key={transcript_id}
                index={index}
                conversation_id={transcript_id}
                conversationName={title}
                isEditClicked={isEditClicked}
                showActions={showActions}
                inputValue={inputValue[index]}
                setInputValue={(e) => inputOnChange(index, e)}
                editClicked={editClicked}
                deleteAndCancelPopUp={deleteAndCancelPopUp}
                handleUpdate={(e) => handleUpdate(index, e)}
                cancelEditing={cancelEditing}
                showEditOrDeleteButton={showEditOrDeleteButton}
              />)
              }
            }

            )}
          </ul>
        </div>
      )}

      <div className="flex justify-between w-full py-2.5 my-1 absolute  bottom-0 z-10">
        <a href="/" className="mx-4 text-2xl md:text-4xl">
          <IoMdContact />
        </a>
        <a href="/settings" className="mx-4 text-2xl md:text-4xl">
          <FiSettings />
        </a>
      </div>

      {/* POP UP */}

      {popUp && (
        <ChatPopUp
          objectModel="Chat?"
          handleClosePopUp={() => setPopUp(!popUp)}
          handleCancel={() => setPopUp(!popUp)}
          promptTarget={popUpInfo.popUpPrompt}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ChatSide;
