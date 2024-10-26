// app/page.js

"use client";

import React from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { useRouter } from "next/navigation"; // Change this import

const HomePage = () => {
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const router = useRouter(); // Access Next.js router

    const handleLogin = async () => {
        try {
            await instance.loginRedirect({
                scopes: ["User.Read"],
                postLoginRedirectUri: "/dashboard", // Redirect to your dashboard
            });
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleLogout = () => {
        instance.logoutRedirect({
            postLogoutRedirectUri: "/", // Redirect after logout
        });
    };

    return (
        <div>
            <h1>Welcome to the Next.js App</h1>
            {isAuthenticated ? (
                <div>
                    <p>You are logged in!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <button onClick={handleLogin}>Login with Azure AD</button>
            )}
        </div>
    );
};

export default HomePage;
