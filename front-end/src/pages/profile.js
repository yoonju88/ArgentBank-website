import { useSelector, useDispatch } from "react-redux";
import AccountItem from "../components/Account";
import { accountList } from "../containers/data/accountList"
import Button from "../components/Button";
import { useState, useEffect } from "react";
import Field from "../components/Field";
import Modal from "../containers/modal"
import { updateUserFailure } from '../store/authSlice'
import { updateUserProfile } from '../api/api'
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
        //console.log("resultAction: ", resultAction)
        //console.log ("profileupdate:", resultAction.payload)
        if (updateUserProfile.fulfilled.match(resultAction)) {
            //console.log('Profile update succeeded:', resultAction.payload)     
        } else {
            dispatch(updateUserFailure(resultAction.payload))
            //console.error('Profile update failed:', resultAction.payload)
        }
        setIsModalOpen(false)
    }

    useEffect(() => { 
        if (user && user.userName) {
            setUserName(user.userName)
        }
    }, [user]) // to maintain newUserName even refresh the page

    useEffect (() => {
        if (!token) {
            return navigate('/')
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
                            <h1> Edit Name </h1>
                            <form onSubmit={handleSubmit}>
                                <Field
                                    label="User Name"
                                    type="text"
                                    id="text"
                                    name="User Name"
                                    autoComplete="on"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    Required
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