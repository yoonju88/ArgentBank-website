import { useSelector } from "react-redux";
import AccountItem from "../content/Account";
import { accountList } from "../content/data/accountList"
import Button from "../components/Button";
import { useState } from "react";
import Field from "../components/Field";
import Modal from "../content/modal"


function Profile() {
   const {user} = useSelector((state)=> state.auth);
   const {userName, setUserName} = useState('')
   const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }
    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        closeModal()
    }
   
    return (
        <>
            <div className="header">
                <h1>Welcome back <br /> {user?.firstName} {user?.lastName}!</h1>
                <Button className="edit-button" onClick ={openModal}>Edit Name</Button>
            </div>
            {isModalOpen && (
                <Modal
                    onClick={closeModal}
                    Content={
                    <div>
                        <h1> Edit Name </h1>
                        <form onSubmit='#'>
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
                            <Button className="modal-button" onClick={closeModal}>Save</Button>
                        </form>
                    </div>
                }
                /> 
            )}
                
            <h2 className="sr-only">Accounts</h2>
            {accountList.map (e => (
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