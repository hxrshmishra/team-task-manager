import { useState } from 'react';
import API from '../api/axios';

function TaskForm({ fetchTasks }) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [assignedTo, setAssignedTo] = useState('');

  const createTask = async (e) => {

    e.preventDefault();

    try {

      await API.post('/tasks', {
        title,
        description,
        priority,
        assignedTo,
      });

      alert('Task Created');

      setTitle('');
      setDescription('');
      setPriority('');
      setAssignedTo('');

      fetchTasks();

    } catch (error) {

      console.log(error);

      alert('Failed to create task');
    }
  };

  return (
    <div style={{
      border: '1px solid gray',
      padding: '20px',
      marginBottom: '20px',
    }}>

      <h2>Create Task</h2>

      <form onSubmit={createTask}>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <br /><br />

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <br /><br />

        <input
          type="text"
          placeholder="Assigned User ID"
          value={assignedTo}
          onChange={(e) =>
            setAssignedTo(e.target.value)
          }
        />

        <br /><br />

        <button type="submit">
          Create Task
        </button>

      </form>

    </div>
  );
}

export default TaskForm;