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
  Modal,
  TextField
} from "@mui/material";
import Header from "components/Header";
import { useGetPlansQuery, useCreatePlanMutation, useDeletePlanMutation, useUpdatePlanMutation } from "state/api";


const Plan = ({
    _id,
    name, 
    description,
    price,
    category
})=> {
    const theme = useTheme();
    const [isExpended, setIsExpended] = useState(false);

    const {refetch} = useGetPlansQuery();
    const [isEditing, setIsEditing] = useState(false);
    const [deletePlan] = useDeletePlanMutation();
    const [updatePlan] = useUpdatePlanMutation();
    const [editedPlanData, setEditedPlanData] = useState({
        name,
        description,
        price,
        category
    });

    const handleEdit = () => {
      setIsEditing(true);
  };

  const handleDelete = async () => {
      try {
          await deletePlan(_id);
          refetch();
      } catch (error) {
          console.error("Failed to delete plan:", error);
      }
  };

  const handleUpdate = async () => {
      try {
          await updatePlan({ planId: _id, ...editedPlanData });
          setIsEditing(false);
          refetch();
      } catch (error) {
          console.error("Failed to update plan:", error);
      }
  };

  //untill here

    return(
        <Card 
        sx={{
            backgroundImage: "none",
            backgroundColor: theme.palette.background.alt,
            borderRadius: "0.55rem",
            marginBottom: '1rem'
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
                <Button
                    variant="outlined"
                    size="small"
                    onClick={handleEdit}
                    sx={{ color: 'white' }}
                >
                    Edit
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={handleDelete}
                    sx={{ color: 'white' }}
                >
                    Delete
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
                </CardContent>
            </Collapse>
            <Modal open={isEditing} onClose={() => setIsEditing(false)}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: '80vw' }}>
                    <Typography variant="h6" gutterBottom>Edit Plan</Typography>
                    <TextField
                        label="Name"
                        value={editedPlanData.name}
                        onChange={(e) => setEditedPlanData({ ...editedPlanData, name: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        value={editedPlanData.description}
                        onChange={(e) => setEditedPlanData({ ...editedPlanData, description: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Price"
                        value={editedPlanData.price}
                        onChange={(e) => setEditedPlanData({ ...editedPlanData, price: e.target.value })}
                        fullWidth
                        margin="normal"
                        type="number"
                    />
                    <TextField
                        label="Category"
                        value={editedPlanData.category}
                        onChange={(e) => setEditedPlanData({ ...editedPlanData, category: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" sx={{color: "white"}} onClick={handleUpdate}>Update Plan</Button>
                </Box>
            </Modal>
        </Card>
    )
}
//

const Plans = () => {
    const {data, isLoading, refetch} = useGetPlansQuery();
    const isNonMobile = useMediaQuery("(min-width: 1000px");
    console.log("data", data);

    const [isAddingPlan, setIsAddingPlan] = useState(false);
  const [newPlanData, setNewPlanData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [createPlan, { isLoading: isCreatingPlan }] = useCreatePlanMutation();

  const handleAddPlan = async () => {
    try {
      await createPlan(newPlanData).unwrap();
      setIsAddingPlan(false);
      refetch();
      setNewPlanData({
        name: "",
        description: "",
        price: "",
        category: "",
      });
    } catch (error) {
      console.error("Failed to add plan:", error);
    }
  };


  return <Box m="1.5rem 2.5rem">
        <Button variant="contained" sx={{color: "white"}} onClick={() => setIsAddingPlan(true)}>
        Add New Plan
      </Button>
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

<Modal open={isAddingPlan} onClose={() => setIsAddingPlan(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: '80vw' }}>
          <Typography variant="h6" gutterBottom>Add New Plan</Typography>
          <TextField
            label="Name"
            value={newPlanData.name}
            onChange={(e) => setNewPlanData({ ...newPlanData, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={newPlanData.description}
            onChange={(e) => setNewPlanData({ ...newPlanData, description: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            value={newPlanData.price}
            onChange={(e) => setNewPlanData({ ...newPlanData, price: e.target.value })}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Category"
            value={newPlanData.category}
            onChange={(e) => setNewPlanData({ ...newPlanData, category: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" sx={{color: "white"}} onClick={handleAddPlan} disabled={isCreatingPlan}>Add Plan</Button>
        </Box>
      </Modal>



  </Box>
}

export default Plans