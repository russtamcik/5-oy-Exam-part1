import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import PropTypes from "prop-types";

import { rootReducer } from "../reducers/rootReducer";

// export const Store = createStore(rootReducer, applyMiddleware(thunk));

// export const Store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

export const Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const StoreProvider = ({ children }) => {
  return <Provider store={Store}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

export default StoreProvider;
