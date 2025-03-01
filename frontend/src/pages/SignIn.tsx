import { Box, Button, Container, Grid2, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { SignInValues } from "../types/auth";
import AuthHeader from "../components/AuthHeader";
import axiosInstance from "../utility/axios";
import { AuthURLs } from "../utility/apiUrls";
import { useAuth } from "../Contextes/AuthContext";
import LoaderWithErrorHandler from "../components/LoaderWithErrorHandler";

const SignIn: React.FC = () => {
    const { error, loading, login } = useAuth()

    const navigate = useNavigate();

    const formik = useFormik<SignInValues>({
        initialValues: { email: "", password: "" },
        onSubmit: async (values) => {
            await login(values)
        },
    });

    return (
        <Container maxWidth={false} >
            <title>Sign In</title>
            <Grid2 container sx={{ minHeight: "100vh" }}>
                <Grid2 size={{ xs: 12, md: 6 }} >
                    <AuthHeader />
                    <Container sx={styles.container}>
                        <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
                            Welcome back
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Email"
                                {...formik.getFieldProps("email")}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Password"
                                type="password"
                                {...formik.getFieldProps("password")}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={styles.button}
                            >
                                Log in
                            </Button>
                        </form>
                    </Container>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }} sx={styles.grid2Right}>
                    <Box textAlign="center" px={4}>
                        <Typography variant="h5" fontStyle="italic">
                            "The beauty of our application is the ease with which you can use it.
                            Our intuitive design and user-friendly interface ensure that you can
                            navigate through the features effortlessly, making your experience
                            seamless and enjoyable."
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" mt={2}>
                            Jenny Allen
                        </Typography>
                        <Typography variant="body2">Training Strategy Director, AstraZeneca</Typography>
                    </Box>
                </Grid2>
            </Grid2>

            <LoaderWithErrorHandler loading={loading} error={error} />
        </Container>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: { xs: '100%', md: "80%" },
        mt: '20%',
    },
    button: {
        mt: 2,
        py: 1.5,
        fontSize: "1rem",
        fontWeight: "bold",
        background: "linear-gradient(to right, #1976d2, #42a5f5)",
        "&:hover": { background: "linear-gradient(to right, #1565c0, #1e88e5)" },
    },
    grid2Right: {
        background: "linear-gradient(to right, #42a5f5, #1976d2)",
        color: "white",
        display: { xs: 'none', md: "flex" },
        justifyContent: "center",
        alignItems: "center",
        width: '100%'
    },
};


export default SignIn;