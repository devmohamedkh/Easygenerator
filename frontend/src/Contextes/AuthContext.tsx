import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axiosInstance from "../utility/axios";
import { jwtDecode } from "jwt-decode";
import { AuthURLs } from "../utility/apiUrls";
import { SignInValues, SignUpValues } from "../types/auth";


interface User {
    _id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (data: SignInValues) => Promise<boolean>;
    signup: (data: SignUpValues) => Promise<boolean>;
    logout: () => Promise<void>;
    error: string | null
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cookies, , removeCookie] = useCookies(["Authentication", 'RefreshToken']);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (cookies.RefreshToken) {
            const user = jwtDecode<{ userId: string }>(cookies.RefreshToken)

            axiosInstance.get("/users/" + user.userId)
                .then((res) => setUser(res.data))
                .catch(() => setUser(null))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [cookies.RefreshToken]);

    const logout = async () => {
        await axiosInstance.post(AuthURLs.logOut, {});

        removeCookie("Authentication");
        removeCookie("RefreshToken");
        setUser(null);
    };



    const login = async (data: SignInValues): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.post(AuthURLs.login, data);
            setUser(res.data.user);
            return true
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
            return false
        } finally {
            setLoading(false);
        }
    };

    const signup = async (data: SignUpValues): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            await axiosInstance.post(AuthURLs.signUp, data)
            return true

        } catch (err: any) {
            setError(err.response?.data?.message || "Signup failed");
            return false
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout, login, signup, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
