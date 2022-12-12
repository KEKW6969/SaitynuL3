import { useEffect } from 'react'
import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Logout = ({token, setToken}) => {
  const navigate = useNavigate();
  useEffect(() => {

    fetch('https://l120221113204654.azurewebsites.net/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ token.accessToken
      }
    })
    setToken(undefined);
    navigate('/hotels');
  });
  return null;

}

Logout.propTypes = {
  setToken: propTypes.func.isRequired
}

export default Logout