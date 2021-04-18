// PACKAGES
import React, { useContext } from "react";
import PropTypes from "prop-types";
// UI
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
// COMPONENTS
import BookCard from "./BookCard";
// UTILS
import { Context } from "../lib/context";
import { TYPE_LIST_BOOKSHELF } from "../lib/constants";

const listStyles = {
  alignItems: "stretch",
  display: "flex",
  justifyContent: "flex-start",
  overflow: "scroll",
};

export const useStyles = makeStyles((theme) => ({
  list: listStyles,
  listEmpty: {
    ...listStyles,
    justifyContent: "center",
    padding: "1rem",
  },
}));

/**
 * @Component
 * List component for search results and bookshelf
 * @param {string} type either `TYPE_LIST_BOOKSHELF` or `TYPE_LIST_RESULTS`
 *
 */
export default function BookList({ type }) {
  const classes = useStyles();
  const { bookshelf, loading, results, searchPhrase } = useContext(Context);

  const isBookshelf = type === TYPE_LIST_BOOKSHELF;
  const list = isBookshelf ? Object.values(bookshelf) : results;

  const noResultsMsg = isBookshelf
    ? "Add some books to your bookshelf!"
    : `No results found for "${searchPhrase}".`;

  if (!isBookshelf && loading) {
    // only the async search results need to show loading state
    return (
      <Container className={classes.listEmpty}>
        <CircularProgress />
      </Container>
    );
  }
  if (!list.length) {
    return <Container className={classes.listEmpty}>{noResultsMsg}</Container>;
  }
  return (
    <Container className={classes.list}>
      {list.map((book) => (
        <BookCard data={book} key={book.id} type={type} />
      ))}
    </Container>
  );
}

BookList.propTypes = {
  type: PropTypes.string.isRequired,
};
