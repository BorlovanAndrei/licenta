import React from 'react'
import {
    Box, 
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
    BorderClear,
  } from "@mui/icons-material";
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";


const navItems = [
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      text: "Client Facing",
      icon: null,
    },
    {
      text: "Plans",
      icon: <ShoppingCartOutlined />,
    },
    {
      text: "Members",
      icon: <Groups2Outlined />,
    },
    {
      text: "Transactions",
      icon: <ReceiptLongOutlined />,
    },
    {
        text: "Equipments",
        icon: <FitnessCenterIcon />,
    },
    {
        text: "Spendings",
        icon: <ReceiptLongOutlined />,
    },
    {
        text: "Trainers",
        icon: <PeopleIcon />,
    },
    {
        text: "Classes",
        icon: <EventIcon />,
    },
    {
      text: "Sales & Spendings",
      icon: null,
    },
    {
      text: "Overview",
      icon: <PointOfSaleOutlined />,
    },
    {
      text: "Daily",
      icon: <TodayOutlined />,
    },
    // {
    //   text: "Monthly",
    //   icon: <CalendarMonthOutlined />,
    // },
    {
      text: "Breakdown",
      icon: <PieChartOutlined />,
    },
    {
        text: "Manage",
        icon: null,
    },
    {
        text: "Log out",
        icon: <LogoutIcon />,
    }
  ];


const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile
}) => {
    const {pathname} = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();
    useEffect(() =>{
        setActive(pathname.substring(1));
    },[pathname]);

  return <Box component="nav">
    {isSidebarOpen && (
        <Drawer
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        variant="persistent"
        anchor="left"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            color: theme.palette.secondary[200],
            backgroundColor: theme.palette.background.alt,
            boxSixing: "border-box",
            borderWidth: isNonMobile ? 0 : "2px",
            width: drawerWidth,
          },
        }}
        >
            <Box width="100%">
                <Box m="1.5rem 2rem 2rem 3rem">
                <FlexBetween color={theme.palette.secondary.main}>
                    <Box display="flex" alignItems="center" gap="0.5rem">
                    <Typography variant="h4" fontWeight="bold">
                        GymFit
                    </Typography>
                    </Box>
                    {!isNonMobile && (
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <ChevronLeft />
                    </IconButton>
                    )}
                </FlexBetween>
                </Box>
                <List>
                    {navItems.map(({ text, icon }) => {
                        if (!icon) {
                        return (
                            <Typography key={text} sx={{ m: "1rem 0 1rem 3rem" }}>
                            {text}
                            </Typography>
                        );
                        }
                        const lcText = text.toLowerCase();

                        return (
                        <ListItem key={text} disablePadding>
                            <ListItemButton
                            onClick={() => {
                                navigate(`/${lcText}`);
                                setActive(lcText);
                            }}
                            sx={{
                                backgroundColor:
                                active === lcText
                                    ? theme.palette.secondary[300]
                                    : "transparent",
                                color:
                                active === lcText
                                    ? theme.palette.primary[600]
                                    : theme.palette.secondary[100],
                            }}
                            >
                            <ListItemIcon
                                sx={{
                                ml: "2rem",
                                color:
                                    active === lcText
                                    ? theme.palette.primary[600]
                                    : theme.palette.secondary[200],
                                }}
                            >
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                            {active === lcText && (
                                <ChevronRightOutlined sx={{ ml: "auto" }} />
                            )}
                            </ListItemButton>
                        </ListItem>
                        );
                    })}
                </List>
            </Box>
        </Drawer>
    )}
  </Box>
}

export default Sidebar