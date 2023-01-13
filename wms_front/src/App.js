
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import SideBar from './components/SideBar'
import Main from './pages/Main'
import Input from './pages/stock/Input'
import InputHistory from './pages/stock/InputHistory'
import Stock from './pages/stock/Stock'
import Output from './pages/stock/Output'
import OutputHistory from './pages/stock/OutputHistory'
import Login from './pages/user/Login'
import RegisterCom from './pages/user/RegisterCom'
import RegisterUser from './pages/user/RegisterUser'
import Shelf from './pages/warehouse/Shelf'
import Warehouse from './pages/warehouse/Warehouse'
import Warehouse3d from './pages/warehouse/Warehouse3d'


function App() {

  return (
    <div className='App'>

      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Main/>}/>
        <Route path='/registerCom' element={<RegisterCom/>}/>
        <Route path='registerUser/' element={<RegisterUser/>}/>
        <Route path='input/' element={<Input/>}/>
        <Route path='inputHistory/' element={<InputHistory/>}/>
        <Route path='stock/' element={<Stock/>}/>
        <Route path='output/' element={<Output/>}/>
        <Route path='outputHistory/' element={<OutputHistory/>}/>
        <Route path='shelf/' element={<Shelf/>}/>
        <Route path='warehouse/' element={<Warehouse/>}/>
        <Route path='warehouse3d/' element={<Warehouse3d/>}/>
      </Routes>
        
    </div>
  );
}

export default App;
