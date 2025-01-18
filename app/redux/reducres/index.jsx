const initialState = {
    bills: [],
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
      case 'ADD_BILL':
        return { ...state, bills: [...state.bills, action.payload] };
      default:
        return state;
    }
  }
  
  export default rootReducer;
  