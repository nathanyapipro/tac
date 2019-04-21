import * as React from "react";
import {
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline
} from "@material-ui/core";
import spacing from "@material-ui/core/styles/spacing";
import grey from "@material-ui/core/colors/grey";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: "#b22c5a",
      main: "#ff4081",
      light: "#ff669a"
    },
    background: {
      default: grey[100]
    }
  },
  typography: {
    useNextVariants: true,
    fontSize: 14
  },
  shape: {
    borderRadius: spacing.unit / 2
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "unset"
      }
    }
  }
});

interface WrappedComponentProps {}

function withTheme<P extends WrappedComponentProps>(
  Component: React.ComponentType<P>
) {
  function WithTheme(props: P) {
    return (
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...props} />
        </MuiThemeProvider>
      </ThemeProvider>
    );
  }

  return WithTheme;
}

export default withTheme;
