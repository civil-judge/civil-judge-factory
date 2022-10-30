import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

//Middleware
import thunk from 'redux-thunk';
const persistConfig = {
    key: 'state',
    storage: storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
    let store = createStore(
        persistedReducer,
        applyMiddleware(thunk)
    )
    let persistor = persistStore(store)
    return { store, persistor }
}