from flask import Flask, render_template, request, redirect, session, url_for, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from chat import get_response
import hashlib
import folium
from folium.plugins import FastMarkerCluster
from folium import plugins
from collections import Counter

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# cursor = collection.find()

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017')
db = client['your_database']
colleges_collection = db['colleges']
collection = db['documents']
db1 = client['review_database']  # Create or use an existing database
reviews_collection = db1['reviews'] 


db = client["College"]
collection = db["test 3"]

cursor = collection.find()

@app.route('/')
def home():
    colleges = [college['name'] for college in colleges_collection.find({}, {'name': 1})]

    return render_template('home.html', colleges=colleges)
    #return render_template('home.html')
    #return render_template('home.html')


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

        # Check if username already exists
        if db.users.find_one({'username': username}):
            return 'Username already exists!'

        # Hash the password before storing
        hashed_password = hashlib.sha256(password.encode()).hexdigest()

        # Insert user data into the database
        db.users.insert_one({'username': username, 'email': email, 'password': hashed_password})
        return redirect('/login')
    
    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        hashed_password = hashlib.sha256(password.encode()).hexdigest()
        user = db.users.find_one({'username': username, 'password':hashed_password})

        if user:
            session['user_id'] = str(user['_id'])
            session['username'] = user['username']
            return redirect('/')
        else:
            return 'Invalid username or password!'
            return redirect(url_for('login'))
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

@app.route('/review', methods=['GET', 'POST'])
def review():
    if 'username' not in session:
        return redirect(url_for('login'))

    if request.method == 'POST':
        review_text = request.form['review']
        rating = int(request.form['rating'])
        clg = request.form['clg']
        username = session['username']
        # Store the review and rating in MongoDB
        reviews_collection.insert_one({'username': username, 'review': review_text, 'clg': clg, 'rating': rating})
        return redirect(url_for('review'))

     # Fetch all reviews from MongoDB
    all_reviews = list(reviews_collection.find())
    return render_template('review.html', reviews=all_reviews ,logged_in=True)


@app.route('/search', methods=['GET'])
def search():
    college_name = request.args.get('college')
    # Perform search based on the selected college name
    # For demonstration, let's just return the selected college name
    return render_template('college_info.html')

@app.route('/college_info', methods=['POST'])
def college_info():
    college_name = request.form['college']
    college_data = colleges_collection.find_one({'name': college_name})
    if college_data:
        return jsonify({
            'name': college_data['name'],
            'location': college_data['location'],
            'founded': college_data['founded']
            # Add more fields as needed
        })
    else:
        return jsonify({'error': 'College not found'})

@app.route('/predict', methods=['POST'])
def predict():
    text = request.get_json().get("message")
    response = get_response(text)
    message = {"answer": response}
    return jsonify(message)

@app.route('/featured')
def featured():
    return render_template('featured.html')

@app.route('/explore')
def explore_exams():
    return render_template('explore_exams.html')

@app.route('/iitm')
def iitm():
    return render_template('iitm.html')

@app.route('/iitd')
def iitd():
    return render_template('iitd.html')

@app.route('/iitb')
def iitb():
    return render_template('iitb.html')

@app.route('/iitk')
def iitk():
    return render_template('iitk.html')

@app.route('/iitr')
def iitr():
    return render_template('iitr.html')

@app.route('/reva')
def reva():
    return render_template('reva.html')

@app.route('/iima')
def iima():
    return render_template('iima.html')

@app.route('/iimb')
def iimb():
    return render_template('iimb.html')

@app.route('/iimk')
def iimk():
    return render_template('iimk.html')

@app.route('/iimc')
def iimc():
    return render_template('iimc.html')

@app.route('/aims')
def aims():
    return render_template('aims.html')

@app.route('/nlu')
def nlu():
    return render_template('nlu.html')

@app.route('/nlsiu')
def nlsiu():
    return render_template('nlsiu.html')

@app.route('/nu')
def nu():
    return render_template('nu.html')

@app.route('/search1')
def search1():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
