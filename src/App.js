import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './Components/NavigationBar';
import Browse from './Pages/Browse';
import Edit from './Pages/Edit';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import CreateEmployee from './Pages/CreateEmployee';
import Breadcrumbs from './Components/BreadCrumbs';
import ViewUser from './Components/ViewUser';

const crumbs = [
  { path: '/', label: 'Home' },
  { path: '/view/:id', label: 'Employee Details' },
  { path: '/edit/:id', label: 'Update Employee Details' },
];

function App() {
  const [active, setActive] = useState(true)

  const handleNav = () => {
    setActive(!active)
  }
  return (
    < Provider store = { store } className='bg-gray-500'>
      <Router>
        <Navigation active={active} onClick={handleNav} />
        <div className='w-full flex bg-gray-100 overflow-hidden shadow-md flex-col lg:flex-row'>
          <div className='flex w-full flex-wrap justify-end items-start'>
            <Routes>
              <Route path='/' element={<Browse active={active}/>} />
              <Route path='/create' element={<CreateEmployee active={active} />} />
              <Route path='/view/:_id' element={<ViewUser active={active} />} />
              <Route path='/edit/:_id' element={<Edit active={active} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
