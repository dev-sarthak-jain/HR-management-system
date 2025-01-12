import React from 'react';
import { PiPencilSimpleLineThin } from "react-icons/pi";
import { AiTwotoneDelete } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { MdOutlineCancel } from "react-icons/md";

const FormButtonsToDisplay = ({ isEditClicked, editClicked, index, conversation_id,
                                 conversationName,showActions,deleteAndCancelPopUp,
                                  handleUpdate, cancelEditing }) => {


    const buttonsToDisplay = (index, conversation_id, conversationName) => {

        if (showActions[index] === true && isEditClicked[index] === true) {
            return (
                <div className='flex absolute right-0 top-0 '>
                <form className='flex'
                    key={conversation_id}
                    data-index={index}
                    data-form-key={conversation_id}
                    id={conversationName}
                >
                    <button type="submit" name="edit"
                        onClick={(e) => {
                            e.preventDefault()
                            editClicked(index)
                        }
                        }>
                        {/* Edit icon */}
                        <PiPencilSimpleLineThin className="mx-1 text-xl  z-10" />
                    </button>
                    <button type="submit" name="delete" onClick={deleteAndCancelPopUp}>
                        {/* Delete icon */}
                        <AiTwotoneDelete className="mx-1 text-xl  z-10" />
                    </button>
                </form>
                </div>
           )


        } else if (showActions[index] === true && isEditClicked[index] === false) {

            return ( <div className='flex absolute right-0 top-[25%] '>
                <form
                className='flex'
                 key={conversation_id}
                  data-form-key={conversation_id}
                   >
                    <button type="submit" name="update" onClick={handleUpdate}>
                        <TiTick className="mx-1 text-xl  z-10" />
                          {/* continue Operation icon */}
                    </button>
                    <button type="submit" name="cancel"
                        onClick={(e) => {
                            e.preventDefault()
                            cancelEditing(index)
                        }
                        }>
                        <MdOutlineCancel className="mx-1 text-xl  z-10" />
                           {/* Cancel Operation icon */}
                    </button>

                </form>
                </div>
            )
        }


    }








    return buttonsToDisplay(index, conversation_id, conversationName)
}

export default FormButtonsToDisplay;
