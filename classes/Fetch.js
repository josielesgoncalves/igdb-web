class Fetch {

    static get(url, params = {}) {
        return Fetch.request('GET', url, params)
    }

    static post(url, params = {}) {
        return Fetch.request('POST', url, params)
    }

    static delete(url, params = {}) {
        return Fetch.request('DELETE', url, params)
    }

    static put(url, params = {}) {
        return Fetch.request('PUT', url, params)
    }

    static request(method, url, params = {}) {
        return new Promise((resolve, reject) => {
            let request;
            switch (method.toLowerCase()) {
                case 'get':
                    request = "https://internet-games-database.herokuapp.com/" + url
                    break;
                default:
                    request = new Request("https://internet-games-database.herokuapp.com/" + url, {
                        method,
                        body: JSON.stringify(params),
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })
                    });
            }

            fetch(request).then(response => {
                response.json().then(json => {

                    resolve(json);

                }).catch(e => {

                    reject(e);

                });
            }).catch(e => {

                reject(e);

            });
        });

    }

}