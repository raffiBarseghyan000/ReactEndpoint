import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Main from './main.js'
import Login from './login.js'

let renderLogin = true

function renderMain() {
    renderLogin = false
    renderDom()
}

function renderDom() {
    if(renderLogin) {
        ReactDOM.render(<Login renderMain={renderMain}/>, document.getElementById('root'));
    }
    else {
        ReactDOM.render(<Main />, document.getElementById('root'));
    }
}

renderDom()


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
