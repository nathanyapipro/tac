import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Theme, AppBar, Toolbar } from "@material-ui/core";
import SqlInjection from "../../components/icons/SqlInjection";

interface OwnProps {}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  appbar: {
    display: "flex",
    justifyItems: "center",
    color: theme.palette.primary.contrastText,
    boxShadow: theme.shadows[3]
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
  },
  title: {
    color: "inherit",
    textAlign: "center"
  }
}));

function HeaderBase(_: Props) {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.appbar}>
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

const Header = HeaderBase;

export default Header;
