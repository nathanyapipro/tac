import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, Theme } from "@material-ui/core";

interface OwnProps {}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignItems: "center",
    margin: theme.spacing.unit
  }
}));

function FooterBase(_: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography color="textSecondary" variant="caption">
        Inspiré par Véronique Stark
      </Typography>
      <Typography color="textSecondary" variant="caption">
        Développé par Nathan Yapi
      </Typography>
    </div>
  );
}

const Footer = FooterBase;

export default Footer;
