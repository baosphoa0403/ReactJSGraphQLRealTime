import axios, { Axios } from 'axios';
import React from 'react';

const LoginPage = () => {
  const [dataInput, setData] = React.useState({
    username: 'bảo',
    password: '12345',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios({
      method: 'POST',
      data: { username: dataInput.username, password: dataInput.password },
      url: 'http://localhost:4000/v1/auth/login',
      withCredentials: true,
    });
    const profile = await axios({
      method: 'GET',
      url: 'http://localhost:4000/v1/auth/profile',
      withCredentials: true,
    });
    console.log(data.headers);
    console.log();
    // alert(profile.)
    alert(`login success ${profile.data.data.userName}`);
  };
  const handleChange = (e) => {
    console.log(e.target.name + ' ' + e.target.value);
    const { name, value } = e.target;
    setData({ ...dataInput, [name]: value });
  };
  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          id='login'
          className='fadeIn second'
          name='username'
          placeholder='login'
          defaultValue='bảo'
          onChange={handleChange}
        />
        <input
          type='text'
          id='password'
          className='fadeIn third'
          name='password'
          placeholder='password'
          defaultValue='12345'
          onChange={handleChange}
        />
        <input
          type='submit'
          className='fadeIn fourth btn btn-danger'
          defaultValue='Log In'
        />
      </form>
    </div>
  );
};

export default LoginPage;
