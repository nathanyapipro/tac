import * as React from "react";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/styles";
import {
  Theme,
  Card
  //  Button, Typography
} from "@material-ui/core";
import { StoreState } from "../../states";
import { connect } from "react-redux";
import { ValueType } from "../../components/Autocomplete";
import { actions } from "../../states/global/actions";
import { Antibiotic } from "../../states/global/reducer";
import { valueTypeToValue } from "../../helpers/autocomplete";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flex: "0 0 auto",
    justifyContent: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`
  },
  result: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
    padding: theme.spacing.unit * 2,
    maxWidth: theme.spacing.unit * 50,
    overflow: "visible"
  },
  button: {
    marginTop: theme.spacing.unit
  }
}));

interface ReduxDispatchProps {
  push: typeof push;
  setAllergenicAntibioticId: (params: ValueType) => void;
  setPrescribedAntibioticId: (params: ValueType) => void;
}

interface ReduxStateProps {
  allergicAntibiotic?: Antibiotic;
  prescribedAntibiotic?: Antibiotic;
}

type OwnProps = {};
type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

function ResultBase(props: Props) {
  const { allergicAntibiotic, prescribedAntibiotic, push } = props;
  const classes = useStyles();

  if (!allergicAntibiotic || !prescribedAntibiotic) {
    push("/");
  }

  return (
    <div className={classes.container}>
      <Card className={classes.result} />
    </div>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  const {
    allergenicAntibioticId,
    prescribedAntibioticId,
    antibiotics
  } = state.global;
  const allergicAntibiotic = allergenicAntibioticId
    ? antibiotics[valueTypeToValue<string>(allergenicAntibioticId)]
    : undefined;
  const prescribedAntibiotic = prescribedAntibioticId
    ? antibiotics[valueTypeToValue<string>(prescribedAntibioticId)]
    : undefined;
  return {
    allergicAntibiotic,
    prescribedAntibiotic
  };
};

const Result = connect(
  mapStateToProps,
  {
    push,
    setAllergenicAntibioticId: actions.setAllergenicAntibioticId,
    setPrescribedAntibioticId: actions.setPrescribedAntibioticId
  }
)(ResultBase);

export default Result;
