
export const changeArrayItemState = (index, arrayState, setArrayState) => {
        //Make a cooy of the pevious arrayState which are set to true/false,
        //  and assign to a new variable newArray
        const newArray = [...arrayState];
        //Assign each index of the clicked link to
        // opposite of the initial value (i.e True becomes false and vice versa)
        newArray[index] = !newArray[index];
        setArrayState(newArray); // Set the new state.
}


export const resetActions = (index, arrayToCopy, setNewArray) => {
    const newArray = Array.from(
        { length: arrayToCopy.length },
        () => false
    );
    //Assign each index of the clicked link to
    // opposite of the initial value (i.e True becomes false and vice versa)
    newArray[index] = !newArray[index];
    // Update the state
    setNewArray(newArray);
}


export const arrayInputOnChange = (index, e, arrayState, setArrayState) => {
    const newArray = [...arrayState]; //Make a copy of the arrayState array
    newArray[index] = e.target.value; //Set the particular input index to the event.target's value
    setArrayState(newArray); // Set the new state.
  };
