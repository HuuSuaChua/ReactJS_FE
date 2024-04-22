import React from 'react'
import { Outlet } from 'react-router-dom';

export default function AdminProduct() {
  return (
    <div>
      <h1>AdminProduct</h1> 
      <Outlet/>
    </div>
  )
}
