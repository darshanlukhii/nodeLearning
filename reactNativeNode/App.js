import React, {Component} from 'react';
import {Provider} from 'react-redux';
import MainStackNavigator from './src/navigators/navigation';
import ToastComponent from './src/components/common/ToastComponent';
import {store} from './src/Redux/index';

const App = () => {
  return (
    <Provider store={store}>
      <MainStackNavigator />
      <ToastComponent />
    </Provider>
  );
};

export default App;
