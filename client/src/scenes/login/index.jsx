import { LoginForm } from "components/LoginForm";
import { Box, useTheme, Typography } from '@mui/material';


export default function LoginPage(){
    const theme = useTheme();
    return <div>
        
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            bgcolor={theme.palette.primary[700]}
        >
            <Typography variant="h1"  color={theme.palette.secondary[200]} sx={{ marginTop: '10px', marginBottom:'-20' }}  >GymFit</Typography>
            <LoginForm />

        </Box>

    </div>
}