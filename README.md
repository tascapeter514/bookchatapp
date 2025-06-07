# Welcome to Bookchat
![bookchat-search](https://github.com/user-attachments/assets/dfad1735-ff58-4827-9b06-b68a65835020)
This repository contains the source code for Bookchat, a bookclub app for lovers of the written word. Bookchat was designed to facilitate community learning around a shared love of books for users from across the globe. The app was built with Typescript, React, and Django.

[Introduction](#introduction) • [Installation](#installation) • [Documentation](#documentation) • [Issue?](#issue)

## Introduction

Bookchat is a social media app centered around bringing folks together from all different backgrounds around a shared love reading. Borne out of my experience during the pandemic teaching English literature to UCLA undergraduates and maintaining a philosophy bookclub with friends, Bookchat is a full stack app where users can browse books from a range of genres, create bookshelves and bookclubs, add books to either and create polls with other bookclub members to decide the next read. Users can invite other members to join a bookclub. Future functionality will include a bookclub recommendation algorithm, a scheduler, and integration with Zoom and Google Meet. Head on over to the <a href="#documentation">Documentation</a> for more information on how to use Bookchat. Happy reading!

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

## Issue
If you like what you see, please give us a star.

This app is actively maintained, and we welcome all feedback.

Please raise an issue [here](https://github.com/tascapeter514/bookchatapp/issues/new).
