import assign from 'lodash.assign';
import reduce from 'lodash.reduce';
// import {
//     setAuthToken,
//     getAuthToken,
// } from 'utils';

const handlers = {};

function serialize(obj, prefix) {
    return reduce(obj, (output, value, p) => {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(p)) {
            const k = prefix ? `${prefix}[${p}]` : p;
            output.push(typeof value === 'object' ? serialize(value, k) : `${encodeURIComponent(k)}=${encodeURIComponent(value)}`);
        }
        return output;
    }, []).join('&');
}

export const registerHandlers = (key, f) => {
    handlers[key] = f;
};


function fetchRx(url, optionParams = {}) {
    let resolve;
    let reject;
    let headers;
    let path = url;
    const p = new Promise(((res, rej) => {
        resolve = res; reject = rej;
    }));
    let options = optionParams;
    if (handlers.pre) {
        options = handlers.pre(url, options);
    }

    if (!options.isMedia) {
        options.headers = assign({}, options.headers, {
            'content-type': 'application/json;charset=utf-8',
            accept: 'application/json',
        });
    } else {
        options.headers = assign({}, options.headers);
    }
    // if (getAuthToken()) {
    //     options.headers = assign({}, options.headers, {
    //         'Authorization': getAuthToken(),
    //     });
    // }

    options.method = options.method || 'GET';

    if (options.method === 'patch') {
        options.method = options.method.toUpperCase()
    }

    if (options.query) {
        path = `${url}?${serialize(options.query)}`;
    }

    if (options.method.toUpperCase() !== 'GET' && options.body && !options.isMedia) {
        options.body = JSON.stringify(options.body);
    }

    if (options.headers) {
        // eslint-disable-next-line no-undef
        headers = new Headers(options.headers);
    }

    const request = new Request(path, {
        method: options.method,
        body: options.body,
        headers,
        credentials: options.credentials,
        mode: options.mode,
    });

    let status;
    let error;
    const noParseStatusCodes = [204];
    // eslint-disable-next-line consistent-return
    window.fetch(request).then((response) => {
        error = (!response.ok);
        // eslint-disable-next-line prefer-destructuring
        status = response.status;
        // if (status === 401) {
        //     // setAuthToken(null);
        //     localStorage.clear()
        //     window.window.location.href = `/`
            
        // }
        if (!noParseStatusCodes.includes(status)) {
            try {
                const contentType = response.headers.get('Content-Type');
                if (contentType.includes('json')) { return response.json(); }
                if (contentType.includes('application/x-download')) { return response.blob(); }
                return { body: 'no content' };
            } catch (e) {
                return { body: 'no content' };
                // reject({ status: null, body: { message: 'something went worng' } });
            }
        } else if (status === 204) {
            return { body: 'no content' };
        } else {
            reject({ status, body: { message: 'something went worng' } });
        }
    },
    // eslint-disable-next-line no-unused-vars
    (err) => {
        reject({ status: null, body: { message: 'Request failed, please try again' } });
    })
        .then(
            (json) => {
                if (handlers.post) {
                    const result = handlers.post(status, json);
                    if (!result) { return; }
                }
                if (!error) {
                    resolve(json);
                } else {
                    json.errMsg = 'Something went worng'
                    reject({ status, body: json });
                }
            },
        );
    return p;
}

export default fetchRx;
