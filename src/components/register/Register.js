import React, { useState, useEffect } from 'react';
import "./register.css";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import logout from '../../images/logout.png';
import Cookies from 'js-cookie';

function RegistrationForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const history = useHistory(); 

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (!isLoggedIn ) {
            history.push("/");
        }
    }, [isLoggedIn, history]);

    const token = Cookies.get('token');
    const isLoggedIn = token !== undefined && token !== null;

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users',{withCredentials: true});
            const responseData = response.data;
            const usersData = responseData.users;
            console.log(usersData); 
            setUsers(usersData);
            
        } catch (error) {
            console.error('Error al cargar la lista de usuarios:', error);
        }
    };



    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/users', {
                name,
                email,
                password,
                role
            });

            console.log('Usuario registrado con éxito:', response.data);

            // Mostrar la ventana flotante de éxito
            setShowSuccess(true);

            // Limpiar los campos del formulario
            setName('');
            setEmail('');
            setPassword('');
            setRole('');

            // Actualizar la lista de usuarios
            fetchUsers();

        } catch (error) {
            console.error('Error al registrar el usuario:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
          const response = await axios.delete(`http://localhost:8000/users/${userId}`);
          console.log('Usuario eliminado con éxito:', response.data);
    
          // Actualizar la lista de usuarios
          fetchUsers();
        } catch (error) {
          console.error('Error al eliminar el usuario:', error);
        }
      };
      const handleGoToHome = () => {
        history.push("/home");
    };

    const handleLogout = async () => {
        try {
          await axios.post('http://localhost:8000/logout');
          Cookies.remove('token'); // Eliminar la cookie en el cliente
          history.push('/'); // Redirigir al inicio de sesión
        } catch (error) {
          console.error('Error al cerrar sesión:', error);
        }
      };

    return (
        <div className='page-container'>
            <div className='sidebar-register'>
                <button className='btn-ver' onClick={() => { fetchUsers(); setShowModal(true); }}>Ver usuarios</button>
                <button className='btn-home' onClick={handleGoToHome}>Inicio</button>
            </div>
            <div className='content'>
                <div className='formulario'>
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div className='formulario'>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='formulario'>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className='formulario'>
                    <label htmlFor="role">Rol:</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                    >
                        <option value="">Seleccione un rol</option>
                        <option value="admin">admin</option>
                        <option value="student">student</option>
                    </select>
                </div>
                <button className='btn-registrar' type="submit" onClick={handleSubmit}>Registrar</button>
            </div>
            {showSuccess && (
                <div className="floating-window">
                    <div className="floating-content">
                        <p>¡Usuario registrado con éxito!</p>
                        <button onClick={() => setShowSuccess(false)}>Cerrar</button>
                    </div>
                </div>
            )}
                <div className='logout-user'>
                    <button onClick={handleLogout} id="btn-logout-user">
                        <img src={logout} alt="li"/>
                    </button>
                </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Lista de usuarios</h3>
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <button onClick={() => handleDeleteUser(user._id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="btn-cerrar" onClick={() => setShowModal(false)}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
}


export default RegistrationForm;