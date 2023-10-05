import { ACCOUNT_STATE_CHANGE } from "../types/account";

const initialState = {
  user: null,
  error: null,
  loading: false,
  photo: null,
  uploadLoading: false,
};

const accountReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACCOUNT_STATE_CHANGE:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default accountReducer;
