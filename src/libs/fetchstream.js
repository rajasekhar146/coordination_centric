
import assign from 'lodash.assign';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import fetchWrapper from './fetch';


export default class FetchStream {
    constructor(inputStream, options) {
        this.options = options || {};
        this.inputStream = inputStream;
        this.outputStream = new BehaviorSubject();
        this.lastValue = null;
        this.outputStream.subscribe((v) => { this.lastValue = v; });
    }

    reload() {
        this.fetch(this.lastInput);
    }

    trigger() {
        if (!this.triggerred) {
            this.triggerred = true;
            this.inputStream.subscribe((input) => {
                this.lastInput = input;
                this.fetch(input);
            });
        }
    }

    emit(data) {
        this.outputStream.next(data);
    }

    getValue() {
        return this.lastValue;
    }

    getStream() {
        return this.outputStream.pipe(filter((x) => !!x));
    }

    fetch(input) {
        if (input.error) {
            this.emit({ status: 'error', message: input.error });
            return;
        }

        let oldStreamData = this.getValue();
        this.outputStream.next(assign({}, oldStreamData, { status: 'loading', currentObserver: input.currentObserver }));
        oldStreamData = this.getValue();
        const { url } = input;
        const requestOptions = {
            method: input.method,
            headers: input.headers,
            query: input.query,
            body: input.body,
            isMedia: input.isMedia,
            token: input.token,
            credentials: input.credentials,
            mode: input.mode,
        };

        if (input.mock) {
            setTimeout(() => {
                this.outputStream.next({
                    data: input.mock,
                    status: 'loaded',
                    currentObserver: input.currentObserver,
                });
            });
            return;
        }
        const p = fetchWrapper(url, requestOptions);
        p.then((response) => {
            const newData = response;
            const newStreamData = {
                data: newData,
                status: 'loaded',
                currentObserver: input.currentObserver,
            };
            this.outputStream.next(newStreamData);
        }, (response) => {
            this.outputStream.next({
                status: 'error',
                statusCode: response.status,
                body: response.body,
                currentObserver: input.currentObserver,
            });
        });
        // eslint-disable-next-line consistent-return
        return p;
    }
}
