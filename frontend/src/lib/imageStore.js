export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('StylistDB', 1)

        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(request.result)

        request.onupgradeneeded = (event) => {
            const db = event.target.result
            if (!db.objectStoreNames.contains('images')) {
                db.createObjectStore('images')
            }
        }
    })
}

export const saveImage = async (file) => {
    const db = await openDB()
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['images'], 'readwrite')
        const store = transaction.objectStore('images')
        const request = store.put(file, 'current_upload')

        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
    })
}

export const getImage = async () => {
    const db = await openDB()
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['images'], 'readonly')
        const store = transaction.objectStore('images')
        const request = store.get('current_upload')

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}

export const clearImage = async () => {
    const db = await openDB()
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['images'], 'readwrite')
        const store = transaction.objectStore('images')
        const request = store.delete('current_upload')

        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
    })
}
