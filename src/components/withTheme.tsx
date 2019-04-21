import * as React from "react";
import {
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  // palette: {
  //   primary: {
  //     light: Colors.purple[50],
  //     main: Colors.purple[500],
  //     dark: Colors.purple[700]
  //   },
  //   background: {
  //     default: Colors.grey[100]
  //   }
  // },
  // mixins: {
  //   toolbar: {
  //     minHeight: defaultTheme.spacing.unit * 8
  //   }
  // },
  // overrides: {
  //   MuiAppBar: {
  //     root: {
  //       boxShadow: defaultTheme.shadows[1]
  //     },
  //     colorDefault: {
  //       backgroundColor: Colors.darkGrey[900],
  //       color: "white"
  //     }
  //   }
  // }
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
