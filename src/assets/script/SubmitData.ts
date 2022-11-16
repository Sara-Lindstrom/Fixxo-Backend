export const submitData = async (url, method, data, contentType = 'application/json') => {

    // Post comment to Api returns success och failed to submit
    const result = await fetch (url, {
        method: method,
        headers:{
        'Content-Type': contentType
        },
        body: data
    })
        console.log(result)

            if (result.status === 200){
            return true
        }

        return false
}