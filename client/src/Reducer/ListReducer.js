import { ADD_TO_MY_LIST, REMOVE_FROM_MY_LIST, GET_FAIL} from "./Actions";

const listReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_MY_LIST: 
      console.log("added to list success");
      localStorage.setItem("myList", JSON.stringify(action.payload));
      return { ...state, myList: action.payload, error: false };

    case REMOVE_FROM_MY_LIST:
      return { ...state, myList: action.payload, error: false };

    case GET_FAIL:
      return { ...state, myList: null, error: action.payload };
    default:
      return { ...state };
  }
};

export default listReducer;
