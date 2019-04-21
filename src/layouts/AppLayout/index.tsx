import * as React from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import { makeStyles } from "@material-ui/styles";
import Header from "./Header";
import Footer from "./Footer";
interface OwnProps {
  children: React.ReactChild;
}

type Props = OwnProps;

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto"
  },
  children: {
    display: "flex",
    flexDirection: "column",
    flex: "1 0 auto"
  }
}));

function AppLayoutBase(props: Props) {
  const { children } = props;

  const classes = useStyles();

  return (
    <main className={classes.container}>
      <Header />
      <ErrorBoundary>
        <div className={classes.children}>{children}</div>
      </ErrorBoundary>
      <Footer />
    </main>
  );
}

const AppLayout = AppLayoutBase;

export default AppLayout;
