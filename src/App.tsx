import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import RubiksTimerPage from "./pages/RubiksTimerPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<RubiksTimerPage />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
