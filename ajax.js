function _fetch(url, data, method) {
    return fetch(url, {
        body: JSON.stringify(data),
        method,
        credentials: 'same-origin',
    })
}


export function ajax({url, data,query, method = 'GET',timeout=10000}) {
    let promise = _fetch(url, data, method);
    let abort_promise = new Promise((resolve, reject) => {
        setTimeout(()=> {
            reject("timeout");
        }, timeout)
    });
    return Promise.race([promise, abort_promise]).then(resp =>handleResp(resp.json()))
}

function handleResp(resp) {
    if (resp.code != "200") {
        return Promise.reject("error");
    } else {
        return resp;
    }
}
