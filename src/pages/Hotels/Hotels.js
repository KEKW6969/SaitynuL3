//import React from 'react'
import React, { useEffect, useState } from 'react'
import DataTable from '../../components/common/DataTable/DataTable'
import HotelsCreateDialog from '../../components/hotels/HotelsCreateDialog';
import HotelsEditDialog from '../../components/hotels/HotelsEditDialog';
import HotelsDeleteDialog from '../../components/hotels/HotelsDeleteDialog';
import HotelsToFloorsButton from '../../components/hotels/HotelsToFloorsButton';


const Hotels = (token) => {
  const [hotels, setHotels] = useState([]);

  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload).sub;
  }
  let sub;
  if (token.token){
    sub = parseJwt(token.token.accessToken)
  } else {
    sub = token.token
  }

  const columns = [
    { field: 'id', headerName: 'Hotel ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'address', headerName: 'Address', width: 300 },
    { field: 'phoneNumber', headerName: 'Phone number', width: 150 },
    { field: 'Edit',
      renderCell: (cellValues) => {
        return (
          <HotelsEditDialog token={[token, cellValues.row.id, cellValues.row.name, cellValues.row.address, cellValues.row.phoneNumber, cellValues.row.userId, sub]} ></HotelsEditDialog>
        )
     }, width: 150},
     { field: 'Delete',
     renderCell: (cellValues) => {
       return (
         <HotelsDeleteDialog token={[token, cellValues.row.id, cellValues.row.name, cellValues.row.address, cellValues.row.phoneNumber, cellValues.row.userId, sub]} ></HotelsDeleteDialog>
       )
    }, width: 150},
    { field: 'Floors',
    renderCell: (cellValues) => {
      return (
        <HotelsToFloorsButton token={[token, cellValues.row.id, cellValues.row.userId, sub]} ></HotelsToFloorsButton>
      )
   }, width: 150},

  ];

  useEffect(() => {

    fetch('https://l120221113204654.azurewebsites.net/api/hotels')
    .then(response => response.json())
    .then(json => setHotels(json))
  }, []);

  return (
    <div>
      <HotelsCreateDialog token={token}></HotelsCreateDialog>
      <DataTable
      rows={hotels}
      columns={columns}/>
    </div>

  )
}

export default Hotels