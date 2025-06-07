# Welcome to Bookchat
![bookchat-search](./assets/bookchat-search.png)
This repository contains the source code for Bookchat, a bookclub app for lovers of the written word. Bookchat was designed to facilitate community learning around a shared love of books for users from across the globe. The app was built with Typescript, React, and Django.

[Introduction](#introduction) • [Installation](#installation) • [Documentation](#documentation) • [Issue?](#issue)

## Introduction

Bookchat is a full-stack social platform designed to bring people together through a shared love of reading. Inspired by my experience teaching English literature at UCLA during the pandemic and running a philosophy book club with friends, Bookchat makes it easy to build community around books — no matter where you're from.

With Bookchat, users can:

 + Discover books across a variety of genres
 + Create and join bookshelves and bookclubs
 + Add books to personal or shared spaces
 + Collaborate with club members using polls to choose the next read
 + Invite others to participate in ongoing discussions

Future features will include:
  + A smart bookclub recommendation algorithm
  + Event scheduling
  + Integration with Zoom and Google Meet

📚 For more details on how to get started, head to the [Documentation](#documentation). Happy reading!

## Installation


### 🔧 Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL (optional for production)
- Django Rest Framework
- Redis (for Django Channels WebSocket support)
- Redux Toolkit
- [pip](https://pip.pypa.io/en/stable/installation/) and [virtualenv](https://virtualenv.pypa.io/en/latest/)

---

## 🧠 Backend (Django)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo/backend
```
### 2. Create and Activate a Virtual Environment
```
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```
### 3. Upgrade pip (optional but recommended)
```
python -m pip install --upgrade pip
```
### 4.  Install Dependencies
```
pip install -r requirements.txt
```
### 5.Apply Migrations
```
python manage.py migrate
```
### 6. Load Demo Data
```
python manage.py loaddata finished_bookchat.json
```
### 7. Run the Django development server
```
python manage.py runserver
```

## 💻 Frontend Setup (/frontend)

### 1. Navigate to the frontend directory
```
cd frontend
```
### 2. Install Node dependencies
```
npm install
```
### 3. Start the Vite development server
```
npm run dev
```

## Documentation

### 1.Begin by searching for your favorite books
![book-search](./assets/book-search.png)

Once you have entered a search term, click on the link. You will be brought to a book page:

![sample-book](./assets/sample-book.png)

You can also view the author


## Issue
If you like what you see, please give us a star.

This app is actively maintained, and we welcome all feedback.

Please raise an issue [here](https://github.com/tascapeter514/bookchatapp/issues/new).
