import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListDetailPage from "./pages/ListDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/lists/:id" element={<ListDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
