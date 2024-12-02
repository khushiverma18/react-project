import React, { useState } from 'react';
//import './TaskWidget.css'
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, editTask, toggleTaskStatus } from '../features/tasksSlice';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TaskWidget = () => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const [editTaskDesc, setEditTaskDesc] = useState('');
  const [editTaskDueDate, setEditTaskDueDate] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      dispatch(
        addTask({
          id: Date.now(),
          title: newTaskTitle,
          description: newTaskDesc,
          dueDate: newTaskDueDate,
          completed: false,
        })
      );
      setNewTaskTitle('');
      setNewTaskDesc('');
      setNewTaskDueDate('');
    }
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleToggleTaskStatus = (id) => {
    dispatch(toggleTaskStatus(id));
  };

  const handleEditTaskOpen = (task) => {
    setEditTaskId(task.id);
    setEditTaskTitle(task.title);
    setEditTaskDesc(task.description);
    setEditTaskDueDate(task.dueDate);
    setIsEditDialogOpen(true);
  };

  const handleEditTaskSave = () => {
    dispatch(
      editTask({
        id: editTaskId,
        updates: {
          title: editTaskTitle,
          description: editTaskDesc,
          dueDate: editTaskDueDate,
        },
      })
    );
    setIsEditDialogOpen(false);
  };

  return (
    <div>
      <h2>Task List</h2>
      <div style={{ marginBottom: '20px' }}>
        <TextField
          label="Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Description"
          value={newTaskDesc}
          onChange={(e) => setNewTaskDesc(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Due Date"
          type="date"
          value={newTaskDueDate}
          onChange={(e) => setNewTaskDueDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" onClick={handleAddTask}>
          Add Task
        </Button>
      </div>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <Checkbox
              checked={task.completed}
              onChange={() => handleToggleTaskStatus(task.id)}
            />
            <ListItemText
              primary={task.title}
              secondary={`Due: ${task.dueDate || 'No due date'} - ${
                task.completed ? 'Completed' : 'Pending'
              }`}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleEditTaskOpen(task)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteTask(task.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Title"
            value={editTaskTitle}
            onChange={(e) => setEditTaskTitle(e.target.value)}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Description"
            value={editTaskDesc}
            onChange={(e) => setEditTaskDesc(e.target.value)}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Due Date"
            type="date"
            value={editTaskDueDate}
            onChange={(e) => setEditTaskDueDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditTaskSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskWidget;
