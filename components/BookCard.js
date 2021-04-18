// PACKAGES
import React from "react";
import PropTypes from "prop-types";
// UI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// COMPONENTS
import ActionButton from "./ActionButton";

const useStyles = makeStyles({
  image: {
    height: 140,
  },
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
    margin: ".5rem",
    maxWidth: 345,
    minWidth: 200,
  },
});

/**
 * @Component
 * Display card for book data
 * @param {object} data individual book data
 * @param {string} type either `TYPE_LIST_BOOKSHELF` or `TYPE_LIST_RESULTS`
 *
 */
export default function BookCard({ data, type }) {
  const classes = useStyles();
  const { author, image, title } = data;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.image}
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography component="h2" gutterBottom variant="body1">
            {title}
          </Typography>
          <Typography component="h3" gutterBottom variant="body1">
            {author}
          </Typography>
        </CardContent>
      </CardActionArea>
      <ActionButton data={data} type={type} />
    </Card>
  );
}

BookCard.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};
