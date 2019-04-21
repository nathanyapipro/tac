import * as React from "react";
import classNames from "classnames";
import { makeStyles, useTheme } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import { default as ReactSelect } from "react-select";
import TextField from "@material-ui/core/TextField";
import { Props as ReactSelectProps } from "react-select/lib/Select";
import {
  ValueType as ReactValueType,
  OptionsType as ReactOptionsType,
  InputActionMeta
} from "react-select/lib/types";
import { SingleValueProps } from "react-select/lib/components/SingleValue";
import { PlaceholderProps } from "react-select/lib/components/Placeholder";
import { ControlProps } from "react-select/lib/components/Control";
import { NoticeProps, MenuProps } from "react-select/lib/components/Menu";
import { MultiValueProps } from "react-select/lib/components/MultiValue";
import { ValueContainerProps } from "react-select/lib/components/containers";
import { OptionProps } from "react-select/lib/components/Option";
import { debounce } from "../../helpers/functional";
import { SelectComponents } from "react-select/lib/components";

const DROPDOWN_HEIGHT = 250;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flex: "1 1 auto",
    width: "100%"
  },
  reactSelect: {
    width: "100%"
  },
  input: {
    display: "flex",
    flex: "1 1 auto",
    paddingRight: theme.spacing.unit * 0.5,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: "1 1 auto",
    alignItems: "center"
  },
  singleValue: {
    fontSize: "1rem"
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  placeholder: {
    position: "absolute",
    left: theme.spacing.unit * 2
  },
  paper: {
    position: "absolute",
    maxHeight: DROPDOWN_HEIGHT,
    zIndex: theme.zIndex.modal,
    overflow: "auto",
    left: 0,
    right: 0
  }
}));

function NoOptionsMessage(props: NoticeProps<OptionType>) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }: any) {
  return <div ref={inputRef} {...props} />;
}

function Control(props: ControlProps<OptionType>) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="none"
      InputLabelProps={{
        shrink: true
      }}
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props: OptionProps<OptionType>) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props: PlaceholderProps<OptionType>) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props: SingleValueProps<OptionType>) {
  return (
    <Typography
      color="textPrimary"
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props: ValueContainerProps<OptionType>) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function MultiValue(props: MultiValueProps<OptionType>) {
  return (
    <Chip
      variant="outlined"
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props: MenuProps<OptionType>) {
  return (
    <Paper
      elevation={8}
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

export type OptionType = { label: string; value: any };
export type OptionsType = ReactOptionsType<OptionType>;
export type ValueType = ReactValueType<OptionType>;

export interface AutocompleteProps extends ReactSelectProps {
  label?: string;
  minInputLength?: number;
  disableDebounce?: boolean;
  debounceTimeout?: number;
  defaultOptions?: OptionsType;
}

type Props = AutocompleteProps;

const Autocomplete = React.memo(function AutocompleteBase(props: Props) {
  const {
    id,
    label,
    onInputChange,
    disableDebounce,
    debounceTimeout = 250,
    minInputLength = 3,
    ...rest
  } = props;
  const theme = useTheme<any>();
  const classes = useStyles();

  const components: Partial<
    SelectComponents<{
      label: string;
      value: any;
    }>
  > = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer
  };

  const styles = {
    input: (base: React.CSSProperties) => ({
      ...base,
      display: "flex",
      flex: "1 1 auto",
      color: theme.palette.text.primary,
      "& input": {
        font: "inherit"
      }
    })
  };

  let maybeDebounceOnInputChange: AutocompleteProps["onInputChange"];
  if (onInputChange) {
    maybeDebounceOnInputChange = disableDebounce
      ? onInputChange
      : debounce(onInputChange, debounceTimeout);
  }

  const handleInputChange = (input: string, actionMeta: InputActionMeta) => {
    if (maybeDebounceOnInputChange && input.length >= minInputLength) {
      maybeDebounceOnInputChange(input, actionMeta);
    }
  };

  return (
    <div className={classes.root}>
      {
        // @ts-ignore
        <ReactSelect
          id={id}
          className={classes.reactSelect}
          styles={styles}
          classes={classes}
          onInputChange={handleInputChange}
          textFieldProps={{
            label
          }}
          components={components}
          {...rest}
        />
      }
    </div>
  );
});

export default Autocomplete;
