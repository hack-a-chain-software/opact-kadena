import sqlite3
from flask import Flask, jsonify, request
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def fetch_data_with_count(query, count_query):
    conn = sqlite3.connect('./log/commands.sqlite')
    cursor = conn.cursor()

    cursor.execute(count_query)
    total_records = cursor.fetchone()[0]

    cursor.execute(query)
    data = [json.loads(row[0]) for row in cursor.fetchall()]

    conn.close()
    return data, total_records

def get_nullifiers_params(data):
    nullifiers = []
    for entry in data:
        for event in entry.get('events', []):
            if event.get('name') == "new-nullifier":
                params_list = event.get('params', [])
                for inner_list in params_list:
                    if isinstance(inner_list, list):
                        for params in inner_list:
                            if 'int' in params:
                                nullifiers.append(params['int'])
    return nullifiers

@app.route('/getNullifiers')
def get_nullifiers():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 500))
    salt = int(request.args.get('salt', 268))
    offset = (page - 1) * per_page

    data_query = f"SELECT result FROM pactCommands WHERE result LIKE '%transact%' AND txid >= {salt} LIMIT {per_page} OFFSET {offset}"
    count_query = f"SELECT COUNT(*) FROM pactCommands WHERE result LIKE '%transact%' AND txid >= {salt}"

    data, total_records = fetch_data_with_count(data_query, count_query)

    nullifiers_params = get_nullifiers_params(data)

    total_pages = -(-total_records // per_page)
    is_last_page = page >= total_pages

    return jsonify({
        "data": nullifiers_params,
        "is_last_page": is_last_page
    })


def get_commitments_params(data):
    commitments = []

    for entry in data:
        for event in entry.get('events', []):
            if event.get('name') == "new-commitment":
                params = event.get('params', [])
                if len(params) >= 2:
                    value = params[0].get("int")
                    order = params[1].get("int")
                    if value and order:
                        commitment = {
                            "value": str(value),
                            "order": str(order)
                        }
                        commitments.append(commitment)

    return commitments

@app.route('/getCommitments')
def get_commitments():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 500))
    salt = int(request.args.get('salt', 268))
    offset = (page - 1) * per_page

    data_query = f"SELECT result FROM pactCommands WHERE result LIKE '%transact%' AND txid >= {salt} LIMIT {per_page} OFFSET {offset}"
    count_query = f"SELECT COUNT(*) FROM pactCommands WHERE result LIKE '%transact%' AND txid >= {salt}"

    data, total_records = fetch_data_with_count(data_query, count_query)

    commitments_params = get_commitments_params(data)

    total_pages = -(-total_records // per_page)
    is_last_page = page >= total_pages

    return jsonify({
        "data": commitments_params,
        "is_last_page": is_last_page
    })

def get_encrypted_params(data):
    encrypted_values = []
    for entry in data:
        for event in entry.get('events', []):
            if event.get('name') == "new-encrypted-output":
                params = event.get('params', [])
                if params:
                    encrypted_values.append(params[0])
    return encrypted_values

@app.route('/getEncrypted')
def get_encrypted():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 500))
    salt = int(request.args.get('salt', 268))
    offset = (page - 1) * per_page

    data_query = f"SELECT result FROM pactCommands WHERE result LIKE '%transact%' AND txid >= {salt} LIMIT {per_page} OFFSET {offset}"
    count_query = f"SELECT COUNT(*) FROM pactCommands WHERE result LIKE '%transact%' AND txid >= {salt}"

    data, total_records = fetch_data_with_count(data_query, count_query)

    encrypted_params = get_encrypted_params(data)

    last_tx_id = data[-1]["txId"] if data else None

    total_pages = -(-total_records // per_page)
    is_last_page = page >= total_pages

    return jsonify({
        "data": encrypted_params,
        "is_last_page": is_last_page,
        "last_tx_id": last_tx_id
    })

def get_receipts_params(data):
    receipts = []
    for entry in data:
        for event in entry.get('events', []):
            if event.get('name') == "new-transaction":
                params = event.get('params', [])
                if params:
                    receipts.append(params[0])
    return receipts

@app.route('/getReceipts')
def get_receipts():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 500))
    salt = int(request.args.get('salt', 268))
    offset = (page - 1) * per_page

    data_query = f"SELECT result FROM pactCommands WHERE result LIKE '%transact%' AND txid >= {salt} LIMIT {per_page} OFFSET {offset}"
    count_query = f"SELECT COUNT(*) FROM pactCommands WHERE result LIKE '%transact%' AND txid >= {salt}"

    data, total_records = fetch_data_with_count(data_query, count_query)

    receipts_params = get_receipts_params(data)

    last_tx_id = data[-1]["txId"] if data else None

    total_pages = -(-total_records // per_page)
    is_last_page = page >= total_pages

    return jsonify({
        "data": receipts_params,
        "is_last_page": is_last_page,
        "last_tx_id": last_tx_id
    })

@app.route('/getdata')
def get_data():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 500))
    salt = int(request.args.get('salt', 268))

    offset = (page - 1) * per_page

    conn = sqlite3.connect('./log/commands.sqlite')
    cursor = conn.cursor()

    cursor.execute(f"SELECT result FROM pactCommands WHERE result LIKE '%transact%' AND txid >= {salt} LIMIT {per_page} OFFSET {offset}")

    data = [json.loads(row[0]) for row in cursor.fetchall()]

    conn.close()

    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
