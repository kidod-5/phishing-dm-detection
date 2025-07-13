# 🛡️ Phishing Message Detection Web Application

**Final Project – COMP334: Computer Security**  
**Authors**: Kido Douglas and Genna Olavarri  
**Live Demo**: [https://isthisphishing.vercel.app/search-landing](https://isthisphishing.vercel.app/search-landing)

---

## 📌 Overview

We built a web application designed to help users identify whether direct messages or comments on social media—specifically Instagram—are potentially malicious, spammy, or safe. 

Social media is widely used, especially among younger users who may not be aware of privacy and security risks. Our goal was to create a user-friendly tool to help users verify the legitimacy of messages and protect themselves from phishing attacks.

Although our project focused on Instagram for specificity and due to time constraints, it can be adapted to detect phishing attempts on other platforms.

- **Frontend**: React (hosted on Vercel)  
- **Backend**: Python FastAPI (hosted on Google Cloud Run)  
- **Dataset**: Manually curated + synthetic dataset generated using Gretel AI

---

## 📊 The Dataset

We initially struggled to find a suitable dataset for phishing and spam messages on Instagram. As a solution, we created a synthetic dataset using:

- **Real examples** from our own and friends' social media accounts
- **Public examples** from Reddit and other forums discussing Instagram scams
- **Synthetic expansion** using **Gretel AI**, after testing and rejecting ChatGPT and MostlyAI due to poor variety and realism

This process produced a dataset of **1,398 messages** evenly distributed among three categories:

- **Ham**: Benign, normal user messages
- **Spam**: Harassing or annoying content with commercial intent or suspicious links
- **Phishing**: Explicitly malicious attempts to extract personal information

---

## 🧠 The Model

We trained a **Random Forest Classifier** (from `sklearn`) to categorize messages based on the definitions above. After testing other models such as Naive Bayes (which proved ineffective due to its independence assumptions), we found Random Forest to be the most reliable for our diverse dataset.

**Training Process**:
- Data preprocessing with Pandas
- Text vectorization
- 80/20 train-test split
- Evaluation metrics: Precision, Recall, and F1 Score

### 📈 Performance Metrics

| Category | Precision | Recall | F1 Score |
|----------|-----------|--------|----------|
| Ham      | 91.6%     | 97%    | 94.2%    |
| Spam     | 93.2%     | 92.4%  | 92.8%    |
| Phishing | 99.9%     | 92%    | 95.7%    |

These scores demonstrate a strong ability to classify phishing messages accurately, though the model occasionally confuses borderline spam/phishing cases.

### 🔬 Metric Definitions

- **Precision**: TP / (TP + FP)
- **Recall**: TP / (TP + FN)
- **F1 Score**: Harmonic mean of precision and recall

Our model compares favorably to several state-of-the-art models in similar spam/phishing classification tasks.

---

## 💻 The UI and Architecture

- **Frontend**: React application
- **Backend**: FastAPI served via Google Cloud Run using Docker
- **Hosting**: 
  - Frontend with [Vercel](https://vercel.com/)
  - Backend with [Google Cloud Run](https://cloud.google.com/run)

We used a REST API structure where the frontend sends user messages to the backend and receives category predictions in return.

---

## 🧠 Epistemic Risk and Message Classification

To account for **epistemic risk** (the risk of making incorrect conclusions), we implemented a cautious approach:

### Classification Logic

- If `phishing > spam` and `phishing > ham` → **"Suspicious"**
- If `spam > phishing` and `spam > ham` → **"Suspicious"**
- If `ham > (phishing ±15%)` and `ham > (spam ±15%)` → **"Genuine"**
- Otherwise → **"Ambiguous"**, prompt user with follow-up questions:

**Follow-up questions**:
- Do you know the sender personally?
- Does the message request personal or financial info?
- Does the sender have identifying info (e.g., school, location)?
- How many mutual followers do you share?

This ambiguity filter reduces false assurances and encourages users to think critically.

---

## ✅ Conclusion and Future Work

We succeeded in developing a functional, interactive web tool that classifies social media messages as genuine, spam, or phishing. Our model’s performance rivals more complex systems, and our web interface enables easy public use.

**Future improvements**:
- Expand dataset to cover additional platforms beyond Instagram
- Further refine definitions and samples for spam vs. phishing
- Implement more advanced ML models (e.g., neural networks)
- Develop a browser extension for real-time message detection

---

## 🔗 Sources

- [SMS Spam Detection with TensorFlow](https://www.geeksforgeeks.org/sms-spam-detection-using-tensorflow-in-python/)
- [PMC Article on Phishing Detection](https://pmc.ncbi.nlm.nih.gov/articles/PMC11013960/)
- [ScienceDirect Article on 1D-CNNPD](https://www.sciencedirect.com/org/science/article/pii/S1546221)
