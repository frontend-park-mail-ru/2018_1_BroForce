(function() {
    'use strict';

    class http {
        Get({url = '/', callback = noop} = {}) {
            return new Promise(function(succeed, fail) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', http.baseUrl + url, true);
            xhr.addEventListener('load', function() {
                if (xhr.readyState != 4) {
                    return;
                }

                if (xhr.status === 200) {
                   succeed(xhr.responseText);
                } else {
                    fail(new Error('Req fail - ' + xhr.responseText));
                }
        });
            xhr.addEventListener('error', function() {
                fail(new Error('error'));
            });
            xhr.send(null);
        });
        }

        Post({url = '/', callback = noop, data = {}} = {}) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', http.baseUrl + url, true);

            xhr.onreadystatechange = function() {
                if (xhr.readyState != 4) {
                    return;
                }

                if (xhr.status < 300) {
                    const responseText = xhr.responseText;

                    try {
                        const response = JSON.parse(responseText);
                        callback(null, response);
                    } catch (err) {
                        console.error('doPost error: ', err);
                        callback(err);
                    }
                } else {
                    callback(xhr);
                }
            };

            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            xhr.withCredentials = true;

            xhr.send(JSON.stringify(data));
        }
    }

    http.baseUrl = '';

    window.http = http;
})();
