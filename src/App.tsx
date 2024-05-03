import { BrowserRouter, Routes, Route } from "react-router-dom";
import RubiksTimer from "./pages/RubiksTimer";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<RubiksTimer />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
