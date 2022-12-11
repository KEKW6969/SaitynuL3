import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


export default function HotelsToFloorsButton(token) {
    const navigate = useNavigate();

    const handleClick= () => {
        navigate('/hotels/'+token.token[1]+'/floors/')
    };

    return (
        <Button variant="outlined" disabled={!token.token[0].token || (token.token[3] !== token.token[2])} onClick={handleClick}>
        Floors
        </Button>
    );
}