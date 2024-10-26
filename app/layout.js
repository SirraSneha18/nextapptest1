// app/layout.js
"use client";

import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "../config"; // Adjust the path as needed
import { PublicClientApplication } from "@azure/msal-browser";

const msalInstance = new PublicClientApplication(msalConfig);

const Layout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <MsalProvider instance={msalInstance}>
                    {children}
                </MsalProvider>
            </body>
        </html>
    );
};

export default Layout;
