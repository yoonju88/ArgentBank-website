import { useSelector, useDispatch } from "react-redux";
import AccountItem from "../components/Account";
import { accountList } from "../containers/data/accountList"
import Button from "../components/Button";
import { useState, useEffect } from "react";
import Field from "../components/Field";
import Modal from "../containers/modal"
import { updateUserFailure, loginUserSuccess } from '../redux/authSlice'
import { updateUserProfile } from '../redux/api'
import {useNavigate} from 'react-router-dom';

function Profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, token } = useSelector((state) => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [userName, setUserName] = useState('')
    const openModal = () => { setIsModalOpen(true) }
    const closeModal = () => { setIsModalOpen(false) }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(updateUserProfile({ newUserName: userName, token }))
        if (updateUserProfile.fulfilled.match(resultAction)) {
            const updatedUser = { ...user, userName: userName };
            dispatch(loginUserSuccess({ user: updatedUser, token }));
            localStorage.setItem('user', JSON.stringify(updatedUser));
            closeModal()
        } else {
            dispatch(updateUserFailure(resultAction.payload))
            console.error('Profile update failed:', resultAction.payload);
        }
    }

    useEffect(() => { 
        if (user && user.userName) {
            setUserName(user.userName)
        }
    }, [user]) // to maintain newUserName even refresh the page
    
    useEffect (() => {
        if (!token) {
            return navigate('/login')
        }
    }, [token, navigate])

    return (
        <>
            <div className="header">
                <h1>Welcome back
                    <br />
                    {user && userName ? `${user.userName}` : `${user.firstName} ${user.lastName}`} !
                </h1>
                <Button className="edit-button" onClick={openModal}>Edit Name</Button>
            </div>
            {isModalOpen && (
                <Modal
                    onClick={closeModal}
                    Content={
                        <div>
                            <h1> Edit user infos</h1>
                            <form onSubmit={handleSubmit}>
                                <Field
                                    label="User Name"
                                    type="text"
                                    id="text"
                                    name="User Name"
                                    autoComplete="on"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                                 <Field
                                    label="Fist Name"
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    autoComplete= 'null'
                                    placeholder ={user.firstName}   
                                    value={user.firstName}                                 
                                    readOnly
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="input-non-modi"
                                />
                                  <Field
                                    label="Last Name"
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    placeholder ={user.lastName}   
                                    value={user.lastName}                                 
                                    readOnly
                                    autoComplete= 'null'
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="input-non-modi"
                                />
                                <Button className="modal-button" type="submit">Save</Button>
                            </form>
                        </div>
                    }
                />
            )}

            <h2 className="sr-only">Accounts</h2>
            {accountList.map(e => (
                <AccountItem
                    key={e.id}
                    title={e.title}
                    amount={e.amount}
                    description={e.description}
                />
            ))}
        </>
    )
}

export default Profile;