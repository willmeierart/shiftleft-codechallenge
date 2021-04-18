import {
  TYPE_INITIALIZE,
  TYPE_SEARCH,
  TYPE_UPDATE_SEARCHPHRASE,
  TYPE_ADD_BOOKSHELF,
  TYPE_REMOVE_BOOKSHELF,
} from "./constants";

export const initialState = {
  bookshelf: {},
  initialized: false,
  loading: false,
  results: [],
  searchPhrase: "",
};

/**
 * @function
 * Reducer for global data
 *
 */
export const dataReducer = (state, action) => {
  switch (action.type) {
    case TYPE_INITIALIZE:
      if (typeof window !== "undefined") {
        // check localstorage to see if bookshelf data exists
        const savedBookshelf = window?.localStorage.getItem("bookshelf"); // eslint-disable-line no-case-declarations
        return {
          ...state,
          bookshelf: savedBookshelf ? JSON.parse(savedBookshelf) : {},
          initialized: true,
        };
      }
      return state;
    case TYPE_SEARCH:
    case TYPE_UPDATE_SEARCHPHRASE:
      return {
        ...state,
        ...action.payload,
      };
    case TYPE_ADD_BOOKSHELF:
      return {
        ...state,
        bookshelf: {
          ...state.bookshelf,
          [action.payload.id]: action.payload,
        },
      };
    case TYPE_REMOVE_BOOKSHELF:
      const newBookshelf = { ...state.bookshelf }; // eslint-disable-line no-case-declarations
      delete newBookshelf[action.payload];
      return {
        ...state,
        bookshelf: newBookshelf,
      };
    default:
      return state;
  }
};
