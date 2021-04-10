const { connection } = require('./db');
const { uuid } = require('uuidv4');
const { getUsersApiTest } = require('./dao');

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
    let users = await getUsersApiTest();
    return res.status(200).json({
        ok: true,
        users
    });
}

exports.getProviders = async(req, res) => {
    connection.query('select * from owner_provider', [], function(error, results, fields) {
        if (error) throw error;
        return res.status(200).json({
            ok: true,
            owner_provider: results
        });
    });
}

exports.postProviders = async(req, res) => {
    const { rule_name, rule_description, notification_condition, login_id, company } = req.body;
    if (rule_name && rule_description && notification_condition && login_id && company) {
        connection.query('insert into customer_condition (customer_condition_id,rule_name,rule_description,notification_condition,login_id,company) values (?,?,?,?,?,?);', [5, rule_name, rule_description, notification_condition, login_id, company], function(error, results, fields) {
            if (error) {
                return res.status(400).json({
                    ok: true,
                    error
                });
            }
            return res.status(201).json({
                ok: true,
                owner_provider: results
            });
        })
    }
}

exports.putProviders = async(req, res) => {


}

exports.deleteProviders = async(req, res) => {
    const { customer_condition_id } = req.params;
    if (customer_condition_id) {
        connection.query('delete from customer_condition where customer_condition_id = ?;', [customer_condition_id], function(error, results, fields) {
            if (error) {
                return res.status(400).json({
                    ok: true,
                    error
                });
            }
            return res.status(200).json({
                ok: true,
                owner_provider: results
            });
        });
    } else {
        return res.status(400).json({
            ok: true,
            message: 'Error in request'
        });
    }
}

exports.getProvidersId = async(req, res) => {
    const { login_id, provider_name } = req.params;
    if (login_id && provider_name) {
        connection.query('select * from owner_provider where login_id = ? and provider_name= ?;', [login_id, provider_name], function(error, results, fields) {
            if (error) {
                return res.status(400).json({
                    ok: true,
                    error
                });
            }
            return res.status(200).json({
                ok: true,
                owner_provider: results
            });
        })
    }
}