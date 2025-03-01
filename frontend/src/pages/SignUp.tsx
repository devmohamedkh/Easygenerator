import React from "react";
import { useNavigate } from "react-router";
import { TextField, Button, Container, Typography, Box, Grid2 } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SignUpValues } from "../types/auth";
import AuthHeader from "../components/AuthHeader";
import LoaderWithErrorHandler from "../components/LoaderWithErrorHandler";
import { useAuth } from "../Contexts/AuthContext";

const SignUp: React.FC = () => {
    const { error, loading, signup } = useAuth()

    const navigate = useNavigate();

    const formik = useFormik<SignUpValues>({
        initialValues: { email: "", name: "", password: "" },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            name: Yup.string().min(3).required(),
            password: Yup.string()
                .min(8)
                .matches(/[a-zA-Z]/, "Must include a letter")
                .matches(/[0-9]/, "Must include a number")
                .matches(/[!@#$%^&*]/, "Must include a special character")
                .required("Required"),
        }),
        onSubmit: async (values) => {
            const res = await signup(values)
            if (res) {
                navigate("/signin");
            }
        },
    });



    return (
        <Container maxWidth={false} disableGutters>
            <title>Sign up</title>

            <Grid2 container sx={{ minHeight: "100vh" }}>
                <Grid2 size={{ xs: 12, md: 6 }} sx={styles.grid2Left}>
                    <AuthHeader isSignUp />
                    <Container sx={styles.container}>
                        <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom>
                            Join us and unleash your potential!
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Name"
                                {...formik.getFieldProps("name")}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />

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
                                disabled={formik.isSubmitting}
                            >
                                sign up
                            </Button>
                        </form>
                    </Container>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }} sx={styles.grid2Right}>
                    <Box textAlign="center" px={4}>
                        <Typography variant="h5" fontStyle="italic">
                            "The beauty of our application is the ease with which you can use it."
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
    grid2Left: {},
    grid2Right: {
        background: "linear-gradient(to right, #42a5f5, #1976d2)",
        color: "white",
        display: { xs: 'none', md: "flex" },
        justifyContent: "center",
        alignItems: "center",
    },
};

export default SignUp