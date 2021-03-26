const axios = require('axios');
let users = [{
        id: 1,
        name: 'JUAN',
        lastName: 'FALCON'
    },
    {
        id: 2,
        name: 'PAOLO',
        lastName: 'CARDENAS'
    },
]
exports.getUsers = async(req, res) => {
    const response = {
        ok: true,
        users
    }
    return res.status(200).json(response);
}

exports.postUsers = async(req, res) => {
    const { name, lastName } = req.body;
    const id = users.length + 1
    if (name && lastName) {
        users.push({ name, lastName, id });
        return res.status(201).json({
            ok: true,
            user: {
                name,
                lastName,
                id
            }
        });
    }
    return res.status(400).json({
        ok: false,
        message: 'Error in request'
    });
}

exports.deleteUsers = async(req, res) => {
    const { id } = req.params;
    if (id) {
        console.log(id, typeof id)
        users = users.filter((e) => e.id !== Number(id));
        return res.status(202).json({
            ok: true,
            message: 'delete user success'
        })
    }

    return res.status(400).json({
        ok: false,
        message: 'Error in request'
    })

}

exports.apiTests = async(req, res) => {
    let user = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    user = user.data
    return res.status(200).json({
        ok: true,
        user
    })

}