const checkAuth = async () => {
    try {
        console.log('Checking auth...')
        const response = await api.get('/auth/me')
        console.log('Auth response status:', response?.status)
        if (!response || !response.ok) {
            console.log('Auth failed, redirecting to login')
            window.location.href = '/index.html'
            return null
        }
        const data = await response.json()
        console.log('Auth success:', data.data?.username)
        return data.data
    } catch (err) {
        console.log('Auth error:', err)
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