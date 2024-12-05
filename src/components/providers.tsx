"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { RouterProvider } from "@/components/router-provider";
import ReactQueryProvider from "@/components/react-query-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Providers = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <RouterProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <ReactQueryProvider>
                    <GoogleOAuthProvider
                        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
                    >
                        {children}
                    </GoogleOAuthProvider>
                </ReactQueryProvider>
            </ThemeProvider>
        </RouterProvider>
    )
}

export default Providers;