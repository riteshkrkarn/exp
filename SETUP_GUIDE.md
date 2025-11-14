# Trainer Search App - Setup Guide

A full-stack web application for managing and searching trainers. Built with **Django REST API** (Backend) and **React + Vite** (Frontend).

## 🏗️ Project Structure

```
Exp/
├── Trainer-search-Backend/       # Django REST API
│   ├── trainers/                 # Main app
│   ├── trainers_app/            # Project settings
│   ├── manage.py
│   └── requirements.txt
└── Trainer-Search-app-frontend/  # React + Vite
    ├── src/
    ├── package.json
    └── vite.config.js
```

---

## 📋 Prerequisites

Before starting, ensure you have:

- **Python 3.9+** installed
- **Node.js 16+** installed
- **MySQL Server** running locally
- **MySQL Workbench** (optional, for GUI management)

---

## 🗄️ Database Setup

### 1. Start MySQL Server

**Windows:**

- Open Services (Win + R → `services.msc`)
- Find "MySQL80" → Right-click → Start

**Mac/Linux:**

```bash
sudo systemctl start mysql
```

### 2. Create Database

Open MySQL Workbench or terminal and run:

```sql
CREATE DATABASE IF NOT EXISTS trainers_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Set Permissions (if needed)

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON trainers_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

---

## 🔧 Backend Setup

### 1. Navigate to Backend Directory

```bash
cd Trainer-search-Backend
```

### 2. Create Virtual Environment

**Windows:**

```bash
python -m venv venv
venv\Scripts\activate
```

**Mac/Linux:**

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

If `requirements.txt` doesn't exist, install manually:

```bash
pip install Django==5.2.8
pip install djangorestframework==3.15.0
pip install djangorestframework-simplejwt==5.3.0
pip install django-cors-headers==4.3.0
pip install mysqlclient==2.2.7
```

### 4. Update Database Credentials

Edit `trainers_app/settings.py` (around line 75-95):

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'trainers_db',
        'USER': 'root',              # ← Your MySQL username
        'PASSWORD': 'your_password', # ← Your MySQL password
        'HOST': 'localhost',
        'PORT': '3306'
    }
}
```

### 5. Run Migrations

```bash
python manage.py migrate
```

Expected output:

```
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  ... (all migrations should show OK)
```

### 6. Create Admin User

```bash
python manage.py shell
```

Then in the Python shell:

```python
from django.contrib.auth.models import User
User.objects.create_user('ritesh', password='123456')
exit()
```

### 7. Run Backend Server

```bash
python manage.py runserver
```

**Expected output:**

```
Starting development server at http://127.0.0.1:8000/
```

✅ Backend is running on: **http://127.0.0.1:8000/**

---

## ⚛️ Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd Trainer-Search-app-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

**Expected output:**

```
VITE v7.1.7  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

✅ Frontend is running on: **http://localhost:5173/**

---

## 🚀 Testing the Application

### 1. Open Frontend

Go to: **http://localhost:5173/**

### 2. Login

- **Username:** `ritesh`
- **Password:** `123456`

### 3. Features to Test

- ✅ **Trainer List** - View all trainers from MySQL database
- ✅ **Add Trainer** - Add new trainers (saved to MySQL)
- ✅ **Search Trainer** - Search by name, location, or technology
- ✅ **Edit Trainer** - Update trainer details
- ✅ **Delete Trainer** - Remove trainers

---

## 📡 API Endpoints

All endpoints require JWT authentication (Bearer token from login)

| Method | Endpoint              | Description           |
| ------ | --------------------- | --------------------- |
| POST   | `/api/token/`         | Login & get JWT token |
| GET    | `/api/trainers/`      | Get all trainers      |
| POST   | `/api/trainers/`      | Add new trainer       |
| GET    | `/api/trainers/<id>/` | Get trainer by ID     |
| PUT    | `/api/trainers/<id>/` | Update trainer        |
| DELETE | `/api/trainers/<id>/` | Delete trainer        |

### Query Parameters for Search

```
GET /api/trainers/?name=john&location=NYC&technology=Python
```

---

## 🛠️ Troubleshooting

### ❌ "ModuleNotFoundError: No module named 'mysqlclient'"

**Solution:**

```bash
pip install mysqlclient
```

### ❌ "Access denied for user 'root'@'localhost'"

**Solution:** Update password in `settings.py` or create new user:

```sql
CREATE USER 'django'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON trainers_db.* TO 'django'@'localhost';
FLUSH PRIVILEGES;
```

Then update `settings.py`:

```python
'USER': 'django',
'PASSWORD': 'password123',
```

### ❌ MySQL Server not running

**Windows:** Start MySQL80 service from Services panel
**Mac/Linux:** `sudo systemctl start mysql`

### ❌ "npm: command not found"

**Solution:** Install Node.js from https://nodejs.org/

### ❌ Frontend can't connect to backend

**Check:**

1. Backend is running on `http://127.0.0.1:8000/`
2. CORS is enabled in Django (check `settings.py` - should have `CORS_ALLOW_ALL_ORIGINS=True`)
3. Both servers are running

---

## 📝 File Structure

### Backend Key Files

```
trainers_app/settings.py     ← Database config, CORS settings
trainers/models.py           ← Trainer model definition
trainers/serializer.py       ← API serializers
trainers/views.py            ← API views
trainers/urls.py             ← API routes
```

### Frontend Key Files

```
src/api.js                   ← API calls to backend
src/components/Login.jsx     ← Login page
src/components/TrainerList.jsx    ← Display trainers
src/components/AddTrainer.jsx     ← Add new trainer
src/components/SearchTrainer.jsx  ← Search functionality
```

---

## 🔐 Security Notes

⚠️ **For Production:**

- Change `DEBUG = False` in `settings.py`
- Use environment variables for sensitive data (passwords, secret keys)
- Set `ALLOWED_HOSTS` in `settings.py`
- Use HTTPS instead of HTTP

---

## 📚 Additional Resources

- Django Docs: https://docs.djangoproject.com/
- DRF Docs: https://www.django-rest-framework.org/
- React Docs: https://react.dev/
- MySQL Docs: https://dev.mysql.com/doc/

---

**Happy coding! 🚀**
