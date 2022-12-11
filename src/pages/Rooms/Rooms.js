import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DataTable from '../../components/common/DataTable/DataTable'
import RoomsCreateDialog from '../../components/rooms/RoomsCreateDialog';
import RoomsDeleteDialog from '../../components/rooms/RoomsDeleteDialog';
import RoomsEditDialog from '../../components/rooms/RoomsEditDialog';
import useToken from '../../useToken';



const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const {token} = useToken();
  const {hotelId, floorId} = useParams();

  const columns = [
    { field: 'id', headerName: 'Room ID', width: 150 },
    { field: 'number', headerName: 'Room Number', width: 150 },
    { field: 'price', headerName: 'Room\'s price', width: 150 },
    { field: 'description', headerName: 'Room\'s description', width: 150 },
    { field: 'Edit',
    renderCell: (cellValues) => {
      return (
        <RoomsEditDialog token={[token, hotelId, floorId, cellValues.row.id, cellValues.row.number, cellValues.row.price, cellValues.row.description]} ></RoomsEditDialog>
      )
    }, width: 150},
    { field: 'Delete',
        renderCell: (cellValues) => {
          return (
            <RoomsDeleteDialog token={[token, hotelId, floorId, cellValues.row.id, cellValues.row.number, cellValues.row.price, cellValues.row.description]} ></RoomsDeleteDialog>
          )
    }, width: 150},
  ];

  useEffect(() => {

    fetch('https://l120221113204654.azurewebsites.net/api/hotels/'+hotelId+'/floors/'+floorId+'/rooms', {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ token.accessToken
      }
    })
    .then(response => response.json())
    .then(json => setRooms(json))
  }, [hotelId, floorId, token]);

  return (
    <div>
      <RoomsCreateDialog token={[token, hotelId, floorId]}></RoomsCreateDialog>
      <DataTable
      rows={rooms}
      columns={columns}/>
    </div>
      
  )
}

export default Rooms