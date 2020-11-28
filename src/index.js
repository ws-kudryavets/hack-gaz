import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {
    Switch, Route, BrowserRouter as Router
} from 'react-router-dom';
import { Provider } from 'react-redux';
import {
    createStore, applyMiddleware, compose
} from 'redux';
import reduxThunk from 'redux-thunk';
import App from './App';
import Regist from './components/Regist/regist';
import Login from './components/Login/Login';
import reducers from './reducers';
import NavBar from "./components/Navbar";
import styled from 'styled-components';
import TopBar from "./components/TopBar/TopBar";
import Panel from "./components/ClientPanel";
import NewVacancy from "./components/NewVacancy";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
);

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
`
const NavRoute = ({exact, path, component: Component}) => (
    <Route exact={exact} path={path} render={(props) => (
        <Container>
            <NavBar/>
            <div style={{width: '100%'}}>
                <TopBar/>
                <div style={{display: 'flex', flexDirection: 'row', height: 'calc(100% - 178px)'}}>
                    <Panel/>
                    <Component {...props}/>
                </div>
            </div>
        </Container>
    )}/>
)

const NavRoute1 = ({exact, path, component: Component}) => (
    <Route exact={exact} path={path} render={(props) => (
        <Container>
            <NavBar/>
            <div style={{width: '100%', }}>
                    <Component {...props}/>
            </div>
        </Container>
    )}/>
)


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Switch>
                    <NavRoute
                        exact
                        path="/"
                        component={App}
                    />
                    <Route
                        exact
                        path="/login"
                        component={Login}
                    />
                    <Route
                        exact
                        path="/regist"
                        component={Regist}
                    />
                    <NavRoute1
                        exact
                        path="/new-vac"
                        component={NewVacancy}
                    />
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
