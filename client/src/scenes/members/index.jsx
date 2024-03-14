import React, { useState } from 'react'
import { Box, useTheme, Button, Modal, TextField } from "@mui/material";
import { useGetMembersQuery, useCreateMemberMutation, useUpdateMemberMutation, useDeleteMemberMutation } from "state/api";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";

const Members = () => {
    const theme = useTheme();
    const {data, isLoading, refetch} = useGetMembersQuery();
    console.log("data", data);
    const [isAddingMember, setIsAddingMember] = useState(false);
    const [isEditingMember, setIsEditingMember] = useState(false);
    const [newMemberData, setNewMemberData] = useState({
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
      address: '',
    });

    const [editMemberData, setEditMemberData] = useState({
      id: '',
      name: '',
      email: '',
      phoneNumber: '',
      address: '',
  });

    const [createMember, { isLoading: isCreatingMember }] = useCreateMemberMutation();

    const [updateMember] = useUpdateMemberMutation();
    const [deleteMember] = useDeleteMemberMutation();


    const handleAddMember = async () => {
      try {
        await createMember(newMemberData).unwrap();
        setIsAddingMember(false);
        refetch();
        setNewMemberData({
          name: '',
          email: '',
          password: '',
          phoneNumber: '',
          address: '',
        });
      } catch (error) {
        console.error('Failed to add member:', error);
      }
    };

    const handleEditMember = async () => {
      try {
          await updateMember({ memberId: editMemberData.id, ...editMemberData }).unwrap();
          setIsEditingMember(false);
          refetch();
          setEditMemberData({
              id: '',
              name: '',
              email: '',
              phoneNumber: '',
              address: '',
          });
      } catch (error) {
          console.error('Failed to edit member:', error);
      }
  };

  const handleDeleteMember = async (memberId) => {
    try {
        await deleteMember(memberId).unwrap();
        refetch();
    } catch (error) {
        console.error('Failed to delete member:', error);
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
        // {
        //   field: "actions",
        //   headerName: "Actions",
        //   flex: 1,
        //   renderCell: (params) => {
        //       const memberId = params.row._id;
        //       return (
        //           <Box
        //           sx={{
        //             position: 'absolute'
        //         }}
        //           >
        //               <Button sx={{color: "white"}} onClick={() => handleEditClick(params.row)}>Edit</Button>
        //               <Button sx={{color: "white"}} onClick={() => handleDeleteMember(memberId)}>Delete</Button>
        //           </Box>
        //       );
              
        //   }
        // },
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
            const memberId = params.row._id;
            return (
              <Box>
                <Button sx={{color: "white"}} onClick={() => handleDeleteMember(memberId)}>Delete</Button>
              </Box>
            )
        }
      }
        
        
    ]

    const handleEditClick = (member) => {
      setIsEditingMember(true);
      //setEditMemberData(member);
      setEditMemberData({
        id: member._id, 
        name: member.name,
        email: member.email,
        phoneNumber: member.phoneNumber,
        address: member.address,
      });
  };

   
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="MEMBERS" subtitle={"List of Members"}/>

        <Button variant="contained" onClick={() => setIsAddingMember(true)}>
        Add Member
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
        
        <Modal open={isAddingMember} onClose={() => setIsAddingMember(false)}>
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
            value={newMemberData.name}
            onChange={(e) => setNewMemberData({ ...newMemberData, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={newMemberData.email}
            onChange={(e) => setNewMemberData({ ...newMemberData, email: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            value={newMemberData.password}
            onChange={(e) => setNewMemberData({ ...newMemberData, password: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            value={newMemberData.phoneNumber}
            onChange={(e) => setNewMemberData({ ...newMemberData, phoneNumber: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            value={newMemberData.address}
            onChange={(e) => setNewMemberData({ ...newMemberData, address: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleAddMember} disabled={isCreatingMember}>
            Add Member
          </Button>
        </Box>
      </Modal>

      <Modal open={isEditingMember} onClose={() => setIsEditingMember(false)}>
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
            value={editMemberData.name}
            onChange={(e) => setEditMemberData({ ...editMemberData, name: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Email"
            value={editMemberData.email}
            onChange={(e) => setEditMemberData({ ...editMemberData, email: e.target.value })}
            fullWidth
            margin="normal"
        />
        {/* <TextField
            label="Password"
            value={editMemberData.password}
            onChange={(e) => setEditMemberData({ ...editMemberData, password: e.target.value })}
            fullWidth
            margin="normal"
        /> */}
        <TextField
            label="Phone Number"
            value={editMemberData.phoneNumber}
            onChange={(e) => setEditMemberData({ ...editMemberData, phoneNumber: e.target.value })}
            fullWidth
            margin="normal"
        />
        <TextField
            label="Address"
            value={editMemberData.address}
            onChange={(e) => setEditMemberData({ ...editMemberData, address: e.target.value })}
            fullWidth
            margin="normal"
        />
        <Button variant="contained" onClick={handleEditMember} disabled={isCreatingMember}>
            Update Member
        </Button>
    </Box>
</Modal>

      

    </Box>
  );
}

export default Members