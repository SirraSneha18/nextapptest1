// app/authConfig.js

export const msalConfig = {
    auth: {
        clientId: "42e154f3-8dbd-4e5f-b1c0-e9f8231bf312", // Replace with your Azure AD application client ID
        authority: "https://login.microsoftonline.com/9329c02a-4050-4798-93ae-b6e37b19af6d", // Replace with your tenant ID
        redirectUri: "", // Change to your redirect URI
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: true, // Set this to true for IE 11
    },
};
