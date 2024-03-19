import React, { useState } from "react";
import { Box, useTheme, Modal, Typography, TextField, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetOperationsQuery, useCreateOperationMutation } from "state/api";
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
    console.log("data", data);

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

            <Button variant="contained" onClick={() => setIsAdding(true)}>Add Operation</Button>

            <Modal open={isAdding} onClose={() => setIsAdding(false)}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: '80vw' }}>
                    <Typography variant="h6" gutterBottom>Add Operation</Typography>
                    <TextField
                        label="Equipment ID"
                        value={newOperationData.equipmentId}
                        onChange={(e) => setNewOperationData({ ...newOperationData, equipmentId: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
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
