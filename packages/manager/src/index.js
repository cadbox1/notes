import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { reducer } from "very-nested-viewer";
import { ThemeProvider } from "theme-ui";
import theme from "./theme";

import App from "./frontend/App";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap-reboot.css";

const persistedReducer = persistReducer(
	{
		key: "root",
		storage,
	},
	reducer
);

export let persistor;

function configureStore() {
	// @ts-ignore
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const store = createStore(
		persistedReducer,
		composeEnhancers(applyMiddleware(thunk))
	);
	persistor = persistStore(store);
	return store;
}

ReactDOM.render(
	<Provider store={configureStore()}>
		<ThemeProvider theme={theme}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</ThemeProvider>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
