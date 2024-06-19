import { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem, 
} from "@mui/material";
import Header from "components/Header";
import { useGetClassesQuery, useCreateClassMutation, useDeleteClassMutation, useUpdateClassMutation, useGetTrainersQuery } from "state/api";




const Calendar = () => {
  const theme = useTheme();
  const colors = useMemo(
    () => ({
      primary: {
        400: theme.palette.primary[400],
        500: theme.palette.primary[500]
      },
    }),
    [theme.palette.primary]
  );

  const [currentEvents, setCurrentEvents] = useState([]);
  const [isAddClassDialogOpen, setAddClassDialogOpen] = useState(false);
  const [newClassData, setNewClassData] = useState({
    title: "",
    start: "",
    end: "",
    trainerId: "", 
    description: "",
  });

  const { data: classesData, refetch } = useGetClassesQuery();
  const { data: trainersData } = useGetTrainersQuery(); 

  useEffect(() => {
    if (classesData) {
      setCurrentEvents(classesData.map(formatClassToEvent).filter(event => event !== null));
    }
  }, [classesData]);

  const formatClassToEvent = (classData) => {
    if (!classData) {
      return null; 
    }

    return {
      id: classData._id,
      title: classData.title,
      start: classData.start,
      end: classData.end,
    };
  };

  const [createClassMutation] = useCreateClassMutation();
  const [deleteClassMutation] = useDeleteClassMutation();

  const handleDateClick = (selected) => {
    setNewClassData({
      ...newClassData,
      start: selected.startStr,
      end: selected.endStr,
    });
    setAddClassDialogOpen(true);
  };

  const handleCloseAddClassDialog = () => {
    setAddClassDialogOpen(false);
    setNewClassData({
      title: "",
      start: "",
      end: "",
      trainerId: "", 
      description: "",
    });
  };

  const handleAddClass = async () => {
    console.log("Adding class...", newClassData);
    try {
      // if (!newClassData.trainerId) {
      //   console.error("Trainer ID is required.");
      //   return;
      // }else{
      //   console.error(newClassData.trainerId);
      // }
  
      const { data } = await createClassMutation(newClassData).unwrap();
  
      if (data) {
        setCurrentEvents([...currentEvents, formatClassToEvent(data)]);
      }
      handleCloseAddClassDialog();
      refetch();
    } catch (error) {
      console.error("Failed to create class:", error);
    }
  };

  const handleDeleteClass = async (eventId) => {
    try {
      await deleteClassMutation(eventId);
      setCurrentEvents(currentEvents.filter(event => event.id !== eventId));
      refetch(); 
    } catch (error) {
      console.error("Failed to delete class:", error);
    }
  };

  const handleTrainerSelect = (event) => {
    setNewClassData({
      ...newClassData,
      trainerId: event.target.value, 
    });
  };

  const calendarStyles = {
    '--fc-border-color': colors.primary[400],
    '--fc-button-text-color': 'white',
    '--fc-button-bg-color': colors.primary[400],
    '--fc-button-border-color': colors.primary[400],
    '--fc-button-hover-bg-color': colors.primary[400],
    '--fc-button-hover-border-color': colors.primary[400],
    '--fc-button-active-bg-color': colors.primary[500],
    '--fc-page-bg-color': 'black'
  };

  const [isEditClassDialogOpen, setEditClassDialogOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);

  const [updateClassMutation] = useUpdateClassMutation();

  const handleEditClass = (classId) => {
    setSelectedClassId(classId);
    setEditClassDialogOpen(true);
    const selectedClass = classesData.find(classData => classData._id === classId);
    setNewClassData({
      title: selectedClass.title,
      start: selectedClass.start,
      end: selectedClass.end,
      trainerId: selectedClass.trainerId,
      description: selectedClass.description,
    });
  };

  const handleCloseEditClassDialog = () => {
    setEditClassDialogOpen(false);
    setSelectedClassId(null);
    setNewClassData({
      title: "",
      start: "",
      end: "",
      description: "",
    });
  };

  const handleUpdateClass = async () => {
    console.log("Updating class...");
    try {
      await updateClassMutation({ id: selectedClassId, ...newClassData });
      handleCloseEditClassDialog();
      refetch(); 
    } catch (error) {
      console.error("Failed to update class:", error);
    }
  };
  
  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Schedule for classes" />

      <Box display="flex" justifyContent="space-between">
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[500]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Classes</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: 'transparent', 
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {format(new Date(event.start), "MMMM dd, yyyy")}
                    </Typography>
                  }
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleEditClass(event.id)} 
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteClass(event.id)}
                >
                  Delete
                </Button>
              </ListItem>
            ))}
          </List>

        </Box>

        <Box flex="1 1 100%" ml="15px" style={calendarStyles}>
          <FullCalendar
            height="75vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "timeGridWeek",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            events={currentEvents}
            eventContent={(eventInfo) => (
              <div
                style={{
                  padding: "2px 4px",
                  color: "white",
                  backgroundColor: false, 
                  borderRadius: "2px",
                }}
              >
                {eventInfo.event.title}
              </div>
            )}
            eventBackgroundColor='transparent'
            eventBorderColor="transparent"
            
          />
        </Box>
      </Box>

      <Dialog open={isAddClassDialogOpen} onClose={handleCloseAddClassDialog}>
        <DialogTitle>Add New Class</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={newClassData.title}
            onChange={(e) =>
              setNewClassData({ ...newClassData, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={newClassData.description}
            onChange={(e) =>
              setNewClassData({ ...newClassData, description: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="trainer"
            label="Trainer"
            select
            fullWidth
            value={newClassData.trainerId}
            onChange={handleTrainerSelect}
          >
            {trainersData && trainersData.map((trainer) => (
              <MenuItem key={trainer._id} value={trainer._id}>
                {trainer.name}
              </MenuItem>
            ))}
          </TextField>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={handleCloseAddClassDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleAddClass} color="primary">
              Add
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Edit Class Dialog */}
      <Dialog open={isEditClassDialogOpen} onClose={handleCloseEditClassDialog}>
        <DialogTitle>Edit Class</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={newClassData.title}
            onChange={(e) =>
              setNewClassData({ ...newClassData, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={newClassData.description}
            onChange={(e) =>
              setNewClassData({ ...newClassData, description: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="trainer"
            label="Trainer"
            select
            fullWidth
            value={newClassData.trainerId}
            onChange={handleTrainerSelect}
          >
            {trainersData && trainersData.map((trainer) => (
              <MenuItem key={trainer._id} value={trainer._id}>
                {trainer.name}
              </MenuItem>
            ))}
          </TextField>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={handleCloseEditClassDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdateClass} color="primary">
              Update
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Calendar;

