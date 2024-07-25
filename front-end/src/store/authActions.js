/*import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/v1'
export const registerUser = async (email, password) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.post( //Envoie une demande d'API 
            `${baseUrl}/user/login`,
            { email, password },
            config
        )
        return data
    } catch (error) {
        if (error.response && error.response.data.message) {
            return error.response.data.message
        } else {
            return error.message
        }
    }
}


// authAction.js managing and dispatching action that modify the Redux state. 
*/