import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import {
    GridLoader

} from "react-spinners";

interface LoaderProps {
    loading: boolean;
    error?: string | null
}


const LoaderWithErrorHandler: React.FC<LoaderProps> = ({ loading, error }) => {
    const { enqueueSnackbar } = useSnackbar()


    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' })
        }
    }, [error])


    return (
        loading && (
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.7)", // Black semi-transparent bg
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 9999, // Ensure it appears above other elements
                }}
            >
                <GridLoader

                    size={10} color=" #42a5f5" />
            </Box>
        )
    );
};

export default LoaderWithErrorHandler;
