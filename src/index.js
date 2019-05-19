import React from 'react';
import { render } from 'react-dom'
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers/index'
import Footer from './components/footer'
import Header from './components/header'

const API_HOST = `localhost:9999`

const store = createStore(rootReducer)

render(
    <Provider store={store}>
        <Header />
        <App />
        <Footer />
    </Provider>,
    document.getElementById('root')
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default API_HOST
