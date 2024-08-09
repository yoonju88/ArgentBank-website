import React from 'react'
import {Link} from 'react-router-dom'

function ErrorPage (){
    return (
    <div className='error-container'>
            <p className='error-page-msg'>The page you request <br/> dose not exist...</p>
            <p className='error-link'> 
                <Link to='/'>
                Return to home page
                </Link>
            </p>
        </div>
    )
}
export default ErrorPage