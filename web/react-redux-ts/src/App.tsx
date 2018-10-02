import * as React from 'react'
import './App.css'
import { Provider } from 'react-redux'

import AsyncApp from './AsyncApp'
import configureStore from './configureStore'

const store = configureStore()

interface IProps {}

class App extends React.Component<IProps> {
  public render() {
    return (
      <Provider store={store}>
        <AsyncApp />
      </Provider>
    );
  }
}

export default App;
