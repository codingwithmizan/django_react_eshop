import { ADD_PROFILE } from "./types";
export const initialstate = {
  profile: null,
  reloadpage: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
