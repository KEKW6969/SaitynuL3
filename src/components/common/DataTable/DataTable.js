import React from 'react'
import { DataGrid } from '@mui/x-data-grid';


const DataTable = ({
  rows,
  columns,
}) => {
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid autoHeight rows={rows} columns={columns} density={'comfortable'} sx={{margin:5}} />
    </div>
  );
}

export default DataTable