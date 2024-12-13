export interface MockedResponse {
    status: 'success' | 'error';
    output?: string;
    error?: string;
}