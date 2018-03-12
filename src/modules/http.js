(function() {
    'use strict';

    class http {
        constructor() {
            const domen = '';
            const Pt = '';
            const Gt = '';
            const htype = '';
            const jtype = '';
        }

        Get(url, assarr = [{name: htype, value: jtype}]) {
            return this.doRequest(Gt, url, assarr);
        }

        Post(url, data = null, assarr = [{name: htype, value: jtype}]) {
            return this.doRequest(Pt, url, data, assarr);
        }

        Req(method, url, inf, assarr) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open(method, `${this.domen}${url}`, true);

                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText);

                    if (xhr.status < 400) {
                        resolve(response);
                    } else {
                        reject(response.message);
                    }
                });

                for (let prop in assarr ) {
                    xhr.setRequestHeader(current.name, current.value);
                }
                xhr.withCredentials = true;

                inf ? xhr.send(JSON.stringify(data)) : xhr.send();
            });
        }
    }
})();
