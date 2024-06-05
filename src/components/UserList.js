import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserList = () => {
    const [users, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get('https://manajamen-backend-cvbl6cy73a-et.a.run.app/users');
        setUser(response.data);
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`https://manajamen-backend-cvbl6cy73a-et.a.run.app/users/${id}`);
            getUsers();
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        navigate('/');
    };

    return (
        <section className="section">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-10">
                        <div className="box">
                            <div className="level">
                                <div className="level-left">
                                    <h1 className="title">User List</h1>
                                </div>
                                <div className="level-right">
                                    <Link to="/add" className="button is-success">
                                        New User
                                    </Link>
                                    <button onClick={logout} className="button is-danger ml-2">
                                        Logout
                                    </button>
                                </div>
                            </div>
                            <table className="table is-striped is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Gender</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={user.id}>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.gender}</td>
                                            <td>
                                                <div className="buttons">
                                                    <Link to={`/edit/${user.id}`} className="button is-small is-info">
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => deleteUser(user.id)}
                                                        className="button is-small is-danger"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserList;
