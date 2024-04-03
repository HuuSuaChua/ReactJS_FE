import React from 'react'
import { categoryApi } from './Api/categoryApi'

export default function Test() {
    const f = async()=>{
        var s = await categoryApi.getAll()
        console.log(s.data.data)
    }
    f()
  return (
    <div>
      Test api
      
    </div>
  )
}
