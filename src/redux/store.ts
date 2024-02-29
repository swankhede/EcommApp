import { createStore,applyMiddleware } from "redux";

import { combineReducers } from "redux";
import appReducer from "./appReducer";
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk'

const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
    blacklist:['navigation']
  }

const persistedReducer = persistReducer(persistConfig, appReducer)

export default () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
  }

