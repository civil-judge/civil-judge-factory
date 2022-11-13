import configureStore from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import { Router } from "./routes/index";
import { ToastContainer } from "react-toastify";
import { Scroll } from "./components/ScrollToTop/scroll";
import { ComingSoonRouter } from "./routes/comingsoon";
import { useLayoutEffect, useState } from "react";
import { getData } from "./helpers/FetchApi";

let { store, persistor } = configureStore();

function App() {
  const [isActive, setIsActive] = useState(true);

  const checkStatus = async () => {
    let status = await getData("web/checkStatus");
    if (status?.success) {
      setIsActive(status.isActive);
    }
  };

  useLayoutEffect(() => {
    checkStatus();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {isActive ? <Router /> : <ComingSoonRouter />}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme="colored"
          hideProgressBar={false}
          pauseOnFocusLoss={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
        />
        <Scroll />
      </PersistGate>
    </Provider>
  );
}

export default App;
