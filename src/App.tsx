import { BrowserRouter } from "react-router-dom";
import { Dashboard2 } from "./screens2/Dashboard2";
import { RoutesNav } from "./routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <RoutesNav />
      </BrowserRouter>
    </>
  );
}

export default App;
