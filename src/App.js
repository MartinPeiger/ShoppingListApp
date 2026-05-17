import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListDetailPage from "./pages/ListDetailPage";
import ListOverviewPage from "./pages/ListOverviewPage";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/lists/:id" element={<ListDetailPage />} />
            <Route path="/lists" element={<ListOverviewPage />} />
            <Route path="/" element={<ListOverviewPage />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
