import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme, Card, Typography } from "@material-ui/core";
import classNames from "classnames";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import WarningIcon from "@material-ui/icons/Warning";
import { Result as ResultType } from "../states/global/selectors";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.unit * 2
  },
  icon: {
    margin: `0px ${theme.spacing.unit * 2}px 0px 0px`,
    fontSize: theme.spacing.unit * 4
  },
  low: {
    color: "#148E45"
  },
  medium: {
    color: "#FF7F41"
  },
  high: {
    color: "#D84769"
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  resultText: {
    fontWeight: 700
  }
}));

type OwnProps = {
  result: ResultType;
};

type Props = OwnProps;

function ResultBase(props: Props) {
  const { result } = props;
  const classes = useStyles();

  const renderWarning = () => (
    <Typography variant="caption">
      Ce test ne remplace pas l'avis d'un professionnel de la santé. Si une
      allergie est soupçonnée, veuillez-vous référer au médecin traitant.
    </Typography>
  );

  const renderIcon = () => {
    switch (result) {
      case ResultType.UNKNOWN:
        return <noscript />;
      case ResultType.LOW:
        return (
          <CheckCircleIcon className={classNames(classes.icon, classes.low)} />
        );
      case ResultType.MEDIUM:
        return (
          <WarningIcon className={classNames(classes.icon, classes.medium)} />
        );
      case ResultType.HIGH:
        return (
          <CancelIcon className={classNames(classes.icon, classes.high)} />
        );
    }
  };

  const renderText = () => {
    switch (result) {
      case ResultType.UNKNOWN:
        return <noscript />;
      case ResultType.LOW:
        return (
          <Typography variant="body1" className={classes.resultText}>
            Faible risque d'allergie croisée
          </Typography>
        );
      case ResultType.MEDIUM:
        return (
          <Typography variant="body1" className={classes.resultText}>
            Potentiel risque d'allergie croisée
          </Typography>
        );
      case ResultType.HIGH:
        return (
          <Typography variant="body1" className={classes.resultText}>
            Grand risque d'allergie croisée
          </Typography>
        );
    }
  };

  return (
    <Card className={classes.container}>
      {renderIcon()}
      <div className={classes.content}>
        {renderText()}
        {renderWarning()}
      </div>
    </Card>
  );
}
const Result = ResultBase;
export default Result;
