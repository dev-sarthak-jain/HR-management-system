import React from 'react';
import { FiMessageSquare } from "react-icons/fi";
import { Link } from 'react-router-dom';
import FormButtonsToDisplay from './formButtonsToDisplay';

function ChatListItem({ index,  conversation_id,  conversationName,
                         isEditClicked,editClicked, showActions,
                          deleteAndCancelPopUp, handleUpdate, cancelEditing, inputValue,
                           setInputValue, showEditOrDeleteButton }) {


      let component_to_show = <Link
      className='block transition duration-300 ease-in-out hover:opacity-60'
      to={`/chat/${conversation_id}`}
       id={index}
       onClick={(e) => showEditOrDeleteButton(index, e, conversation_id)}>
          <p className='w-4/5 text-sm sm:text-lg overflow-hidden overflow-ellipsis whitespace-nowrap'>
          <FiMessageSquare className="inline text-2xl mx-2" />
          <span className='truncate'>{conversationName}</span>
        </p>
      </Link>

      if(showActions[index] === true && isEditClicked[index] === false){
        component_to_show = <input
        className="bg-transparent rounded border-b-2 w-4/5
         border-solid border-white focus:outline-none focus:border-blue-500"
        type="text"
        value={inputValue}
        onChange={setInputValue}
            />
     }


    return (
        <li className='relative' key={conversation_id}>
            {component_to_show}
            <FormButtonsToDisplay
                isEditClicked={isEditClicked}
                editClicked={editClicked}
                index={index}
                conversation_id={conversation_id}
                conversationName={conversationName}
                showActions={showActions}
                deleteAndCancelPopUp={deleteAndCancelPopUp}
                handleUpdate={handleUpdate}
                cancelEditing={cancelEditing}
            />
        </li>
    );
}

export default ChatListItem;
