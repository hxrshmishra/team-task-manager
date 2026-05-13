import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import { useEffect, useState } from 'react';
import API from '../api/axios';

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const role = localStorage.getItem('role');

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks = async () => {

    try {

      const res = await API.get('/tasks');

      setTasks(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const logout = () => {

    localStorage.clear();

    window.location.reload();
  };

  return (
    <>
      <Navbar />

      <div className="p-10 bg-gray-100 min-h-screen max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <button
            onClick={logout}
            className="bg-white p-5 rounded-xl shadow mb-4 hover:shadow-lg transition"
          >
            Logout
          </button>

        </div>

        {
          role === 'admin' && (
            <TaskForm fetchTasks={fetchTasks} />
          )
        }

        <hr className="my-6" />

        <h2 className="text-2xl font-semibold mb-4">
          Your Tasks
        </h2>

        {
          tasks.length === 0
          ? (
            <p>No Tasks Found</p>
          )
          : (
            tasks.map((task) => (

              <div
                key={task._id}
                className="bg-white p-5 rounded-xl shadow mb-4"
              >

                <h3 className="text-xl font-bold mb-2">
                  {task.title}
                </h3>

                <p className="mb-2 text-gray-700">
                  {task.description}
                </p>

                <p className="mb-2">
                  <span className="font-semibold">
                    Status:
                  </span>{' '}
                  {task.status}
                </p>

                <select
                  value={task.status}

                  onChange={async (e) => {

                    try {

                      await API.put(`/tasks/${task._id}`, {
                        status: e.target.value,
                      });

                      fetchTasks();

                    } catch (error) {

                      console.log(error);
                    }
                  }}

                  className="border p-2 rounded mb-3"
                >

                  <option value="pending">
                    Pending
                  </option>

                  <option value="in-progress">
                    In Progress
                  </option>

                  <option value="completed">
                    Completed
                  </option>

                </select>

                <p>
                  <span className="font-semibold">
                    Priority:
                  </span>{' '}
                  {task.priority}
                </p>

              </div>
            ))
          )
        }

      </div>
    </>
  );
}

export default Dashboard;