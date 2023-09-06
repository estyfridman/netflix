import { GET_REQUEST, GET_SUCCESS, GET_FAIL } from './Actions';

export const initialStateHomeReducer = {
  loading: true,
  error: '',
  lists: [],
};

export const homePageReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_REQUEST:
      return { ...state, loading: true };
    case GET_SUCCESS:
      return { ...state, lists: payload, loading: false };
    case GET_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};