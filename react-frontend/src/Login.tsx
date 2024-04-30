import axios from "axios";
import React, { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/login", {username, password});
            const token = response.data.token;
            localStorage.setItem("ut", token);
        } catch (error) {
            console.error("Login failed", error);
        }
    }
  return (
    <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
    </form>
  );
};

export default Login;
