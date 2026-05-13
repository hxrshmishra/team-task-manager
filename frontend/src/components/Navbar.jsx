function Navbar() {

  const logout = () => {

    localStorage.clear();

    window.location.reload();
  };

  return (
    <div className="bg-black text-white p-4 flex justify-between">

      <h1 className="font-bold">
        Team Task Manager
      </h1>

      <button onClick={logout}>
        Logout
      </button>

    </div>
  );
}

export default Navbar;