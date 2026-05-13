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

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-8">

        <div className="max-w-5xl mx-auto">

          <div className="mb-8">

            <h1 className="text-5xl font-bold text-slate-800 mb-2">
              Dashboard
            </h1>

            <p className="text-slate-500 text-lg">
              Manage your projects and tasks efficiently.
            </p>

          </div>

          {
            role === 'admin' && (
              <TaskForm fetchTasks={fetchTasks} />
            )
          }

          <div className="grid gap-6">

            {
              tasks.length === 0
              ? (
                <div className="bg-white rounded-2xl p-10 shadow text-center text-slate-500 text-lg">
                  No Tasks Found
                </div>
              )
              : (
                tasks.map((task) => (

                  <div
                    key={task._id}
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
                  >

                    <div className="flex justify-between items-start mb-4">

                      <div>

                        <h2 className="text-2xl font-bold text-slate-800 mb-2">
                          {task.title}
                        </h2>

                        <p className="text-slate-600">
                          {task.description}
                        </p>

                      </div>

                      <div>

                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {task.priority}
                        </span>

                      </div>

                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">

                      <div>

                        <p className="font-semibold mb-2">
                          Task Status
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

                          className="border border-slate-300 rounded-lg px-4 py-2"
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

                      </div>

                    </div>

                  </div>
                ))
              )
            }

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;