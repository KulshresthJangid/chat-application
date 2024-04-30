import axios from 'axios';
import React, { useState } from 'react'


// {
//     "firstName": "Madara",
//     "lastName": "Uchiha",
//     "userName": "madara",
//     "password": "123@abc",
//     "type": "CONSUMER"
// }
const Register = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/register', {username, firstName, lastName, password, type});
        } catch (error) {
            console.error("Registration Failed", error);
        }
    }
  return (
    <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
    </form>
  )
}

export default Register
