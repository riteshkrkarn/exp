# Quick Reference Guide

## 🎯 One-Minute Setup Checklist

- [ ] MySQL Server installed and running
- [ ] Created `trainers_db` database in MySQL
- [ ] Python 3.9+ installed
- [ ] Node.js 16+ installed
- [ ] Cloned the Exp repository

## ⚡ Quick Start Commands

### Backend (Terminal 1)

```bash
cd Trainer-search-Backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# Update settings.py with your MySQL password first!

python manage.py migrate
python manage.py shell
# In shell: User.objects.create_user('ritesh', password='123456')
# exit()

python manage.py runserver
```

### Frontend (Terminal 2)

```bash
cd Trainer-Search-app-frontend
npm install
npm run dev
```

### Access Application

- **Frontend:** http://localhost:5173/
- **Backend API:** http://127.0.0.1:8000/api/
- **Login:** ritesh / 123456

---

## 🔑 Important Files to Update

### File: `Trainer-search-Backend/trainers_app/settings.py`

**Around Line 80-95, Update:**

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'trainers_db',
        'USER': 'root',                    # ← Your MySQL username
        'PASSWORD': 'YOUR_MYSQL_PASSWORD', # ← CHANGE THIS!
        'HOST': 'localhost',
        'PORT': '3306'
    }
}
```

---

## 📊 MySQL Database Tables (Auto-created)

After `python manage.py migrate`, these tables are created:

- `auth_user` - User accounts
- `trainers_trainers` - Trainer data
- `auth_group` - User groups
- `django_migrations` - Migration history
- And more...

---

## 🧑‍💻 Default Credentials

**After setup, use these to login:**

- **Username:** `ritesh`
- **Password:** `123456`

_(Created during: `python manage.py shell` step)_

---

## 🐛 Common Issues & Fixes

| Issue                               | Fix                                         |
| ----------------------------------- | ------------------------------------------- |
| `ModuleNotFoundError: mysqlclient`  | `pip install mysqlclient`                   |
| `Access denied for user 'root'`     | Update password in settings.py              |
| `MySQL server has gone away`        | Ensure MySQL service is running             |
| `npm: command not found`            | Install Node.js                             |
| `Frontend can't connect to backend` | Check CORS is enabled, both servers running |

---

## 📱 API Examples

### Login

```bash
curl -X POST http://127.0.0.1:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"ritesh","password":"123456"}'
```

### Get All Trainers

```bash
curl -X GET http://127.0.0.1:8000/api/trainers/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Add Trainer

```bash
curl -X POST http://127.0.0.1:8000/api/trainers/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "location": "New York",
    "email": "john@example.com",
    "phone": "1234567890",
    "technology1": "Python",
    "technology2": "Django"
  }'
```

---

## 📚 Tech Stack

- **Backend:** Django 5.2.8, Django REST Framework 3.15.0
- **Frontend:** React 19.1.1, Vite 7.1.7
- **Database:** MySQL 8.0
- **Authentication:** JWT (djangorestframework-simplejwt)
- **API Communication:** Axios

---

**For detailed setup instructions, see SETUP_GUIDE.md**
