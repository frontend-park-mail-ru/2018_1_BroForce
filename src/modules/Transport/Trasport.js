const server='';

const urlBack = 'http://localhost:8081';

export default class Transport {
    static Get(adr) {
        return Transport.FSend(urlBack + adr, 'get');
    }

    static Post(adr, body) {
        return Transport.FSend(urlBack + adr, 'post', body);
    }

    static FSend(adr, method, body = {}) {
        const url = server+adr;
        const fPar = {
            method: method,
            mode: 'cors',
            credentials: 'include',
        };
        if (method === 'post') {
            fPar.body = JSON.stringify(body);
            fPar.headers = {
                'Content-Type': 'application/json; charset=utf-8',
            };
        }
        return fetch(url, fPar)
            .then((response) => {
                if (response.status >= 400) {
                    throw response;
                }

                return response.json();
            });
    }
}

