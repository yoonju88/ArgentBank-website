/**
 * Extract first name and last name form email
 * firstname@lastname.com
 * @param {string} email 
 * @returns {object}
 * 
 */
export const extractNameFromEmail = (email) =>{
    if (!email || typeof email !== 'string') {
        return {FirstName : null, lastName:null}
    }


const [firstNamePart] = email.split('@')
const [firstName]= firstNamePart.split('.')
const [, domainPart]= email.split('@')
const [lastName]= domainPart.split('.')
return { firstName: firstName || null, lastName: lastName || null }

}