
// For Form Values Change

export const formatTextToNumber = (arrayKeys: string[], changedValues: any, form:any) => {

    Object.keys(changedValues).forEach((name) => {
        if (arrayKeys.includes(name)) {
            // Replace any non-digit characters with an empty string
            form.setFieldsValue({ [name]: changedValues[name].replace(/[^\d]+/g, '') });
        }
    });
}

export const capitalize = (str:string) => {
    if (typeof str !== 'string' || str.length === 0) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}