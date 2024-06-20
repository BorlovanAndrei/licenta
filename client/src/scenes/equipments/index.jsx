import React, { useState } from 'react';
import { Box, useTheme, Button, Modal, TextField } from "@mui/material";
import { useGetEquipmentsQuery, useCreateEquipmentMutation, useUpdateEquipmentMutation, useDeleteEquipmentMutation } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Equipments = () => {
    const theme = useTheme();
    const { data, isLoading, refetch } = useGetEquipmentsQuery();
    console.log("data", data);
    const [isAddingEquipment, setIsAddingEquipment] = useState(false);
    const [isEditingEquipment, setIsEditingEquipment] = useState(false);
    const [newEquipmentData, setNewEquipmentData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
    });

    const [editEquipmentData, setEditEquipmentData] = useState({
        id: '',
        name: '',
        price: '',
        description: '',
        category: '',
    });

    const [createEquipment, { isLoading: isCreatingEquipment }] = useCreateEquipmentMutation();

    const [updateEquipment] = useUpdateEquipmentMutation();
    const [deleteEquipment] = useDeleteEquipmentMutation();

    const handleAddEquipment = async () => {
        try {
            await createEquipment(newEquipmentData).unwrap();
            setIsAddingEquipment(false);
            refetch();
            setNewEquipmentData({
                name: '',
                price: '',
                description: '',
                category: '',
            });
        } catch (error) {
            console.error('Failed to add equipment:', error);
        }
    };

    const handleEditEquipment = async () => {
        try {
            await updateEquipment({ equipmentId: editEquipmentData.id, ...editEquipmentData }).unwrap();
            setIsEditingEquipment(false);
            refetch();
            setEditEquipmentData({
                id: '',
                name: '',
                price: '',
                description: '',
                category: '',
            });
        } catch (error) {
            console.error('Failed to edit equipment:', error);
        }
    };

    const handleDeleteEquipment = async (equipmentId) => {
        try {
            await deleteEquipment(equipmentId).unwrap();
            refetch();
        } catch (error) {
            console.error('Failed to delete equipment:', error);
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
            field: "price",
            headerName: "Price",
            flex: 0.5,
        },
        {
            field: "category",
            headerName: "Category",
            flex: 0.5,
        },
        {
            field: "edit",
            headerName: "Edit",
            flex: 0.5,
            renderCell: (params) => {
                return (
                    <Button sx={{ color: "white" }} onClick={() => handleEditClick(params.row)}>Edit</Button>
                )
            }
        },
        {
            field: "delete",  
            headerName: "Delete",
            flex: 0.5,
            renderCell: (params) => {
                const equipmentId = params.row._id;
                return (
                    <Box>
                        <Button sx={{ color: "white" }} onClick={() => handleDeleteEquipment(equipmentId)}>Delete</Button>
                    </Box>
                )
            }
        }
    ];

    const handleEditClick = (equipment) => {
        setIsEditingEquipment(true);
        setEditEquipmentData({
            id: equipment._id,
            name: equipment.name,
            price: equipment.price,
            description: equipment.description,
            category: equipment.category,
        });
    };

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="EQUIPMENT" subtitle={"List of Equipment"} />

            <Button variant="contained" sx={{color: theme.palette.secondary[100]}} onClick={() => setIsAddingEquipment(true)}>
                Add Equipment
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

            <Modal open={isAddingEquipment} onClose={() => setIsAddingEquipment(false)}>
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
                      value={newEquipmentData.name}
                      onChange={(e) => setNewEquipmentData({ ...newEquipmentData, name: e.target.value })}
                      fullWidth
                      margin="normal"
                  />
                  <TextField
                      label="Price"
                      value={newEquipmentData.price}
                      onChange={(e) => setNewEquipmentData({ ...newEquipmentData, price: e.target.value })}
                      fullWidth
                      margin="normal"
                      type="number"
                  />
                  <TextField
                      label="Description"
                      value={newEquipmentData.description}
                      onChange={(e) => setNewEquipmentData({ ...newEquipmentData, description: e.target.value })}
                      fullWidth
                      margin="normal"
                      multiline
                  />
                  <TextField
                      label="Category"
                      value={newEquipmentData.category}
                      onChange={(e) => setNewEquipmentData({ ...newEquipmentData, category: e.target.value })}
                      fullWidth
                      margin="normal"
                  />
                  <Button variant="contained" onClick={handleAddEquipment} disabled={isCreatingEquipment}>
                      Add Equipment
                  </Button>
              </Box>
            </Modal>

            <Modal open={isEditingEquipment} onClose={() => setIsEditingEquipment(false)}>
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
                      value={editEquipmentData.name}
                      onChange={(e) => setEditEquipmentData({ ...editEquipmentData, name: e.target.value })}
                      fullWidth
                      margin="normal"
                  />
                  <TextField
                      label="Price"
                      value={editEquipmentData.price}
                      onChange={(e) => setEditEquipmentData({ ...editEquipmentData, price: e.target.value })}
                      fullWidth
                      margin="normal"
                      type="number"
                  />
                  <TextField
                      label="Description"
                      value={editEquipmentData.description}
                      onChange={(e) => setEditEquipmentData({ ...editEquipmentData, description: e.target.value })}
                      fullWidth
                      margin="normal"
                      multiline
                  />
                  <TextField
                      label="Category"
                      value={editEquipmentData.category}
                      onChange={(e) => setEditEquipmentData({ ...editEquipmentData, category: e.target.value })}
                      fullWidth
                      margin="normal"
                  />
                  <Button variant="contained" onClick={handleEditEquipment} disabled={isCreatingEquipment}>
                      Update Equipment
                  </Button>
              </Box>
            </Modal>

        </Box>
    );
}

export default Equipments;
