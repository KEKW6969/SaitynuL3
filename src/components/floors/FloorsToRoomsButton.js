import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


export default function FloorsToRoomsButton(token) {
    const navigate = useNavigate();

    const handleClick= () => {
        console.log(token)
        navigate('/hotels/'+token.token[0]+'/floors/'+token.token[1]+'/rooms/')
    };

    return (
        <Button variant="outlined" onClick={handleClick}>
        Rooms
        </Button>
    );
}