const setLoadingAndError = (state) => {
  state.loading = true;
  state.error = null;
};

const setError = (state, action) => {
  state.loading = false;
  state.error = action.error.message;
};

export {setLoadingAndError, setError}
