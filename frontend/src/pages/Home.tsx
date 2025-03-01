import { Box, Button, Container, Typography, Avatar } from "@mui/material";
import { useAuth } from "../Contexts/AuthContext";
import LoaderWithErrorHandler from "../components/LoaderWithErrorHandler";

const Home: React.FC = () => {
    const { user, logout, loading, error } = useAuth()


    return (
        <Container maxWidth={false} sx={styles.root}>


            <Typography variant="h5" gutterBottom>Welcome to the application.</Typography>
            <Box sx={styles.avatarContainer}>
                <Avatar sx={styles.avatar}>{user?.name[0]}</Avatar>
                <Typography variant="h6" color="textSecondary">{user?.name}</Typography>
            </Box>
            <Typography variant="body1" color="textSecondary">Email: {user?.email}</Typography>
            <Box mt={4}>
                <Button variant="contained" color="error" onClick={logout}>Logout</Button>
            </Box>
            <LoaderWithErrorHandler loading={loading} error={error} />
        </Container>
    );
};


const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        mt: 20, height: '80vh'
    },
    avatarContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: 1,
    },
    avatar: { textTransform: 'capitalize' }

}
export default Home;