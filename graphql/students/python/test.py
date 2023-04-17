import sys
import pickle5 as pickle

def test(text):
    text = [text]
    loader = pickle.load(open('graphql/students/python/model.pkl', 'rb'))
    predict = loader.predict(text)
    print(predict)

test(sys.argv[1])