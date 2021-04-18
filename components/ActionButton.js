// PACKAGES
import React, { useContext } from "react";
import PropTypes from "prop-types";
// UI
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
// UTILS
import { Context } from "../lib/context";
import { TYPE_LIST_BOOKSHELF } from "../lib/constants";

const useStyles = makeStyles({
  button: {
    justifySelf: "flex-end",
  },
});

/**
 * @Component
 * Action Button that allows for add / remove reducers to be called
 * @param {object} data individual book data
 * @param {string} type either `TYPE_LIST_BOOKSHELF` or `TYPE_LIST_RESULTS`
 *
 */
export default function ActionButton({ data, type }) {
  const { addBook, bookshelf, removeBook } = useContext(Context);
  const classes = useStyles();
  const isBookshelf = type === TYPE_LIST_BOOKSHELF;

  const disabled = !isBookshelf && data.id in bookshelf;

  const btnTxt = isBookshelf
    ? "Remove"
    : disabled
    ? "Already in bookshelf"
    : "Add";

  const handleClick = isBookshelf
    ? () => removeBook(data.id)
    : () => addBook(data);

  return (
    <CardActions className={classes.button}>
      <Button
        color="primary"
        disabled={disabled}
        onClick={handleClick}
        size="small"
      >
        {btnTxt}
      </Button>
    </CardActions>
  );
}

ActionButton.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};
