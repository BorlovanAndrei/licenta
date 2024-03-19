// import { Dashboard } from "@mui/icons-material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {createTheme} from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout"
import Dashboard from "scenes/dashboard";
import Plans from "scenes/plans";
import Members from "scenes/members";
import Transaction from "scenes/transactions";
import Overview from "scenes/overview";
import Breakdown from "scenes/breakdown";
import Equipments from "scenes/equipments";
import Expenditure from "scenes/expenditure";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout/>}>
              <Route path="/" element={<Navigate to="/dashboard" replace />}/>
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/plans" element={<Plans/>} />
              <Route path="/members" element={<Members/>} />
              <Route path="/transactions" element={<Transaction/>} />
              <Route path="/equipments" element={<Equipments/>} />
              <Route path="/overview" element={<Overview/>} />
              <Route path="/revenue" element={<Breakdown />} />
              <Route path="/expenditure" element={<Expenditure />} />
              
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
