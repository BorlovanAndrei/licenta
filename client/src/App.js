import React, { useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { themeSettings } from 'theme';
import Layout from 'scenes/layout';
import Dashboard from 'scenes/dashboard';
import Plans from 'scenes/plans';
import Members from 'scenes/members';
import Transaction from 'scenes/transactions';
import Overview from 'scenes/overview';
import Breakdown from 'scenes/revenue';
import Equipments from 'scenes/equipments';
import Expenditure from 'scenes/expenditure';
import Spendings from 'scenes/spendings';
import Trainers from 'scenes/trainers';
import Login from 'scenes/login';
import RequireAuth from 'components/RequireAuth';
import Logout from 'scenes/logout';

function App() {
    const mode = useSelector((state) => state.global.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace />} />s
                        <Route path="/login" element={<Login/>} />
                        <Route element={<Layout />}>
                        <Route path="dashboard" index element={<RequireAuth><Dashboard/></RequireAuth>} />
                                <Route path="/plans" element={<RequireAuth><Plans /></RequireAuth> } />
                                <Route path="/members" element={<RequireAuth><Members /></RequireAuth>} />
                                <Route path="/transactions" element={<RequireAuth><Transaction /></RequireAuth>} />
                                <Route path="/equipments" element={<RequireAuth><Equipments /></RequireAuth>} />
                                <Route path="/spendings" element={<RequireAuth><Spendings /></RequireAuth>} />
                                <Route path="/trainers" element={<RequireAuth><Trainers /></RequireAuth>} />
                                <Route path="/overview" element={<RequireAuth><Overview /></RequireAuth>} />
                                <Route path="/revenue" element={<RequireAuth><Breakdown /></RequireAuth>} />
                                <Route path="/expenditure" element={<RequireAuth><Expenditure /></RequireAuth>} />
                                <Route path="/logout" element={<RequireAuth><Logout /></RequireAuth>} />
                                <Route path="/:searchQuery" element={<Navigate to="/dashboard" replace />} />
                            </Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;


