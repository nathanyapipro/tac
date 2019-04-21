import * as React from "react";
import { Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: "1 0 auto",
    marginBottom: theme.spacing.unit
  }
}));

type OwnProps = {
  label: string;
  input: React.ReactNode;
};

type Props = OwnProps;

function Field(props: Props) {
  const { label, input } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="caption" color="textSecondary">
        {label}
      </Typography>
      {input}
    </div>
  );
}

export default React.memo(Field);
