const Login = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
        <div className="mb-4">
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
