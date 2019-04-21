import * as React from "react";
import { push } from "connected-react-router";
import { makeStyles } from "@material-ui/styles";
import { Theme, Card, Button, Typography } from "@material-ui/core";
import { ActionMeta } from "react-select/lib/types";
import { StoreState } from "../../states";
import { connect } from "react-redux";
import Autocomplete, {
  OptionsType,
  ValueType
} from "../../components/Autocomplete";
import Field from "../../components/Field";
import { actions } from "../../states/global/actions";
import { $antibioticOptions } from "../../states/global/selectors";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flex: "1 0 auto",
    alignItems: "center",
    justifyContent: "center",
    padding: `${0}px ${theme.spacing.unit * 2}px`
  },
  content: {
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
  setAllergenicAntibiotic: (params: ValueType) => void;
  setPrescribedAntibiotic: (params: ValueType) => void;
}

interface ReduxStateProps {
  antibioticOptions: OptionsType;
  allergenicAntibioticValueType: ValueType;
  prescribedAntibioticValueType: ValueType;
}

type OwnProps = {};
type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

function HomeBase(props: Props) {
  const {
    antibioticOptions,
    allergenicAntibioticValueType,
    prescribedAntibioticValueType,
    setAllergenicAntibiotic,
    setPrescribedAntibiotic,
    push
  } = props;
  const classes = useStyles();

  const handleAllergicAntiobicChange = (
    valueType: ValueType,
    _: ActionMeta
  ) => {
    setAllergenicAntibiotic(valueType);
  };

  const handlePrescribedAntibioticChange = (
    valueType: ValueType,
    _: ActionMeta
  ) => {
    setPrescribedAntibiotic(valueType);
  };

  const handleSubmit = () => {
    push("/results");
  };

  return (
    <div className={classes.container}>
      <Card className={classes.content}>
        <Field
          label={"Antibiotique allergique"}
          input={
            <Autocomplete
              isClearable
              options={antibioticOptions}
              onChange={handleAllergicAntiobicChange}
              placeholder=""
              value={allergenicAntibioticValueType}
              isMulti={false}
            />
          }
        />
        <Field
          label={"Antibiotique prescrit"}
          input={
            <Autocomplete
              isClearable
              options={antibioticOptions}
              onChange={handlePrescribedAntibioticChange}
              placeholder=""
              value={prescribedAntibioticValueType}
              isMulti={false}
            />
          }
        />
        <Typography variant="caption" color="textSecondary">
          Pour effectuer un test d'allergies croisées, il faut que les deux
          champs soient remplis.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={
            prescribedAntibioticValueType === undefined ||
            allergenicAntibioticValueType === undefined
          }
          className={classes.button}
        >
          <Typography variant="body1" color="inherit">
            Effectuer le Test
          </Typography>
        </Button>
      </Card>
    </div>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  const { allergenicAntibiotic, prescribedAntibiotic } = state.global;
  return {
    allergenicAntibioticValueType:
      allergenicAntibiotic && allergenicAntibiotic.valueType,
    prescribedAntibioticValueType:
      prescribedAntibiotic && prescribedAntibiotic.valueType,
    antibioticOptions: $antibioticOptions(state)
  };
};

const Home = connect(
  mapStateToProps,
  {
    push,
    setAllergenicAntibiotic: actions.setAllergenicAntibiotic,
    setPrescribedAntibiotic: actions.setPrescribedAntibiotic
  }
)(HomeBase);

export default Home;
