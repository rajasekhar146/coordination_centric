import { useState, useEffect, useCallback } from 'react';
import { distinctUntilChanged } from 'rxjs/operators';
import get from 'lodash.get';
import isEqual from 'lodash.isequal';
/**
 *  Hook to attach observers to components
 *
 * */


const useStore = (store, filterBy) => {
    const [state, setState] = useState(store.get());
    const setStore = useCallback((value) => store.set(value), [store]);
    const filterFunc = useCallback(() => {
        const stream = store.getStream();
        let observable = null;
        if (filterBy) {
            observable = stream.pipe(distinctUntilChanged((p, c) => {
                const filterByArray = Array.isArray(filterBy) ? filterBy : [filterBy];
                return !filterByArray.find((filter) => !isEqual(get(p, filter, null), get(c, filter, null)));
            }));
        }
        return observable || stream;
    },
    [store, filterBy]);

    useEffect(() => {
        const observable = filterFunc().subscribe((value) => setState(value));
        return () => observable.unsubscribe();
    },
    [filterFunc, store]);

    return [state, setStore];
};

export default useStore;
