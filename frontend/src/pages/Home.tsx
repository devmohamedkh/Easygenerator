import { Box, Button, Container, Typography } from "@mui/material";
import axiosInstance from "../utility/axios";
import { AuthURLs } from "../utility/apiUrls";
import { useAuth } from "../Contextes/AuthContext";
import LoaderWithErrorHandler from "../components/LoaderWithErrorHandler";

const Home: React.FC = () => {
    const { user, logout, loading, error } = useAuth()

    const handleLogout = async () => {
        await axiosInstance.post(AuthURLs.logOut)
        logout()
    };

    return (
        <Container maxWidth={false} sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h4" gutterBottom>Welcome to the application.</Typography>
            <Typography variant="h4" color="textSecondary">{user?.name}</Typography>
            <Box mt={4}>
                <Button variant="contained" color="error" fullWidth onClick={handleLogout}>Logout</Button>
            </Box>
            <LoaderWithErrorHandler loading={loading} error={error} />
        </Container>
    );
};

export default Home;