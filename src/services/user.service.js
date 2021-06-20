import {fetchWrapper} from '../helpers/fetch-wrapper';

const baseUrl = 'https://jsonplaceholder.typicode.com/posts';

export const userService = {
    getAll,
    delete: _delete
};

function getAll() {
    return fetchWrapper.get(baseUrl);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}

