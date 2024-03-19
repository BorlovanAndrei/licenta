import React, { useState } from "react";
import { Box, useTheme, Modal, Typography, TextField, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery, useCreateTransactionMutation } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";


const Transactions = () => {
    const theme = useTheme();

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const { data, isLoading, refetch } = useGetTransactionsQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search,
    });

    const [isAdding, setIsAdding] = useState(false);
    const [newTransactionData, setNewTransactionData] = useState({
        userId: "",
        planId: "",
        cost: ""
    });
    const [createTransactionMutation] = useCreateTransactionMutation();

    const handleAddTransaction = async () => {
        try {
            const { data: createdTransaction } = await createTransactionMutation(newTransactionData);
            console.log("Transaction added:", createdTransaction);
            setIsAdding(false);
            setNewTransactionData({ userId: "", planId: "", cost: "" });
            refetch();
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    };
    
    //console.log("data", data);

    const columns = [
        {
          field: "_id",
          headerName: "ID",
          flex: 1,
        },
        {
          field: "userId",
          headerName: "User ID",
          flex: 1,
        },
        {
          field: "createdAt",
          headerName: "CreatedAt",
          flex: 1,
        },
        {
          field: "planId",
          headerName: "Plan Id",
          flex: 1,
          sortable: false,
        },
        {
          field: "cost",
          headerName: "Cost",
          flex: 1,
          renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
        },
      ];


  return (
    <Box m="1.5rem 2.5rem">
        <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />

        <Button variant="contained" onClick={() => setIsAdding(true)}>Add Transaction</Button>

            <Modal open={isAdding} onClose={() => setIsAdding(false)}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: '80vw' }}>
                    <Typography variant="h6" gutterBottom>Add Transaction</Typography>
                    <TextField
                        label="User ID"
                        value={newTransactionData.userId}
                        onChange={(e) => setNewTransactionData({ ...newTransactionData, userId: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Plan ID"
                        value={newTransactionData.planId}
                        onChange={(e) => setNewTransactionData({ ...newTransactionData, planId: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Cost"
                        value={newTransactionData.cost}
                        onChange={(e) => setNewTransactionData({ ...newTransactionData, cost: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" onClick={handleAddTransaction}>Add Transaction</Button>
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
            rows={(data && data.transactions) || []}
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
  )
}

export default Transactions