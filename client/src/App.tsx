import { ThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import './App.scss';
import { Main } from './components/Main';
import { colors } from './const';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.darkHard,
    },
    secondary: {
      main: colors.orangeMain
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <br/>
        <br/>
        <br/>
        <Main />
      </div>
    </ThemeProvider>
  );
}

export default App;
