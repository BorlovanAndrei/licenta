import React, { useState, useEffect } from "react";
import { Box, useTheme, Modal, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetOperationsQuery, useCreateOperationMutation, useGetEquipmentsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Operations = () => {
    const theme = useTheme();

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const { data, isLoading, refetch } = useGetOperationsQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search,
    });
    const { data: equipmentData, isLoading: equipmentLoading } = useGetEquipmentsQuery();

    const [isAdding, setIsAdding] = useState(false);
    const [newOperationData, setNewOperationData] = useState({
        equipmentId: "",
        cost: "",
        units: ""
    });
    const [createOperationMutation] = useCreateOperationMutation();

    const handleAddOperation = async () => {
        try {
            const { data: createdOperation } = await createOperationMutation(newOperationData);
            console.log("Operation added:", createdOperation);
            setIsAdding(false);
            setNewOperationData({ equipmentId: "", cost: "", units: "" }); 
            refetch();
        } catch (error) {
            console.error("Error adding operation:", error);
        }
    };

    const handleEquipmentChange = (event) => {
        const selectedEquipmentId = event.target.value;
        const selectedEquipment = equipmentData.find(equipment => equipment._id === selectedEquipmentId);
        setNewOperationData({
            ...newOperationData,
            equipmentId: selectedEquipmentId,
            cost: selectedEquipment.price.toString(),
        });
    };

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "equipmentId",
            headerName: "Equipment ID",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            flex: 1,
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
        },
        {
            field: "units",
            headerName: "Units",
            flex: 1,
        },
    ];

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="OPERATIONS" subtitle="Entire list of operations" />

            <Button variant="contained" sx={{color: theme.palette.secondary[100]}} onClick={() => setIsAdding(true)}>Add Operation</Button>

            <Modal open={isAdding} onClose={() => setIsAdding(false)}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: '80vw' }}>
                    <Typography variant="h6" gutterBottom>Add Operation</Typography>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Equipment</InputLabel>
                        <Select
                            value={newOperationData.equipmentId}
                            onChange={handleEquipmentChange}
                        >
                            {equipmentData && equipmentData.map((equipment) => (
                                <MenuItem key={equipment._id} value={equipment._id}>
                                    {equipment.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Cost"
                        value={newOperationData.cost}
                        onChange={(e) => setNewOperationData({ ...newOperationData, cost: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Units"
                        value={newOperationData.units}
                        onChange={(e) => setNewOperationData({ ...newOperationData, units: e.target.value })}
                        fullWidth
                        margin="normal"
                        type="number"
                    />
                    <Button variant="contained" onClick={handleAddOperation}>Add Operation</Button>
                </Box>
            </Modal>

            <Box
                height="80vh"
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
                    rows={(data && data.operations) || []}
                    columns={columns}
                    rowCount={(data && data.total) || 0}
                    rowsPerPageOptions={[20, 50, 100]}
                    pagination
                    page={page}
                    pageSize={pageSize}
                    paginationMode="server"
                    sortingMode="server"
                    onPageChange={(newPage) => setPage(newPage)}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSortModelChange={(newSortModel) => setSort(...newSortModel)}
                    components={{ Toolbar: DataGridCustomToolbar }}
                    componentsProps={{
                        toolbar: { searchInput, setSearchInput, setSearch },
                    }}
                />
            </Box>
        </Box>
    );
}

export default Operations;

