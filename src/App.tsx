import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen flex">
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}


export default App;
