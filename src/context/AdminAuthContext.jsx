import { createContext, useContext, useState, useEffect } from "react";

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const savedAdmin = localStorage.getItem("loggedInAdmin");
        if (savedAdmin) {
            setAdmin(JSON.parse(savedAdmin));
        }
    }, []);

    const loginAdmin = (adminData) => {
        localStorage.setItem("loggedInAdmin", JSON.stringify(adminData));
        setAdmin(adminData);
    };

    const logoutAdmin = () => {
        localStorage.removeItem("loggedInAdmin");
        setAdmin(null);
    };

    return (
        <AdminAuthContext.Provider value={{ admin, loginAdmin, logoutAdmin }}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export function useAdminAuth() {
    return useContext(AdminAuthContext);
}
