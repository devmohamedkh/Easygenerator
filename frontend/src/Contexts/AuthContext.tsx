import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axiosInstance from "../utility/axios";
import { AuthURLs, UserURLs } from "../utility/apiUrls";
import { SignInValues, SignUpValues } from "../types/auth";
import CookieService from "../utility/cookieService";
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
    error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [cookies] = useCookies(["Authentication", "ud"]);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!user && cookies.ud) {
                    const res = await axiosInstance.get(
                        UserURLs(cookies.ud.userId).getUserById
                    );
                    setUser(res.data);
                }
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [cookies.ud]);

    const logout = async () => {
        await axiosInstance.post(AuthURLs.logOut, {});
        CookieService.clearAll();
        setUser(null);
    };

    const login = async (data: SignInValues): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            const res = await axiosInstance.post(AuthURLs.login, data);

            CookieService.setUserData(res.data.accessToken);

            return true;
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const signup = async (data: SignUpValues): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            await axiosInstance.post(AuthURLs.signUp, data);
            return true;
        } catch (err: any) {
            setError(err.response?.data?.message || "Signup failed");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, logout, login, signup, error }}
        >
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
