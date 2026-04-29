const checkAuth = async () => {
    try {
        const response = await api.get('/auth/me')
        if (!response || !response.ok) {
            window.location.href = '/index.html'
            return null
        }
        const data = await response.json()
        return data.data
    } catch {
        window.location.href = '/index.html'
        return null
    }
}

const logout = async () => {
    try {
        await api.post('/auth/logout', {})
    } catch {
        // ignore errors
    } finally {
        window.location.href = '/index.html'
    }
}

const getLoginUrl = () => {
    return `${API_URL}/auth/github`
}