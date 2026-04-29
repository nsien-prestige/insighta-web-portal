const api = {
    async request(endpoint, options = {}) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            credentials: 'include', // sends cookies automatically
            headers: {
                'Content-Type': 'application/json',
                'X-API-Version': '1',
                ...options.headers
            }
        })

        // If 401, try to refresh token
        if (response.status === 401) {
            const refreshed = await this.refresh()
            if (refreshed) {
                // Retry original request
                return fetch(`${API_URL}${endpoint}`, {
                    ...options,
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-Version': '1',
                        ...options.headers
                    }
                })
            } else {
                window.location.href = '/index.html'
                return
            }
        }

        return response
    },

    async refresh() {
        try {
            const response = await fetch(`${API_URL}/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            })
            return response.ok
        } catch {
            return false
        }
    },

    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' })
    },

    async post(endpoint, body) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        })
    },

    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' })
    }
}