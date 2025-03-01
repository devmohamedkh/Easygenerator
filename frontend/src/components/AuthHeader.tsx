import { Box, Button, Typography } from '@mui/material';
import easygenerator from '../assets/easygenerator.svg'
import React from "react";


const AuthHeader: React.FC<{ isSignUp?: boolean }> = ({ isSignUp = false }) => {
    return (
        <Box sx={{ py: 2, px: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box display="flex" alignItems="center">
                <Box
                    component="img"
                    src={easygenerator}
                    alt="Easy Generator Logo"
                    sx={{ height: 40, mr: 1 }}
                />
            </Box>

            <Box display="flex" alignItems="center">
                <Typography variant="body2" sx={{ color: "#777", mr: 2 }}>
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}
                </Typography>
                <Button
                    variant="outlined"
                    LinkComponent={"a"}
                    href={isSignUp ? "/signin" : "/signup"}
                    sx={{
                        borderRadius: 20,
                        px: 3,
                        py: 0.5,
                        borderColor: "#ddd",
                        color: "#3a3a3a",
                        fontWeight: "bold",
                        '&:hover': { backgroundColor: "#f5f5f5" },
                        fontSize: "0.8rem",
                    }}
                >
                    {isSignUp ? "Log in" : "Sign up"}
                </Button>
            </Box>
        </Box>
    );
};


export default AuthHeader;