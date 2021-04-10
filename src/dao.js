const axios = require('axios');

exports.getUsersApiTest = async() => {

    let idUsers = [1, 2, 3, 4];
    let response = [];
    for (const iterator of idUsers) {
        const user = await axios.get(`https://jsonplaceholder.typicode.com/todos/${iterator}`);
        response.push(user.data);
    }
    return response
}