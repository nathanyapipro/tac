import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Card, Typography, Theme } from "@material-ui/core";
import { connect } from "react-redux";
import { StoreState } from "../states";
import Field from "./Field";

interface ReduxDispatchProps {}

interface ReduxStateProps {
  allergenicAntibioticName?: string;
  prescribedAntibioticName?: string;
}

interface OwnProps {}

type Props = OwnProps & ReduxDispatchProps & ReduxStateProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  info: {
    width: theme.spacing.unit * 20
  }
}));

function TestInfoBase(props: Props) {
  const { allergenicAntibioticName, prescribedAntibioticName } = props;
  const classes = useStyles();

  return (
    <Card className={classes.container}>
      <Field
        label={"Antibiotique allergique"}
        input={
          <Typography
            className={classes.info}
            variant="body1"
            color="textPrimary"
            noWrap
          >
            {allergenicAntibioticName}
          </Typography>
        }
      />
      <Field
        label={"Antibiotique prescrit"}
        input={
          <Typography
            className={classes.info}
            variant="body1"
            color="textPrimary"
            noWrap
          >
            {prescribedAntibioticName}
          </Typography>
        }
      />
    </Card>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  const { allergenicAntibiotic, prescribedAntibiotic } = state.global;
  return {
    allergenicAntibioticName:
      allergenicAntibiotic && allergenicAntibiotic.antibiotic.name,
    prescribedAntibioticName:
      prescribedAntibiotic && prescribedAntibiotic.antibiotic.name
  };
};

const TestInfo = connect(
  mapStateToProps,
  {}
)(TestInfoBase);

export default TestInfo;
