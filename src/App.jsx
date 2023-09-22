import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { AuthContext } from "./utils/Authcontext";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
       <BrowserRouter>
         <Router />
        </BrowserRouter>
  );
}

export default App;
