import React from 'react'
import { useState } from 'react'
import  axios  from 'axios';

export default function FileUpload(props) {
    var addImage = props.addImage
    var [file,setFile] = useState([])
    const handleChange = (e) => {
        setFile(e.target.files[0])
        console.log('chon file', e.target.files)
    }
    // const token = "fa8833aa852e2b4155002d1e250ffcc7be6c4564bc0d41400caf9e85746fa0d7f435284ea404acdd4389a5c008a4003bcf2144276ff480215c70031e4064ec70ab97a6484ae3d698a949db70091788d6a9c2064862ef8006845e0ac5a92eb12c9425e2d08a74861125bca460fe5f82b3e02a3d588f7c1e89174f58928a03e339";
    
    const handleUpload = async (e) => {
        console.log('send file', file) 
        const data = new FormData();
        data.append('files', file)
        e.target.innerText = 'Uploading...'
        const response = await axios({
        method: 'POST',
        url: 'http://localhost:1337/api/upload',
        data,
        // headers: {
        //     Authorization: `Bearer ${token}` // Thêm token vào tiêu đề 'Authorization'
        // }
        })
        e.target.innerText = 'Upload'
        var id = response.data[0].id
        var url = response.data[0].url
        addImage(id,url)
        console.log('id', id)
        }
  return (
<div className='fileUpload'>
  <input type='file' onChange={handleChange} />
  <button onClick={handleUpload}>Upload</button>
</div>
  )
}
