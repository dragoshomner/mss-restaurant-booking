import { Link, Typography } from "@mui/material";
import RegisterForm from "./RegisterForm";

export const RegisterFormContainer = ({ goToLoginView }) => {
    return (
        <>
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
                Do have an account? {''}
                <Link variant="subtitle2" onClick={goToLoginView}>Sign in</Link>
            </Typography>

            <RegisterForm goToLoginView={goToLoginView} />
        </>
    )
}