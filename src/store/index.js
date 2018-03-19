import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import 'regenerator-runtime/runtime';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducer';
import saga from '../sagas';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, thunk));

const store = createStore(reducer, enhancer);

sagaMiddleware.run(saga);

//dev only
window.store = store;

export default store;
