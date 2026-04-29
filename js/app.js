const showLoading = (containerId) => {
    document.getElementById(containerId).innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `
}

const showError = (containerId, message) => {
    document.getElementById(containerId).innerHTML = `
        <div class="error-message">
            <p>⚠ ${message}</p>
        </div>
    `
}

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

const buildQueryString = (params) => {
    const query = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        if (value) query.set(key, value)
    })
    return query.toString()
}