import { useEffect, useState } from 'react';
import API from '../api/axios';

function TaskForm({ fetchTasks }) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [assignedTo, setAssignedTo] = useState('');

  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers = async () => {

    try {

      const res = await API.get('/auth/users');

      const members = res.data.filter(
        (user) => user.role === 'member'
      );

      setUsers(members);

    } catch (error) {

      console.log(error);
    }
  };

  const createTask = async (e) => {

    e.preventDefault();

    try {

      await API.post('/tasks', {
        title,
        description,
        priority,
        assignedTo,
      });

      setTitle('');
      setDescription('');
      setPriority('medium');
      setAssignedTo('');

      fetchTasks();

    } catch (error) {

      console.log(error);

      alert('Failed to create task');
    }
  };

  return (

    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">

      <h2 className="text-2xl font-bold mb-5">
        Create Task
      </h2>

      <form
        onSubmit={createTask}
        className="space-y-4"
      >

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border border-slate-300 rounded-lg px-4 py-3"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full border border-slate-300 rounded-lg px-4 py-3"
        />

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
          className="w-full border border-slate-300 rounded-lg px-4 py-3"
        >

          <option value="low">
            Low Priority
          </option>

          <option value="medium">
            Medium Priority
          </option>

          <option value="high">
            High Priority
          </option>

        </select>

        <select
          value={assignedTo}
          onChange={(e) =>
            setAssignedTo(e.target.value)
          }
          className="w-full border border-slate-300 rounded-lg px-4 py-3"
        >

          <option value="">
            Select Team Member
          </option>

          {
            users.map((user) => (

              <option
                key={user._id}
                value={user._id}
              >
                {user.name}
              </option>
            ))
          }

        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg font-semibold"
        >
          Create Task
        </button>

      </form>

    </div>
  );
}

export default TaskForm;