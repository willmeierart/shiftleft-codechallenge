// UTILS
import api from "./api";
import { BASE_URL, SEARCH_PATH, DETAIL_PATH, PROTOCOL } from "./constants";

/**
 * @function
 * Handles compiling a search url with query params
 * @param {string} searchPhrase
 *
 */
export const getSearchUrl = (searchPhrase) =>
  `${BASE_URL}${SEARCH_PATH}?q=${encodeURIComponent(searchPhrase)}`;

/**
 * @function
 * Handles compiling an src for a cover image
 * @param {number} id
 *
 */
export const getCoverSrc = (id) =>
  `${PROTOCOL}covers.${BASE_URL}${DETAIL_PATH}${id}-M.jpg`;

/**
 * @function
 * Handles the fetching and transformation of data from the api call
 * @param {string} searchPhrase
 *
 */
export const fetchAndTransform = async (searchPhrase) => {
  if (!searchPhrase) {
    // searchphrase required
    return [];
  }

  try {
    const url = getSearchUrl(searchPhrase);
    const response = await api.fetch(url);
    const data = await response.json();
    return data.docs
      .filter((book) => book.isbn?.length) // try to ensure all books will have a cover image
      .slice(0, 10) // only return top 10 results to avoid rate limiting on images
      .map((book) => {
        const id = book.isbn[book.isbn.length - 1]; // use the most recent catalog isbn since multiple often returned
        return {
          author: book.author_name?.join(", ") || "Author unknown",
          id,
          image: getCoverSrc(id),
          title: book.title,
        };
      });
  } catch (e) {
    console.warn(e);
    return [];
  }
};
