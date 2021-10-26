import * as yup from 'yup';

const loginSchema = yup.object().shape({
    email: yup.string().email().min(3).max(255).required(),
    password: yup.string().min(6).max(16).required(),
})

export default loginSchema