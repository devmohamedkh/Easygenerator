import React from "react";
import { Link, useNavigate } from "react-router";
import { TextField, Button, Container, Typography, Box, Grid2 } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SignUpValues } from "../types/auth";
import LoaderWithErrorHandler from "../components/LoaderWithErrorHandler";
import { useAuth } from "../Contexts/AuthContext";
import { PagesURL } from "../utility/pageURLs";
import BgImage from '../assets/bg.jpg'

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

            <Grid2 container sx={styles.container}>
                {/* Left Side - Login Form */}
                <Grid2
                    size={styles.gridLeft}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box sx={styles.form} component={'form'}

                        onSubmit={formik.handleSubmit}
                    >
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Join us and unleash your potential!
                        </Typography>

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
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={styles.button}
                            disabled={formik.isSubmitting}
                        >
                            Sign up
                        </Button>

                        <Typography variant="body2" sx={styles.hintText}>
                            Already have an account?{" "}
                            <Link
                                to={PagesURL.signin}
                                style={styles.link}
                            >
                                Login
                            </Link>
                        </Typography>
                    </Box>
                </Grid2>

                {/* Right Side - Image */}
                <Grid2 size={{ xs: false, md: 6 }} sx={styles.gridRight(BgImage)} />
            </Grid2>


            <LoaderWithErrorHandler loading={loading} error={error} />
        </Container>
    );
};

const styles = {
    container: { height: "100vh" },
    button: {
        py: 1.5,
        bgcolor: "#0D1117",
        "&:hover": { bgcolor: "#161B22" },
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
    },
    gridLeft: { xs: 12, md: 6 },
    form: { width: "100%", maxWidth: 500, px: { xs: 2, sm: 4 } },
    hintText: { mt: 3, textAlign: "center" },
    link: {
        textDecoration: "none",
        fontWeight: "bold",
        color: "#0D1117",
    },
    gridRight: (img: string) => ({
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
    }),
};

export default SignUp