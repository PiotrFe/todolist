export const updateSorts = (sorts, field, newVal) => {
    const returnObj = {};

    for (let key in sorts) {
        if (key === field) returnObj[key] = newVal
        else returnObj[key] = 0
    }

    return returnObj;
}

