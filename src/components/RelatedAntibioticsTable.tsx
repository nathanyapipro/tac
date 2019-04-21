import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Theme,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import { StoreState } from "../states";
import { connect } from "react-redux";
import {
  $relatedAntibiotics,
  AntiobiticsTableRow
} from "../states/global/selectors";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing.unit * 2
  },
  table: {},
  tableHead: {
    backgroundColor: "#fce4ec"
  },
  tableHeadRow: {
    height: theme.spacing.unit * 5
  },
  namesCell: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto"
  },
  commercialNames: {
    display: "flex",
    flexDirection: "row",
    flex: "1 1 auto"
  },
  commercialName: {
    paddingRight: theme.spacing.unit
  }
}));

interface ReduxDispatchProps {}

interface ReduxStateProps {
  data: Array<AntiobiticsTableRow>;
}

type OwnProps = {};
type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

function RelatedAntibioticsTableBase(props: Props) {
  const { data } = props;
  const classes = useStyles();
  return (
    <Card className={classes.container}>
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRow className={classes.tableHeadRow}>
            <TableCell padding="dense" colSpan={2}>
              <Typography color="textPrimary">Noms</Typography>
            </TableCell>
            <TableCell padding="dense">
              <Typography color="textPrimary">Classe</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell padding="dense" colSpan={2}>
                  <div className={classes.namesCell}>
                    <Typography color="textPrimary">{row.name}</Typography>
                    <div className={classes.commercialNames}>
                      {row.commercialNames.map((commercialName: string) => (
                        <Typography
                          className={classes.commercialName}
                          color="textSecondary"
                        >
                          {commercialName}
                        </Typography>
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell padding="dense">
                  <Typography color="textPrimary">{row.group}</Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  return {
    data: $relatedAntibiotics(state)
  };
};

const RelatedAntibioticsTable = connect(
  mapStateToProps,
  {}
)(RelatedAntibioticsTableBase);

export default RelatedAntibioticsTable;
