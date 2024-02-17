import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Home from './src/screens/Home';
import configureStore from './src/Redux';
import MainStackNavigator from './src/navigators/navigation';

const App = () => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <MainStackNavigator />
    </Provider>
  );
};

export default App;
