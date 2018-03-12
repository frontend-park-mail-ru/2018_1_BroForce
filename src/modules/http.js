class http {
        constructor() {
            this.domen = '';
            this.Pt = '';
            this.Gt = '';
            this.htype = '';
            this.jtype = '';
        }

        Get(url, assarr = [{name: htype, value: jtype}]) {
            return this.Req(this.Gt, url, assarr);
        }

        Post(url, data = null, assarr = [{name: htype, value: jtype}]) {
            return this.Req(this.Pt, url, data, assarr);
        }

        Req(method, url, inf, assarr) {
            const param = {
                method: method,
                mode: 'cors',
                credentials: 'include',
            };

            if (method === this.Pt) {
                const harr = new Headers();
                harr.append(assarr);

                param.body = JSON.stringify(body);
                param.headers = harr;
            }

        return fetch(this.domen + url, param)
            .then((response) => {
                 if (response.status >= 400) {
                    throw response;
                 }

                return response.json();
            });
        }
}
