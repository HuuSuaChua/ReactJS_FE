import React, { useState } from 'react'
import TopNav from './components/TopNav';
import Menu from './components/Menu';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Admin() {
  const [role,setRole] = useState(useSelector((state)=>state.user.role))
  var ss = document.createElement("link");
  ss.rel = "stylesheet";
  ss.type = "text/css";
  ss.href="/admin/dist/css/adminlte.min.css";
  document.head.appendChild(ss);
  return (
    <div className="wrapper">
      {(role == 'Authenticated')&&(
        <Navigate to="/product" replace={true}/>
      )}
      {(role == 'Public')&&(
        <Navigate to="/login" replace={true}/>
      )}
      <TopNav/>
      <Menu/>
  <div className="content-wrapper">
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1> </h1>
          </div>
        </div>
      </div>
    </section>
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Outlet/>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>

  )
}
