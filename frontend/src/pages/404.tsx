import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <Container sx={styles.root}>
            <Typography variant="h1" component="h1" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                Page Not Found
            </Typography>
            <Typography variant="body1" gutterBottom>
                The page you are looking for does not exist.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleGoBack}>
                Go to Home
            </Button>
        </Container>
    );
};


const styles = {
    root: {
        textAlign: 'center',
        mt: 20,
    }
}
export default NotFoundPage;