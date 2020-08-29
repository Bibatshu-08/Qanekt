import datetime

from .. import db
from ..models import User
from . import auth

import math, json, sys
import pandas as pd
import scipy.sparse as sp
from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity



def get_data():

    users = User.query.all()
    df = [{
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'password': user.password,
        'age': user.age,
        'gender': user.gender,
        'about': str(list(map(str,user.about.split()))),
        'interests': str(list(map(str,user.list_interests()))),
        'location': user.location,
    }for user in users]

    df = pd.DataFrame.from_dict(pd.json_normalize(df), orient='columns')
    return df
    

def distance(user1, user2):
    
    x = (user2[1] - user1[1]) * math.cos((user2[0] + user1[0])/2)       # here user1[0] is latitude and user1[1] is longitude
    y = user2[0] - user1[0]
    return ((x**2+y**2)**0.5)*6371


def combine_data(data):         # remove other details and combine information about the individuals
    user_recommend = data.drop(columns=['id','username','email','password','age','gender','location'])
    user_recommend['combine'] = user_recommend[user_recommend.columns[0:2]].apply(lambda x: ','.join(x.dropna().astype(str)),axis=1)
    user_recommend = user_recommend.drop(columns=[ 'about','interests'])
    return user_recommend



def transform_data(data_combine, data_plot):

    count = CountVectorizer(stop_words='english')
    count_matrix = count.fit_transform(data_combine['combine'])
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(data_plot['interests'])

    combine_sparse = sp.hstack([count_matrix, tfidf_matrix], format='csr')
    cosine_sim = cosine_similarity(combine_sparse, combine_sparse)
    return cosine_sim



def recommend_hobbists(username, data, combine, transform, sliceIndex):

    def longi(a):   return data['longitude'].iloc[a]
    def lati(a):    return data['latitude'].iloc[a]
    def seperation(a,b):    return distance((longi(a),lati(a)), (longi(b),lati(b)))**(1/2)

    indices = pd.Series(data.index, index = data['username'])
    index = indices[username]

    sim_scores = list(enumerate(transform[index]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1] , reverse=True)
    # sim_scores = sorted(sim_scores, key=lambda x: x[1] * max( (6371 - seperation(index,x[0]) ) ,0 ) , reverse=True)
    sim_scores = sim_scores[sliceIndex*5:sliceIndex*5+5]

    if len(sim_scores)==0:
        return "No other users found"
    
    else:
        user_indices = [i[0] for i in sim_scores]
        user_name = data['username'].iloc[user_indices]
        user_mail = data['email'].iloc[user_indices]
        user_age = data['age'].iloc[user_indices]
        user_interests = data['interests'].iloc[user_indices]
        user_about = data['about'].iloc[user_indices]

        recommendation_data = pd.DataFrame(columns=['Username','Email','Age','Interests','About'])
        recommendation_data['Username'] = user_name
        recommendation_data['Email'] = user_mail
        recommendation_data['Age'] = user_age
        recommendation_data['Interests'] = user_interests
        recommendation_data['About'] = user_about

        return recommendation_data


def results(user_id, sliceIndex):
    find_user = get_data()
    combine_result = combine_data(find_user)
    transform_result = transform_data(combine_result, find_user, sliceIndex)
    
    if user_id not in find_user['username'].unique():
        return 'User not in Database'
    
    else:
        recommendations = recommend_hobbists(user_id, find_user, combine_result, transform_result)
        return recommendations.to_dict('records')

