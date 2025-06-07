# Welcome to Bookchat
![bookchat-search](https://github.com/user-attachments/assets/dfad1735-ff58-4827-9b06-b68a65835020)
This repository contains the source code for Bookchat, a bookclub app for lovers of the written word. Bookchat was designed to facilitate community learning around a shared love of books for users from across the globe. The app was built with Typescript, React, and Django.

<p align="center">
  <a href="#introduction">Introduction</a> •
  <a href="#installation">Installation</a> •
  <a href="#documentation">Documentation</a> •
  <a href="#issue">Issue?</a>
</p>


## Introduction

## Installation


### 🔧 Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL (optional for production)
- Django Rest Framework
- Redis (for Django Channels WebSocket support)
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
