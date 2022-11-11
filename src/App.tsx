import { Provider } from "react-redux";
import { useRoutes } from "react-router-dom";

import CelebritiesStore from "./stores/Celebrities";
import routes from "./routes";

const App = () => {
  return <Provider store={CelebritiesStore}>{useRoutes(routes)}</Provider>;
};

export default App;
