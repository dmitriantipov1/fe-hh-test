import {getApiUrl} from "~/composables/core/api/utils/getApiUrl";

// Here we can expand the return data types, fetchGet / fetchPut / fetchDelete for examples
export interface RestClientComposable {
    fetchPost<T, R = any>(url: string, payload: T): Promise<R>;
}

export function useRestClient(): RestClientComposable {
    const sendRequest = async <T = object>(
        method: string,
        url: string,
        payload: T | FormData,
    ): Promise<any> => {
        try {
            const headers = { 'Content-Type': 'application/json' }

            const response = await fetch(`${getApiUrl()}${url}`, {
                method,
                headers,
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'An error occurred');
            }

            return await response.json();
        } catch (err) {
            throw err;
        }
    };

    const fetchPost = <T>(url: string, payload: T) => sendRequest('POST', url, payload);

    return {
        fetchPost,
    };
}