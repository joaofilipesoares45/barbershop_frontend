const connectionApi = async (type, path, body) => {
    const href = `http://127.0.0.1:5001/${path}`;
    if (!body) {
        body = undefined
    }
    let headers = {}
    switch (type) {
        case 'get':
            headers = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    filter: JSON.stringify(body)
                },
                method: 'GET',
            }
            try {
                return await fetch(href, headers).then(res => { return res.json() });
            } catch (error) {

            }
            break
        case 'post':
            headers = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(body)
            }
            try {
                return await fetch(href, headers).then(res => { return res });
            } catch (error) {

            }
            break
        case 'delete':
            headers = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "DELETE",
                body: JSON.stringify(body)
            }
            try {
                return await fetch(href, headers).then(res => { return res });
            } catch (error) {

            }
            break

        case 'put':
            headers = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify(body)
            }
            try {
                return await fetch(href, headers).then(res => { return res });
            } catch (error) {

            }
            break
        default:
            break
    }
}

export { connectionApi } 