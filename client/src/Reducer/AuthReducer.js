import {
  ADD_TO_MY_LIST,
  REMOVE_FROM_MY_LIST,
  UPDATE_IMAGE,
  REGISTER,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_FAIL,
  loginStart,
  loginSuccess,
  loginFail,
} from "./Actions";
import axios from "axios";

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case REGISTER: {
      // const user = payload;
      localStorage.setItem("user", JSON.stringify(payload));
      return { ...state, user: payload, isFetching: true, error: false };
    }

    case LOGIN_START: {
      return { ...state, user: null, isFetching: true, error: false };
    }

    case LOGIN_SUCCESS: {
      console.log("login success");
      return {
        ...state,
        user: payload,
        isFetching: false,
        error: false,
      };
    }

    case LOGIN_FAIL: {
      return { ...state, user: null, isFetching: false, error: true };
    }

    case LOGOUT: {
      console.log("logout here");
      localStorage.removeItem("user");
      localStorage.removeItem("myList");
      return {
        ...state,
        myList: null,
        user: null,
        isFetching: false,
        error: false,
      };
    }

    case ADD_TO_MY_LIST: {
      console.log("added to list success");
      localStorage.setItem("myList", JSON.stringify(payload));
      return { ...state, myList: payload, error: false };
    }

    case REMOVE_FROM_MY_LIST: {
      return { ...state, myList: payload, error: false };
    }

    case GET_FAIL: {
      return { ...state, user: null, myList: null, error: payload };
    }

    case UPDATE_IMAGE: {
      console.log("update image");
      localStorage.setItem("user", JSON.stringify(payload));
      return { ...state, user: payload, error: false };
    }

    default:
      return { ...state };
  }
};

export default authReducer;

export const loginCall = async (userCred, localDispatch) => {
  localDispatch({ type: LOGIN_START, payload: userCred });
  try {
    console.log(userCred);
    const res = await axios.post("api/auth/login", userCred);
    console.log(res);
    localDispatch(res.data ? loginSuccess(res.data) : loginFail());
    return true;
  } catch (error) {
    localDispatch(loginFail());
    return false;
  }
};

export const registerCall = async (newUser, dispatch) => {
  dispatch(loginStart());
  try {
    console.log("password: " + newUser.password);
    const res = await axios.post("api/auth/register", {
      email: newUser.email,
      password: newUser.password,
      username: newUser.username,
    });
    dispatch(res.data ? loginSuccess(res.data) : loginFail());
    return true;
  } catch (error) {
    dispatch(loginFail());
    return false;
  }
};

export const updateImage = async (userCred, localDispatch) => {
  try {
    const res = await axios.post("api/user/updateimg", userCred);
    console.log(res);
    localDispatch(res.data ? loginSuccess(res.data) : loginFail());
    return true;
  } catch (error) {
    localDispatch(loginFail());
    return false;
  }
};
