import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DataTable from '../../components/common/DataTable/DataTable'
import useToken from '../../useToken';
import FloorsCreateDialog from '../../components/floors/FloorsCreateDialog';
import FloorsEditDialog from '../../components/floors/FloorsEditDialog';
import FloorsDeleteDialog from '../../components/floors/FloorsDeleteDialog';
import FloorsToRoomsButton from '../../components/floors/FloorsToRoomsButton';



const Floors = () => {
  const [floors, setFloors] = useState([]);
  const { token } = useToken();
  const {id} = useParams();
  const hotelId = id;
  const columns = [
    { field: 'id', headerName: 'Floor ID', width: 150 },
    { field: 'number', headerName: 'Floor\'s Number', width: 150 },
    { field: 'Edit',
        renderCell: (cellValues) => {
          return (
            <FloorsEditDialog token={[token, hotelId, cellValues.row.id, cellValues.row.number]} ></FloorsEditDialog>
          )
       }, width: 150},
    { field: 'Delete',
        renderCell: (cellValues) => {
          return (
            <FloorsDeleteDialog token={[token, hotelId, cellValues.row.id, cellValues.row.number]} ></FloorsDeleteDialog>
          )
    }, width: 150},
    { field: 'Rooms',
        renderCell: (cellValues) => {
          return (
            <FloorsToRoomsButton token={[hotelId, cellValues.row.id]} ></FloorsToRoomsButton>
          )
        }, width: 150},
  ];

  useEffect(() => {

    fetch('https://l120221113204654.azurewebsites.net/api/hotels/'+id+'/floors', {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ token.accessToken
      }
    })
    .then(response => response.json())
    .then(json => setFloors(json))
  }, [id, token]);

  return (
    <div>
      <FloorsCreateDialog token={token} id={id}></FloorsCreateDialog>
      <DataTable
      rows={floors}
      columns={columns}/>
    </div>

  )
}

export default Floors