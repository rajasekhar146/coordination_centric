import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import merge from 'lodash.merge';
import isFunction from 'lodash.isfunction';
import uniqueId from 'lodash.uniqueid';
import assign from 'lodash.assign';
import find from 'lodash.find';
import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import clonedeep from 'lodash.clonedeep';
import FetchStream from './fetchstream';

export default class Store {
    constructor(initialValue, observers, interceptors, loadServerData) {
        let serverData = {};
        this.observers = observers || [];
        if (isFunction(loadServerData)) {
            serverData = loadServerData.call(this);
        }
        this.initialValue = merge({}, initialValue, serverData);
        this.stream = new BehaviorSubject(initialValue);
        this.requestStream = new Subject();
        this.registerObservables(this.observers);
        this.registerFetchObserver();
        this.interceptor = interceptors;
    }

    registerFetchObserver() {
        this.fetchStream = new FetchStream(this.requestStream);
        this.fetchStream.trigger();
        this.fetchStream.getStream().subscribe((output) => this.processResponse(output));
    }

    // eslint-disable-next-line consistent-return
    processResponse(input) {
        const { currentObserver } = input;
        const { outputField } = currentObserver;
        // eslint-disable-next-line no-param-reassign
        delete input.currentObserver;
        const loadingLabel = currentObserver.statusLabel || 'loading';
        const { responseInterceptor } = this.interceptor || {};
        let output = input;

        const { status } = output;

        if (status === 'loading') {
            setTimeout(() => {
                this.set({ [loadingLabel]: 'loading' });
            });
        } else if (status === 'loaded') {
            if (isFunction(responseInterceptor)) {
                output = this.interceptor.responseInterceptor(output);
            }
            let data = null;
            if (isFunction(currentObserver.parse)) {
                data = currentObserver.parse(output, currentObserver.config);
            } else {
                data = output.data;
            }
            setTimeout(() => {
                this.setResponse(outputField, loadingLabel, data, 'loaded', currentObserver);
            });
        } else if (status === 'error') {
            if (isFunction(responseInterceptor)) {
                output = this.interceptor.responseInterceptor(output);
            }
            if (isFunction(currentObserver.error)) {
                const val = currentObserver.error(output, currentObserver.config);
                this.setResponse(outputField, loadingLabel, val, 'error', currentObserver);
                return false;
            }
            setTimeout(() => {
                this.setResponse(outputField, loadingLabel, output.body, 'error', currentObserver);
            });
        }
        return false;
    }

    setResponse(outputField, loadingLabel, data, status, observer) {
        let storeData = this.get();
        const config = storeData[observer.configkey];
        if (isFunction(get(config, ['successCallback'], null)) && status === 'loaded') {
            config.successCallback(data);
        }
        if (isFunction(get(config, ['errorCallback'], null)) && status === 'error') {
            config.errorCallback(data);
        }
        // fetch latest data after callbacks
        storeData = this.get();
        storeData[outputField] = data;
        storeData[loadingLabel] = status;
        delete storeData[observer.configkey];
        this.hardSet(storeData);
    }

    getObservable(label) {
        return find(this.observers, (observer) => observer.label === label);
    }

    registerObservables(observers) {
        return observers.map((observer) => (
            this.stream.pipe(
                distinctUntilChanged((p, c) => p[observer.label] === c[observer.label]),
                filter((p) => p[observer.label] !== null && p[observer.label] !== undefined),
            ).subscribe(() => {
                const data = this.get();
                if (observer.serverDataLabel) {
                    const serverData = get(data, observer.serverDataLabel);
                    // eslint-disable-next-line no-param-reassign
                    delete observer.serverDataLabel;
                    if (!isEmpty(serverData)) {
                        return;
                    }
                }
                const observerCopy = clonedeep(observer);
                let value = observerCopy.request;
                const config = data[observer.label];
                if (isFunction(observer.formatter)) {
                    const configData = data[config];
                    const result = observer.formatter(data, observerCopy.request, configData);
                    if (Array.isArray(result)) {
                        const [req, outputField, loadingLabel] = result;
                        if (outputField) {
                            observerCopy.outputField = outputField;
                        }
                        if (loadingLabel) {
                            observerCopy.statusLabel = loadingLabel;
                        }
                        observerCopy.config = configData || null;
                        value = req;
                    } else {
                        value = result;
                        observerCopy.config = configData || null;
                    }
                }
                if (value) {
                    observerCopy.configkey = config;
                    value.currentObserver = observerCopy;
                    this.requestStream.next(value);
                }
            })
        ));
    }

    load(labelName, config) {
        const generatedId = uniqueId('storeload');
        const setObj = {
            [labelName]: generatedId,
        };
        if (config) {
            setObj[generatedId] = config;
        }
        this.set(setObj);
    }


    resetData() {
        return this.stream.next(merge({}, this.initialValue));
    }

    set(value) {
        const currentValue = this.get();
        const newValue = assign({}, currentValue, value);
        return this.stream.next(newValue);
    }

    hardSet(value) {
        return this.stream.next(value);
    }

    get() {
        return merge({}, this.stream.getValue());
    }

    getStream() {
        return this.stream.pipe(filter((x) => !!x));
    }
}
