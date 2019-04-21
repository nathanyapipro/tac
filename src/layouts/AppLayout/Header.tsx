import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Theme, AppBar, Toolbar } from "@material-ui/core";
import SqlInjection from "../../components/icons/SqlInjection";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { StoreState } from "../../states";

const useStyles = makeStyles((theme: Theme) => ({
  appbar: {
    display: "flex",
    justifyItems: "center",
    color: theme.palette.primary.contrastText,
    boxShadow: theme.shadows[2]
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    height: "min-content",
    padding: ` ${theme.spacing.unit}px ${theme.spacing.unit * 3}px`
  },
  icon: {
    fontSize: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 2
  }
}));

interface ReduxDispatchProps {
  push: typeof push;
}

interface ReduxStateProps {}

interface OwnProps {}

type Props = OwnProps & ReduxDispatchProps & ReduxStateProps;

function HeaderBase(props: Props) {
  const classes = useStyles();
  const { push } = props;

  const handleBack = () => {
    push("/");
  };

  return (
    <AppBar onClick={handleBack} position="sticky" className={classes.appbar}>
      <Toolbar className={classes.toolbar} color="inherit">
        <SqlInjection className={classes.icon} color="inherit" />
        <Typography variant="h6" color="inherit">
          Test d'Allergies Croisées
          <Typography variant="caption" color="inherit">
            aux antibiotiques
          </Typography>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (_: StoreState): ReduxStateProps => {
  return {};
};

const Header = connect(
  mapStateToProps,
  {
    push
  }
)(HeaderBase);

export default Header;
