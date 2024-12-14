export const BASE_URL = 'http://localhost:3000';
export const BASE_API_URL = '/api';

export function getApiUrl(): string {
    return `${BASE_URL}${BASE_API_URL}`;
}