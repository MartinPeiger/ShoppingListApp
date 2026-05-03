import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListDetailPage from "./pages/ListDetailPage";
import ListOverviewPage from "./pages/ListOverviewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/lists/:id" element={<ListDetailPage />} />
        <Route path="/lists" element={<ListOverviewPage />} />
        <Route path="/" element={<ListOverviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
