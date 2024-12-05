import { getQueryClient } from "@/components/react-query-provider";
import axios from "axios";
import { navigate } from "./router-utils";

const getAuthToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("auth_token") || "";
    }
    return ""; // Return an empty string if window is not defined
};

const authApi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/auth`,
    headers: {
        "Content-Type": "application/json",
        timeout: 1000,
    },
});

authApi.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${getAuthToken()}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor for Global Error Handling
authApi.interceptors.response.use(
    (response) => response,
    (error) => {
        // Any status codes outside the range of 2xx trigger this function
        const status = error.response?.status;

        error.message =
            error.response?.data?.error?.message ||
            "An unexpected error occurred. Please try again.";

        let path = "/";
        if (typeof window !== "undefined") {
            path = window.location.pathname;
        }

        const pathsToIgnore = ["signup", "signin"];
        // Handle errors based on the error status code
        if (status === 401) {
            // Unauthorized
            const queryClient = getQueryClient();
            queryClient.clear();
            localStorage.removeItem("auth_token");

            if (!pathsToIgnore.includes(path)) {
                error.message = "Unauthorized. Please log in.";
                navigate("/signin");
            }
        }

        if (status === 404) {
            // Not found
            return Promise.reject(new Error("NOT_FOUND"));
        }

        return Promise.reject(error);
    }
);


const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
    headers: {
        "Content-Type": "application/json",
        timeout: 1000,
    },
});

// Request Interceptor for updating requests (used for adding access token)
api.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${getAuthToken()}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor for Global Error Handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Any status codes outside the range of 2xx trigger this function
        const status = error.response?.status;
        error.message =
            error.response?.data?.error?.message ||
            "An unexpected error occurred. Please try again.";

        // Handle errors based on the error status code
        if (status === 401) {
            // Unauthorized
            error.message = "Unauthorized. Please log in.";

            const queryClient = getQueryClient();
            queryClient.clear();

            localStorage.removeItem("auth_token");
            navigate("/auth/login");
        }

        if (status === 404) {
            // Not found
            return Promise.reject(new Error("NOT_FOUND"));
        }

        return Promise.reject(error);
    }
);


export { authApi, api }