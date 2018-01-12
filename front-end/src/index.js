import React from 'react';
import ReactDOM from 'react-dom';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import App from './App';

const theme = createMuiTheme();

function Application() {
  return (
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  );
}

ReactDOM.render(<Application />, document.getElementById('root'));
registerServiceWorker();
