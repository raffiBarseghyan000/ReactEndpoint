import React from 'react'
import {render} from 'react-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './reducers/index'
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer,
    compose(applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

sagaMiddleware.run(rootSaga)

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
