import * as React from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import { makeStyles } from "@material-ui/styles";

export const DEFAULT_USERS_PER_PAGE = 50;

interface OwnProps {
  children: React.ReactChild;
}

type Props = OwnProps;

const useStyles = makeStyles(() => ({
  main: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto"
  }
}));

function AppLayoutBase(props: Props) {
  const { children } = props;

  const classes = useStyles();

  return (
    <main className={classes.main}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </main>
  );
}

const AppLayout = AppLayoutBase;

export default AppLayout;
