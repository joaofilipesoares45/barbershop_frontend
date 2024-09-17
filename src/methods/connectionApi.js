import { setMsg } from "../pages/home/components/notif";

const connectionApi = async (type, path, body) => {
    const href = `http://127.0.0.1:5001/${path}`;
    if (!body) {
        body = undefined
    }
    let headers = {}

    const load = document.querySelector('section.modal.load')

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
                return await fetch(href, headers).then(res => { load.removeAttribute('load'); return res.json() });
            } catch (error) {
                load.setAttribute('load', '')
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