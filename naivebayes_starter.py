
import sklearn as sk
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

data = pd.read_csv('spam_dataset.csv')

# Split the data into message and label
messages = data['message_content']
is_spam = data['is_spam']

# Split the data into training and testing
messages_train, messages_test, is_spam_train, is_spam_test = train_test_split(messages, is_spam, test_size=0.2)

# Convert the messages into a matrix of token counts
vectorizer = CountVectorizer()
vectorizer.fit(messages_train)
X_train = vectorizer.transform(messages_train)
X_test = vectorizer.transform(messages_test)

# Train the Naive Bayes classifier
classifier = MultinomialNB()
classifier.fit(X_train, is_spam_train)

# Test the classifier
predictions = classifier.predict(X_test)

# Print the accuracy
accuracy = sk.metrics.accuracy_score(is_spam_test, predictions)

print("Accuracy: ", accuracy, "where perfect accuracy is 1.0")

# test the classifier with a new message
new_message = ["Click on this link to win a million dollars!"]
new_message_vector = vectorizer.transform(new_message)
prediction = classifier.predict(new_message_vector)
print("Prediction: ", prediction)