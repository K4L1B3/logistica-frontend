import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen flex">
      <main className="w-full max-w-7xl p-4">
        <Outlet />
      </main>
    </div>
  );
}


export default App;
