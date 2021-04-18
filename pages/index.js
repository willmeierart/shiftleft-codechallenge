// PACKAGES
import React from "react";
// UI
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// COMPONENTS
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
// UTILS
import { TYPE_LIST_BOOKSHELF, TYPE_LIST_SEARCH } from "../lib/constants";

export const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
}));

/**
 * @Component
 * Homepage component
 *
 */
export default function Home() {
  const classes = useStyles();
  return (
    <main>
      <Paper>
        <Container>
          <section>
            <Paper>
              <Container className={classes.container}>
                <Typography component="h1" gutterBottom variant="h4">
                  Search
                </Typography>
                <Container>
                  <SearchBar />
                </Container>
                <BookList type={TYPE_LIST_SEARCH} />
              </Container>
            </Paper>
          </section>
          <section>
            <Paper>
              <Container className={classes.container}>
                <Typography component="h1" gutterBottom variant="h4">
                  Bookshelf
                </Typography>
                <BookList type={TYPE_LIST_BOOKSHELF} />
              </Container>
            </Paper>
          </section>
        </Container>
      </Paper>
    </main>
  );
}
