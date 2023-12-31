import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, checkPassword) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
            "https://books-api-4e8h.onrender.com/api/user/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, checkPassword }),
            },
        );

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        } else {
            //save user to local storage
            localStorage.setItem("user", JSON.stringify(json));

            //update auth content
            dispatch({ type: "LOGIN", payload: json });

            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};
