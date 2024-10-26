// app/dashboard/page.js

"use client";

import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";

const Dashboard = () => {
    const { instance, inProgress } = useMsal();
    const [isLoading, setIsLoading] = useState(false);
    const [isLogoutInProgress, setIsLogoutInProgress] = useState(false);

    const envVars = {
        cloudInstance: process.env.NEXT_PUBLIC_CLOUD_INSTANCE,
        tenantId: process.env.NEXT_PUBLIC_TENANT_ID,
    };

    useEffect(() => {
        console.log("Loaded Environment Variables:", envVars);
    }, []);

    const handleSignOut = async () => {
        if (inProgress !== InteractionStatus.None) {
            console.log("Logout already in progress.");
            return;
        }

        if (!envVars.cloudInstance || !envVars.tenantId) {
            console.error("Invalid environment variables", envVars);
            return;
        }

        setIsLoading(true);
        setIsLogoutInProgress(true);
        sessionStorage.removeItem("msalInteractionStatus");

        try {
            await instance.logoutRedirect({
                postLogoutRedirectUri: "/",
                account: instance.getActiveAccount(),
            });
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setIsLogoutInProgress(false);
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleSignOut} disabled={isLogoutInProgress}>
                {isLogoutInProgress ? "Logging out..." : "Logout"}
            </button>
        </div>
    );
};

export default Dashboard;
