import axios from 'axios';


const baseUrl = 'http://localhost:3001/api/v1'


export const registerUser = async (email, password) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.post(
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
