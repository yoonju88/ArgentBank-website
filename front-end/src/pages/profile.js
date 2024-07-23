import { useSelector } from "react-redux";
import AccountItem from "../content/Account";
import { accountList } from "../content/data/accountList"
import Button from "../components/Button";
function Profile() {
   const {user} = useSelector((state)=> state.auth);
   
    return (
        <>
            <div className="header">
                <h1>Welcome back <br /> {user?.firstName} {user?.lastName}!</h1>
                <Button className="edit-button">Edit Name</Button>
            </div>
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