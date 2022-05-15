const signInForm = document.querySelector('#signInForm');
const loadButton = document.querySelector('#loadButton');

const saveDataToStorage = (data) => {
    window.localStorage.setItem("form-data", JSON.stringify(data))
}
const loadDataFromStorage = () => {
    return JSON.parse(window.localStorage.getItem("form-data") ?? "{}")
}

const collectData = (container) => {
    const result = {};

    /* Add all except radio buttons */
    let elems = container.querySelectorAll('[data-field]:not([type="radio"])');
    Object.values(elems).forEach((item) => {
        const field = item.attributes['data-field'].textContent;
        result[field] = item.value;
    }, {});

    /* Add radio buttons */
    elems = container.querySelectorAll('[data-field][type="radio"]:checked');
    Object.values(elems).forEach((item) => {
        const field = item.attributes['data-field'].textContent;
        result[field] = item.value;
    }, {});

    return result;
}

const applyData = (container, data) => {
    /* Apply to all except radio buttons */
    let elems = container.querySelectorAll('[data-field]:not([type="radio"])');
    Object.values(elems).forEach((item) => {
        const field = item.attributes['data-field'].textContent;
        item.value = data[field];
    }, {});

    /* Apply radio buttons */
    elems = container.querySelectorAll('[data-field][type="radio"]');
    Object.values(elems).forEach((item) => {
        const field = item.attributes['data-field'].textContent;
        const value = item.value;
        item.checked = (data[field] === value);
    }, {});
}

const signInFormSubmitHandler = (e) => {
    e.preventDefault();

    const data = collectData(signInForm);
    saveDataToStorage(data);
}

const loadFormData = () => {
    const data = loadDataFromStorage();
    applyData(signInForm, data)
}

signInForm.addEventListener('submit', signInFormSubmitHandler);
loadButton.addEventListener('click', loadFormData);