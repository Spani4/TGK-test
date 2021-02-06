import { required, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators';


export default {

    email: {
        required,
        max: maxLength(100),
        email,
    },
    
    password: {
        required,
        max: maxLength(100),
        min: minLength(2),
    },

    // passwordConfirm: {
    //     sameAsPassword: sameAs('password'),
    // },
}