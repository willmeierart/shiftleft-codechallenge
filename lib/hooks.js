// PACKAGES
import { useCallback, useEffect, useReducer } from "react";
import debounce from "lodash.debounce";
// UTILS
import { dataReducer, initialState } from "./reducers";
import {
  TYPE_ADD_BOOKSHELF,
  TYPE_REMOVE_BOOKSHELF,
  TYPE_INITIALIZE,
  TYPE_SEARCH,
  TYPE_UPDATE_SEARCHPHRASE,
} from "./constants";
import { fetchAndTransform } from "./helpers";

/**
 * @Hook
 * Handles the data flow between `useReducer` and `Context` for the app
 *
 */
export const useData = () => {
  const [data, dispatch] = useReducer(dataReducer, initialState);
  const { bookshelf, initialized, searchPhrase } = data;

  useEffect(() => {
    // try to load in a bookshelf from localstorage if data exists
    dispatch({ type: TYPE_INITIALIZE });
  }, [typeof window]);

  // debounce the actual fetching of results while searchphrase updates
  // use `useCallback` to prevent new debounce fn getting created in every `useEffect`
  const debouncedSearch = useCallback(
    debounce((results) => {
      dispatch({ payload: { loading: false, results }, type: TYPE_SEARCH });
    }, 500),
    []
  );

  useEffect(() => {
    // async IIFE to pass fetched results to `debouncedSearch`
    (async () => {
      const results = await fetchAndTransform(searchPhrase);
      debouncedSearch(results);
    })();
  }, [searchPhrase]);

  useEffect(() => {
    // update localstorage so your bookshelf persists refreshes
    window.localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
  }, [Object.keys(bookshelf)]);

  return {
    ...data,
    addBook: (book) =>
      book &&
      dispatch({
        payload: book,
        type: TYPE_ADD_BOOKSHELF,
      }),
    initialize: () => !initialized && dispatch({ type: TYPE_INITIALIZE }),
    removeBook: (bookId) =>
      bookId &&
      dispatch({
        payload: bookId,
        type: TYPE_REMOVE_BOOKSHELF,
      }),
    updateSearchPhrase: (searchPhrase) =>
      dispatch({
        payload: { loading: true, searchPhrase },
        type: TYPE_UPDATE_SEARCHPHRASE,
      }),
  };
};
