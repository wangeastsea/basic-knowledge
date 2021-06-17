function shallowClone (source) {
    if (typeof source === 'object' && source !== null) {
        const target = Array.isArray(source) ? [] : {}
        for(let key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key]
            }
        }
        return target
    } else {
        return source
    }

}