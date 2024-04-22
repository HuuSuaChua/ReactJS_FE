
import './App.css';
import AppBar from './scenes/global/AppBar';
import Banner from './scenes/global/Banner';
import NavBar from './scenes/global/NavBar';
import Footer from './scenes/global/Footer';
import CopyRight from './scenes/global/CopyRight';
import {Outlet} from 'react-router-dom'
import {Provider} from "react-redux"
import store from './scenes/state/store';
import Weather from './components/Weather';
export default function App() {
  return (
    <Provider store={store}>

    <div >
      <AppBar/>
      <div className="container">
      <Banner/>
      <NavBar/>
      <Outlet/>
      <Footer/> 
      </div>
      <CopyRight/>
    </div>
    </Provider>

  );
}

