import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import routes from './core/routes/route';

function App() {
  const setRoutes = () => {
    const result = routes.map((route, index) => {
      const { path, exact, main } = route
      return (<Route key={index} path={path} exact={exact} element={main}></Route>)
    })
    return result;
  }
  return (
    <div>
      <Routes>
        {setRoutes()}
      </Routes>
    </div>
  );
}

export default App;
