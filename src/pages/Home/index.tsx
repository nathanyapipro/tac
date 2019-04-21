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
import { valueTypeToValue } from "../../helpers/autocomplete";

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
  setAllergenicAntibioticId: (params: ValueType) => void;
  setPrescribedAntibioticId: (params: ValueType) => void;
}

interface ReduxStateProps {
  antibioticOptions: OptionsType;
  allergenicAntibioticId: ValueType;
  prescribedAntibioticId: ValueType;
}

type OwnProps = {};
type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

function HomeBase(props: Props) {
  const {
    antibioticOptions,
    allergenicAntibioticId,
    prescribedAntibioticId,
    setAllergenicAntibioticId,
    setPrescribedAntibioticId
  } = props;
  const classes = useStyles();

  const handleAllergicAntiobicIdChange = (
    valueType: ValueType,
    _: ActionMeta
  ) => {
    setAllergenicAntibioticId(valueType);
  };

  const handlePrescribedAntibioticChange = (
    valueType: ValueType,
    _: ActionMeta
  ) => {
    setPrescribedAntibioticId(valueType);
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
              onChange={handleAllergicAntiobicIdChange}
              placeholder=""
              value={allergenicAntibioticId}
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
              value={prescribedAntibioticId}
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
          disabled={
            prescribedAntibioticId === undefined ||
            allergenicAntibioticId === undefined
          }
          className={classes.button}
        >
          <Typography variant="body1" color="inherit">
            Effectuer un Test
          </Typography>
        </Button>
      </Card>
    </div>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  const { allergenicAntibioticId, prescribedAntibioticId } = state.global;
  return {
    allergenicAntibioticId,
    prescribedAntibioticId,
    antibioticOptions: $antibioticOptions(state)
  };
};

const Home = connect(
  mapStateToProps,
  {
    push,
    setAllergenicAntibioticId: actions.setAllergenicAntibioticId,
    setPrescribedAntibioticId: actions.setPrescribedAntibioticId
  }
)(HomeBase);

export default Home;
