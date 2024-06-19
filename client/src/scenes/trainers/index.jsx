import React, { useState } from 'react';
import { Box, useTheme, Button, Modal, TextField } from "@mui/material";
import { useGetTrainersQuery, useCreateTrainerMutation, useUpdateTrainerMutation, useDeleteTrainerMutation } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Trainers = () => {
    const theme = useTheme();
    const {data, isLoading, refetch} = useGetTrainersQuery();
    console.log("data", data);
    const [isAddingTrainer, setIsAddingTrainer] = useState(false);
    const [isEditingTrainer, setIsEditingTrainer] = useState(false);
    const [newTrainerData, setNewTrainerData] = useState({
      name: '',
      age: '',
      email: '',
      phoneNumber: '',
      address: '',
    });

    const [editTrainerData, setEditTrainerData] = useState({
      id: '',
      name: '',
      age: '',
      email: '',
      phoneNumber: '',
      address: '',
  });

    const [createTrainer, { isLoading: isCreatingTrainer }] = useCreateTrainerMutation();

    const [updateTrainer] = useUpdateTrainerMutation();
    const [deleteTrainer] = useDeleteTrainerMutation();


    const handleAddTrainer = async () => {
      try {
        await createTrainer(newTrainerData).unwrap();
        setIsAddingTrainer(false);
        refetch();
        setNewTrainerData({
          name: '',
          age: '',
          email: '',
          phoneNumber: '',
          address: '',
        });
      } catch (error) {
        console.error('Failed to add trainer:', error);
      }
    };

    const handleEditTrainer = async () => {
      try {
          await updateTrainer({ trainerId: editTrainerData.id, ...editTrainerData }).unwrap();
          setIsEditingTrainer(false);
          refetch();
          setEditTrainerData({
              id: '',
              name: '',
              age: '',
              email: '',
              phoneNumber: '',
              address: '',
          });
      } catch (error) {
          console.error('Failed to edit trainer:', error);
      }
  };

  const handleDeleteTrainer = async (trainerId) => {
    try {
        await deleteTrainer(trainerId).unwrap();
        refetch();
    } catch (error) {
        console.error('Failed to delete trainer:', error);
    }
};


    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 0.5,
        },
        {
            field: "age",
            headerName: "Age",
            flex: 0.5,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 0.5,
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: 0.5,
            renderCell: (params) => {
                return params.value.replace(/^(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")
            }
        },
        {
            field: "address",
            headerName: "Address",
            flex: 0.5,
        },
        {
          field: "edit",
          headerName: "Edit",
          flex: 0.5,
          renderCell: (params) => {
            return (
              <Button sx={{color: "white"}} onClick={() => handleEditClick(params.row)}>Edit</Button>
              )
        }
        },
        {
          field: "delete",
          headerName: "Delete",
          flex: 0.5,
          renderCell: (params) => {
            const trainerId = params.row._id;
            return (
              <Box>
                <Button sx={{color: "white"}} onClick={() => handleDeleteTrainer(trainerId)}>Delete</Button>
              </Box>
            )
        }
      }
        
    ];

    const handleEditClick = (trainer) => {
      setIsEditingTrainer(true);
      setEditTrainerData({
        id: trainer._id, 
        name: trainer.name,
        age: trainer.age,
        email: trainer.email,
        phoneNumber: trainer.phoneNumber,
        address: trainer.address,
      });
  };

   
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="TRAINERS" subtitle={"List of Trainers"}/>

        <Button variant="contained" sx={{color: theme.palette.secondary[100]}} onClick={() => setIsAddingTrainer(true)}>
        Add Trainer
      </Button>

        <Box 
            mt="40px" 
            height="75vh"
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderBottom: "none",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: theme.palette.primary.light,
                  },
                  "& .MuiDataGrid-footerContainer": {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderTop: "none",
                  },
                  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${theme.palette.secondary[200]} !important`,
                  },
            }}    
        >
            <DataGrid 
                loading={isLoading || !data}
                getRowId={(row) => row._id}
                rows={data || []}
                columns={columns}
            />
        </Box>
        
        <Modal open={isAddingTrainer} onClose={() => setIsAddingTrainer(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            maxWidth: '80vw',
          }}
        >
          <TextField
            label="Name"
            value={newTrainerData.name}
            onChange={(e) => setNewTrainerData({ ...newTrainerData, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Age"
            value={newTrainerData.age}
            onChange={(e) => setNewTrainerData({ ...newTrainerData, age: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={newTrainerData.email}
            onChange={(e) => setNewTrainerData({ ...newTrainerData, email: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            value={newTrainerData.phoneNumber}
            onChange={(e) => setNewTrainerData({ ...newTrainerData, phoneNumber: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            value={newTrainerData.address}
            onChange={(e) => setNewTrainerData({ ...newTrainerData, address: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleAddTrainer} disabled={isCreatingTrainer}>
            Add Trainer
          </Button>
        </Box>
      </Modal>

      <Modal open={isEditingTrainer} onClose={() => setIsEditingTrainer(false)}>
    <Box
        sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            maxWidth: '80vw',
        }}
    >
        <TextField
            label="Name"
            value={editTrainerData.name}
            onChange={(e) => setEditTrainerData({ ...editTrainerData, name: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Age"
            value={editTrainerData.age}
            onChange={(e) => setEditTrainerData({ ...editTrainerData, age: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Email"
            value={editTrainerData.email}
            onChange={(e) => setEditTrainerData({ ...editTrainerData, email: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Phone Number"
            value={editTrainerData.phoneNumber}
            onChange={(e) => setEditTrainerData({ ...editTrainerData, phoneNumber: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Address"
            value={editTrainerData.address}
            onChange={(e) => setEditTrainerData({ ...editTrainerData, address: e.target.value })}
            fullWidth
            margin="normal"
        />
        <Button variant="contained" onClick={handleEditTrainer} disabled={isCreatingTrainer}>
            Update Trainer
        </Button>
    </Box>
</Modal>

      

    </Box>
  );
}

export default Trainers;

