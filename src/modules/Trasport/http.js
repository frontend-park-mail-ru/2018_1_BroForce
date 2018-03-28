const server='';

export default class Transport {
    static FGet(addr) {
        const url = server+addr;
        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            credential: 'include',
        })
            .then((response) => {
                if (response.status >= 400) {
                    throw response;
                }

                return response.json();
            });
    }

    static FPost(addr, body) {
        const url = server+addr;
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
                if (response.status >= 400) {
                    throw response;
                }

                return response.json();
            });
    }
}

