from flask import Flask, request, jsonify
import util

app = Flask(__name__)

import os
from flask import send_from_directory

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')
@app.route('/get_months_names', methods=['GET'])
def get_months_names():
    response = jsonify({
        'mois': util.get_months_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response
@app.route('/hello')
def hello():
 return 'Hello, World!'

@app.route('/predict_home_price', methods=['GET', 'POST'])
def predict_home_price():
    mois = float(request.form['mois'])
    moyenne_saisonniere = request.form['moyenne_saisonniere']
    heures_de_pointe = int(request.form['heures_de_pointe'])
    heures_pleines = int(request.form['heures_pleines'])
    heures_creuses = int(request.form['heures_creuses'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(mois,moyenne_saisonniere,heures_de_pointe,heures_pleines,heures_creuses)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run(debug=True)
