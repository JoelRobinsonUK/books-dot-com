import { useState } from "react";

const useFetch = () => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (url, callback) => {
        setData(null);
        setIsPending(true);
        setError(null);

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error("Something went wrong");
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setIsPending(false);
            });

        callback(data, error);
    };

    return { data, isPending, error, fetchData };
};

export default useFetch;
