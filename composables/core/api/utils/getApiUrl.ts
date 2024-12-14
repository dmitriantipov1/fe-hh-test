export const BASE_API_URL = '/api';

export function getApiUrl(): string {
    const config = useRuntimeConfig();
    return `${config.public.BASE_URL}${BASE_API_URL}`;
}