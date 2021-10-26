import * as yup from 'yup'

const registerSchema = yup.object().shape({
    name: yup.string().matches(/^[aA-zZ\s]*$/, "please do not use abreviations, numbers, or special characters in field 'name'").min(2).max(255).required(),
    email: yup.string().email().max(255).required(),
    password: yup.string().min(6).max(16).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'),null],'Passwords does not match').required('Confirm password is a required field')
})

export default registerSchema