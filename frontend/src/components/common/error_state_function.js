export const errorStateFunctionn = (state) => {
    if (state) {
        // Set a timeout to hide the error alert after 5 seconds
        const timeout = setTimeout(() => {
            state = false
        }, 3000);

        // Clear the timeout if the component unmounts or if showError changes
        return () => clearTimeout(timeout);
      }
}
