import { Box, Button, Container, Grid2, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { SignInValues } from "../types/auth";
import { useAuth } from "../Contexts/AuthContext";
import LoaderWithErrorHandler from "../components/LoaderWithErrorHandler";
import * as Yup from "yup";
import { Link } from "react-router";
import { PagesURL } from "../utility/pageURLs";
import BgImage from '../assets/bg.jpg'


const SignIn: React.FC = () => {
    const { error, loading, login } = useAuth()


    const formik = useFormik<SignInValues>({
        initialValues: { email: "", password: "" },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().required("Required"),
        }),
        onSubmit: async (values) => {
            await login(values)
        },
    });


    return (
        <Container maxWidth={false} disableGutters>
            <title>Sign In</title>
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
                            Login
                        </Typography>
                        <Typography variant="body1" color="textSecondary" mb={3}>
                            Enter your email below to login to your account
                        </Typography>

                        <TextField
                            fullWidth
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
                            Login
                        </Button>

                        <Typography variant="body2" sx={styles.hintText}>
                            Don't have an account?{" "}
                            <Link
                                to={PagesURL.signup}
                                style={styles.link}
                            >
                                Sign up
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


export default SignIn;