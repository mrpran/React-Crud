import {fetchWrapper} from '../helpers/fetch-wrapper';

const baseUrl = 'http://localhost:3004/posts';

export const userService = {
    getAll,
    create,
    delete: _delete
};

function getAll() {
    return fetchWrapper.get(baseUrl);
}
function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}

