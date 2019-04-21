import * as React from "react";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/styles";
import { Theme, Button } from "@material-ui/core";
import { StoreState } from "../../states";
import { connect } from "react-redux";
import { ValueType } from "../../components/Autocomplete";
import { actions } from "../../states/global/actions";
import { $result, Result as ResultType } from "../../states/global/selectors";
import Result from "../../components/Result";
import TestInfo from "../../components/TestInfo";
import RelatedAntibioticsTable from "../../components/RelatedAntibioticsTable";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flex: "0 0 auto",
    justifyContent: "center",
    margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: "0 1 auto",
    width: theme.spacing.unit * 50,
    maxWidth: `calc(100vw - ${theme.spacing.unit * 4}px)`,
    overflow: "visible"
  },
  icon: {
    marginRight: theme.spacing.unit * 2
  },
  button: {
    marginTop: theme.spacing.unit * 2
  }
}));

interface ReduxDispatchProps {
  push: typeof push;
  setAllergenicAntibiotic: (params: ValueType) => void;
  setPrescribedAntibiotic: (params: ValueType) => void;
}

interface ReduxStateProps {
  result: ResultType;
}

type OwnProps = {};
type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

function ResultsBase(props: Props) {
  const {
    result,
    push,
    setAllergenicAntibiotic,
    setPrescribedAntibiotic
  } = props;
  const classes = useStyles();

  if (result === ResultType.UNKNOWN) {
    push("/");
  }

  const handleBack = () => {
    setAllergenicAntibiotic(undefined);
    setPrescribedAntibiotic(undefined);
    push("/");
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <TestInfo />
        <Result result={result} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleBack}
          className={classes.button}
        >
          <ArrowBackIcon className={classes.icon} color="inherit" />
          Effectuer un autre Test
        </Button>
        <RelatedAntibioticsTable />
      </div>
    </div>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  return {
    result: $result(state)
  };
};

const Results = connect(
  mapStateToProps,
  {
    push,
    setAllergenicAntibiotic: actions.setAllergenicAntibiotic,
    setPrescribedAntibiotic: actions.setPrescribedAntibiotic
  }
)(ResultsBase);

export default Results;
