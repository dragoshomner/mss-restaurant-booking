import { Link, Typography, Alert } from "@mui/material";
import { Stack } from "@mui/system";
import LoginForm from "./LoginForm";

export const LoginFormContainer = ({ goToRegisterView, alert, setAlert }) => {
    return (
        <>
            <Typography variant="h4" gutterBottom>
                Sign in
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
                Don’t have an account? {''}
                <Link variant="subtitle2" onClick={goToRegisterView}>Get started</Link>
            </Typography>

            { alert.message.length > 0 && (
                <Stack mb={3}>
                    <Alert severity={alert.severity}>{ alert.message }</Alert>
                </Stack>
            )}
            <LoginForm setAlert={setAlert} />
        </>
    )
}