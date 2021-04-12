from flask import Flask, request, jsonify, Response
from flask_pymongo import PyMongo
from flask_cors import CORS

from werkzeug.security import generate_password_hash, check_password_hash
from bson import json_util
from bson.objectid import ObjectId

from netmiko import ConnectHandler
from getpass import getpass
# import paramiko
from datetime import datetime

app = Flask(__name__)
CORS(app)

app.config['MONGO_URI'] = 'mongodb+srv://David:1Diosasegu@cooperativa.ne6tg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongo = PyMongo(app)


## init config cisco ##

# devices = [{
#     "device_type": "cisco_xr",
#     "ip": "sbx-iosxr-mgmt.cisco.com",
#     "username": "***",
#     "password": "***",
#     "port": "8181",
# }, {
#     "device_type": "cisco_xe",
#     "ip": "ios-xe-mgmt-latest.cisco.com",
#     "username": "***",
#     "password": "***",
#     "port": "8181",
# }]


cisco_881 = {
    'device_type': 'cisco_ios',
    'host':   '200.4.144.3',
    'username': 'cisco',
    'password': 'cisco',
    'port': 50051,          # optional, defaults to 22
    'secret': 'secret',     # optional, defaults to ''
}

# net_connect = ConnectHandler(**cisco_881)
# net_connect.enable()

for device in (cisco_881):
    net_connect = ConnectHandler(**cisco_881)

    # output = net_connect.send_command("show ip interface brief")
    output = net_connect.send_command('show config')
    net_connect.disconnect()
    print("-"*100)
    print(output)
    print("-"*100)


# sshConfirm = net_connect.find_prompt()
# print('successfully logged in ' + sshConfirm)

# end config cisco

# 1 -. Time to ejecute Excersise  "show arp"

# all_devices = [cisco_881]

# start_time = datetime.now()
# for a_device in all_devices:
#     net_connect = ConnectHandler(**a_device)
#     output = net_connect.send_command("show arp")
#     print(f"\n\n--------- Device {a_device['device_type']} ---------")
#     print(output)
#     print("--------- End ---------")

#     end_time = datetime.now()
# total_time = end_time - start_time

###  2-. show ip brief ####

# output = net_connect.send_command('show ip int brief')
# print(output)


# output = net_connect.send_command('show interfaces GigabitEthernet1')
# print(output)


###  3-. loging show  ####

# output = net_connect.send_command('show run | inc logging')
# print(output)
# config_commands = ['logging buffered 19999']

# output = net_connect.send_command("show ip cache flow")
# print(output)


@ app.route('/users', methods=['POST'])
def create_user():
    username = request.json['username']
    password = request.json['password']
    email = request.json['email']

    if username and email and password:
        hashed_password = generate_password_hash(password)
        id = mongo.db.users.insert_one(
            {'username': username, 'email': email, 'password': hashed_password}
        )
        response = {
            'id': str(id),
            'username': username,
            'password': hashed_password,
            'email': email
        }

        return response
    else:
        return not_found()

    return {'message': 'received'}


@ app.route('/users', methods=['GET'])
def get_users():
    users = mongo.db.users.find()
    response = json_util.dumps(users)
    return Response(response, mimetype='application/json')


@ app.route('/users/<id>', methods=['GET'])
def get_user(id):
    user = mongo.db.users.find_one({'_id': ObjectId(id)})
    response = json_util.dumps(user)
    return Response(response, mimetype="application/json")


@ app.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
    mongo.db.users.delete_one({'_id': ObjectId(id)})
    response = jsonify({'message': 'User' + id + 'was deleted successfully'})
    return response


@ app.route('/users/<id>', methods=['PUT'])
def update_user(id):
    username = request.json['username']
    email = request.json['email']
    password = request.json['password']

    if username and email and password:
        hashed_password = generate_password_hash(password)
        mongo.db.users.update_one({'_id': ObjectId(id)}, {'$set': {
            'username': username,
            'password': hashed_password,
            'email': email
        }})
        response = jsonify(
            {'message': 'User' + id + 'was updated successfully'})
        return response


@ app.errorhandler(404)
def not_found(error=None):
    response = jsonify({
        'message': 'Resource Not Found:' + request.url,
        'status': 404
    })
    response.status_code = 404

    return response


if __name__ == "__main__":
    app.run(debug=True)
