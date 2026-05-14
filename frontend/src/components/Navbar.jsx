function Navbar() {

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">

      <div>
        <h1 className="text-2xl font-bold tracking-wide">
          Team Task Manager
        </h1>

        <p className="text-sm text-slate-300">
          Full Stack Productivity Dashboard
        </p>
      </div>

      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-lg font-semibold"
      >
        Logout
      </button>

    </nav>
  );
}

export default Navbar;