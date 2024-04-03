
import './App.css';
import Blog from './examples/blog/Blog';
import Admin from './admin/Admin';
import AppBar from './scenes/global/AppBar';
import Banner from './scenes/global/Banner';
import NavBar from './scenes/global/NavBar';
import Footer from './scenes/global/Footer';
import CopyRight from './scenes/global/CopyRight';
import {Outlet} from 'react-router-dom'
import Loading from './components/Loading';
import {Provider} from "react-redux"
import store from './scenes/state/store';
import SelectBox from './components/SelectBox';
import CategorySelect from './components/CategorySelect';
import FileUpload from './components/FileUpload';
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
      <Loading/>
      <CopyRight/>
    </div>
    </Provider>

  );
}

