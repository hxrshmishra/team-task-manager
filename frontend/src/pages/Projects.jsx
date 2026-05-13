import { useEffect, useState } from 'react';
import API from '../api/axios';

function Projects() {

  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState('');

  const role = localStorage.getItem('role');

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      const res = await API.get('/projects');

      setProjects(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const createProject = async (e) => {

    e.preventDefault();

    try {

      await API.post('/projects', {
        title,
        description,
        members: [members],
      });

      setTitle('');
      setDescription('');
      setMembers('');

      fetchProjects();

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="mt-10">

      <h2 className="text-4xl font-bold mb-6">
        Projects
      </h2>

      {
        role === 'admin' && (

          <form
            onSubmit={createProject}
            className="bg-white p-6 rounded-2xl shadow-lg mb-8 space-y-4"
          >

            <input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full border rounded-lg px-4 py-3"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              type="text"
              placeholder="Member User ID"
              value={members}
              onChange={(e) =>
                setMembers(e.target.value)
              }
              className="w-full border rounded-lg px-4 py-3"
            />

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              Create Project
            </button>

          </form>
        )
      }

      <div className="grid gap-6">

        {
          projects.map((project) => (

            <div
              key={project._id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >

              <h3 className="text-2xl font-bold mb-2">
                {project.title}
              </h3>

              <p className="text-slate-600 mb-4">
                {project.description}
              </p>

              <div>

                <p className="font-semibold mb-2">
                  Team Members
                </p>

                <div className="flex flex-wrap gap-2">

                  {
                    project.members.map((member) => (

                      <span
                        key={member._id}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {member.name}
                      </span>
                    ))
                  }

                </div>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default Projects;