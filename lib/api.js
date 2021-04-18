// PACKAGES
import fetch from "isomorphic-unfetch";
import { PROTOCOL } from "./constants";

const api = {
  /**
   * @function
   * API integration using isomorphic unfetch for both server and clientside requests
   * @param {string} url
   *
   */
  fetch: async (url) => {
    try {
      const data = await fetch(`${PROTOCOL}${url}`);
      return data;
    } catch (e) {
      console.error(`Failed to fetch ${url}: \n ${e}`);
      return null;
    }
  },
};

export default api;
