import * as React from "react";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/styles";
import {
  Theme
  // Card, CardContent, Typography
} from "@material-ui/core";
import { StoreState } from "../../states";
import { connect } from "react-redux";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column"
  }
}));

interface ReduxDispatchProps {
  push: typeof push;
}

interface ReduxStateProps {}

type OwnProps = {};
type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

function HomeBase(_: Props) {
  const classes = useStyles();

  return <div className={classes.container} />;
}

const mapStateToProps = (_: StoreState): ReduxStateProps => {
  return {};
};

const Home = connect(
  mapStateToProps,
  {
    push
  }
)(HomeBase);

export default Home;
