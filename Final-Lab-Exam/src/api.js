const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');

export async function apiRequest(path, options = {}) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
        const validationMessage = Object.values(payload?.errors || {}).flat()[0];
        throw new Error(validationMessage || payload?.message || `Request failed (${response.status}).`);
    }

    return payload?.data ?? payload;
}