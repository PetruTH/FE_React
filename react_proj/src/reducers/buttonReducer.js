const initialState = {
    buttonPressCount: 0,
  };
  
  const buttonReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INCREMENT_BUTTON_PRESS':
        return {
          ...state,
          buttonPressCount: state.buttonPressCount + 1,
        };
      default:
        return state;
    }
  };
  
  export default buttonReducer;
  