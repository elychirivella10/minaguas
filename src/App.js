import React from 'react';

//css
import 'normalize.css/normalize.css'
import './css/bulma.css'
import './css/index.css'
//redux
import { Provider } from 'react-redux';
import store from './store';

//Routes
import Routes from './routes/Routes'


function App() {
  return (
    <Provider store = {store}>

        	<Routes/>

    </Provider>
  );
}

export default App;
