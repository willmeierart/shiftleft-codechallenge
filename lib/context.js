// PACKAGES
import React, { createContext } from "react";
import PropTypes from "prop-types";
// UTILS
import { useData } from "./hooks";

export const Context = createContext();

/**
 * @Component
 * The Context provider for the global app data
 * Data is handled via reducer in the `useData` hook
 *
 */
export const Provider = ({ children }) => {
  const initialData = useData();

  return <Context.Provider value={initialData}>{children}</Context.Provider>;
};

Provider.propTypes = {
  children: PropTypes.any,
};
