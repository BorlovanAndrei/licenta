import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetPlansQuery } from "state/api";


const Plan = ({
    _id,
    name, 
    description,
    price,
    category,
    stat
})=> {
    const theme = useTheme();
    const [isExpended, setIsExpended] = useState(false);



    return(
        <Card 
        sx={{
            backgroundImage: "none",
            backgroundColor: theme.palette.background.alt,
            borderRadius: "0.55rem"
        }}
        >
            <CardContent>
                <Typography sx={{fontSize: 16}} color={theme.palette.secondary[700]} gutterBottom>
                    {category}
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{mb: "1.5rem"}} color={theme.palette.secondary[400]}>
                    ${Number(price).toFixed(2)}
                </Typography>

            </CardContent>
            <CardActions>
                <Button
                    variant="primary"
                    size="small"
                    onClick={() => setIsExpended(!isExpended)}
                >
                    See more
                </Button>
            </CardActions>
            <Collapse 
                in={isExpended}
                timeout="auto"
                unmountOnExit
                sx={{
                    color: theme.palette.secondary[300]
                }}  
            >
                <CardContent>
                    <Typography variant="h5">{description}</Typography>
                    <Typography>id: {_id}</Typography>
                    
                    {/* <Typography>Yearly Sales This Year: {stat.yearlySalesTotal}</Typography>
                    <Typography>Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}</Typography> */}
                </CardContent>
            </Collapse>
        </Card>
    )
}

const Plans = () => {
    const {data, isLoading} = useGetPlansQuery();
    const isNonMobile = useMediaQuery("(min-width: 1000px");
    console.log("data", data);
  return <Box m="1.5rem 2.5rem">

    <Header title="PLANS" subtitle="See all the plans!" />
    {data || !isLoading ? (
        <Box 
        mt="20px" 
        display="grid" 
        gridTemplateColumns="repeat(4, minmax(0, 1fr))" 
        justifyContent="space-between" 
        rowgap="20px" 
        columnGap="1.33%"
        sx={{
            "& > div": {gridColumn: isNonMobile ? undefined : "span 4"}
        }}
        >
            {data.map(({
                _id,
                name, 
                description,
                price,
                category,
                stat,
                
            }) => (
                <Plan 
                    key={_id}
                    _id={_id}
                    name={name}
                    description={description}
                    price={price}
                    category={category}
                    stat={stat}
                    
                />
            ))}
        </Box> 
    ) : ( 
        <>Loading...</>
    )}
  </Box>
}

export default Plans