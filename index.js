/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { name as appName } from './app.json';
import stores from './src/redux/store';
const ReduxProvider = () => {
    const { store, persistor } = stores()

    return (

        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>

        </Provider>
    )


}


AppRegistry.registerComponent(appName, () => ReduxProvider);
