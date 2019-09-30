export const  makeHTTPRequest = (url, type, body) => {
    let requestParams = {
        method: type,
        headers : {
            "Content-type": "application/json"
        }
    }
    if(type === "POST"){requestParams.body=JSON.stringify(body)}
    const checkFetchRequestHTTP = response => {
        if(!response.ok) {
            throw Error(`${response.status} : ${response.responseText}`)
        }
        else {return response}
    }

    return fetch(url, requestParams)
        .then(checkFetchRequestHTTP)
        .then(response => response.json())
        .then(data => {
            return {success: true, data: data }
        })
        .catch(error => {
            return {success: false, error: error.toString() }
        })
}
