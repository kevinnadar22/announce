# Announce Backend


A Django REST Framework backend that powers the government announcement processing platform. This backend handles automated scraping from pib.gov.in using Celery and RabbitMQ, processes content through LLM APIs, and provides a comprehensive REST API.

## Tech Stack

- Django 5.2.1 + DRF 3.16.0
- PostgreSQL
- Celery 5.3.6 + RabbitMQ
- Redis 5.0.2
- Celery Worker/Beat/Redbeat
- Gemini & Groq APIs
- MongoDB, Flower

## Features

- **Automated Web Scraping**: Continuous monitoring of pib.gov.in for new announcements
- **AI Content Processing**: Integration with Gemini and Groq APIs for content translation and summarization
- **RESTful API**: Comprehensive API endpoints with filtering, pagination, and search

## Prerequisites

- Python 3.9+
- PostgreSQL 12+
- Redis Server
- RabbitMQ Server (or CloudAMQP account)

## Environment Configuration

### Required Environment Variables

Create a `.env` file in the backend directory with the following configuration:

```bash
# .env

# LLM API Keys (at least one required)
GEMINI_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here

# Message Queue (CloudAMQP recommended for production)
CELERY_BROKER_URL=amqp://username:password@hostname:port/vhost

# Result Backend (MongoDB)
CELERY_RESULT_BACKEND=mongodb://username:password@hostname:port/database

# Redis for Celery Beat scheduling
CELERY_REDBEAT_REDIS_URL=redis://username:password@hostname:port/0

# Django Secret Key
SECRET_KEY=your_very_secure_secret_key_here

# PostgreSQL Database Configuration
DB_NAME=postgres
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432

# Optional: Django Settings
DEBUG=False
```

### Why These Environment Variables Are Needed

**LLM API Keys**: 
- `GEMINI_API_KEY`: Required for Google's Gemini API to process and translate government announcements
- `GROQ_API_KEY`: Alternative LLM API for content processing (at least one LLM API key is required)

**Message Queue Configuration**:
- `CELERY_BROKER_URL`: RabbitMQ connection for task distribution between workers
- `CELERY_RESULT_BACKEND`: MongoDB for storing task results and processed content
- `CELERY_REDBEAT_REDIS_URL`: Redis connection for persistent task scheduling

**Database Configuration**:
- PostgreSQL is the only supported database due to specific query requirements and data integrity needs
- All database connection parameters must be provided for proper operation

**Security**:
- `SECRET_KEY`: Django's cryptographic signing key for sessions, CSRF protection, and other security features

### Free Cloud Services for Environment Variables

- **GEMINI_API_KEY**: Get free API key from [Google AI Studio](https://makersuite.google.com/)
- **GROQ_API_KEY**: Get free API key from [Groq Console](https://console.groq.com/)
- **CELERY_BROKER_URL**: Free RabbitMQ instance from [CloudAMQP](https://cloudamqp.com/)
- **CELERY_RESULT_BACKEND**: Free MongoDB cluster from [MongoDB Atlas](https://mongodb.com/)
- **CELERY_REDBEAT_REDIS_URL**: Free Redis instance from [Redis.io](https://redis.io/)
- **PostgreSQL**: Free database from [Neon](https://neon.tech/) or [Supabase](https://supabase.com/)

## Installation and Setup

### Local Development

1. **Clone and navigate to backend**
```bash
git clone https://github.com/kevinnadar22/announce.git
cd announce/backend
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables**
```bash
cp prod.env .env
# Edit .env with your configuration
```

5. **Create secrets directory structure**
```bash
mkdir -p secrets/dev secrets/prod
```

6. **Create scraping configuration files**

Watch this video guide for creating JSON configuration files:

[Watch JSON Configuration Guide](https://github.com/kevinnadar22/announce/raw/main/assets/jsonguide.mp4)


7. **Run database migrations**
```bash
python manage.py migrate
```

8. **Create superuser (optional)**
```bash
python manage.py createsuperuser
```

9. **Start development server**
```bash
python manage.py runserver
```

10. **Start Celery workers (in separate terminals)**
```bash
# Worker process
celery -A api worker --loglevel=info

# Beat scheduler
celery -A api beat --loglevel=info

# Flower monitoring (optional)
celery -A api flower
```


## API Documentation

Once the server is running, access the API documentation at:

- **Swagger UI**: `http://localhost:8000/api/docs/`
- **ReDoc**: `http://localhost:8000/api/redoc/`
- **OpenAPI Schema**: `http://localhost:8000/api/schema/`

## CORS and Allowed Hosts Configuration

### CORS Configuration

The backend uses `django-cors-headers` to handle Cross-Origin Resource Sharing. Configure CORS settings in `api/settings.py`:

```python
# For development
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React dev server
    "http://127.0.0.1:3000",
]

# For production
CORS_ALLOWED_ORIGINS = [
    "https://yourdomain.com",
    "https://announce.org.in",
]

# Allow credentials for authentication
CORS_ALLOW_CREDENTIALS = True
```

### Allowed Hosts Configuration

Configure allowed hosts in `api/settings.py`:

```python
# For development
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# For production
ALLOWED_HOSTS = ['yourdomain.com', 'announce.org.in', 'your-heroku-app.herokuapp.com']
```

## Deployment

### Docker Deployment

```bash
docker-compose up -d
```

### Heroku Deployment

1. **Install Heroku CLI and login**
```bash
heroku login
```

2. **Create Heroku app**
```bash
heroku create your-app-name
```

3. **Set environment variables**
```bash
heroku config:set SECRET_KEY=your-secret-key
heroku config:set GEMINI_API_KEY=your-gemini-key
heroku config:set CELERY_BROKER_URL=your-rabbitmq-url
# ... add all other environment variables
```

4. **Deploy**
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

5. **Run migrations**
```bash
heroku run python manage.py migrate
```

6. **Scale dynos for production**
```bash
# Scale web dyno for handling HTTP requests
heroku ps:scale web=1

# Scale worker dyno for processing background tasks
heroku ps:scale worker=1

# Scale beat dyno for scheduled tasks (only need 1)
heroku ps:scale beat=1

# Optional: Scale flower dyno for monitoring (development/staging)
heroku ps:scale flower=1

# For production with higher load, you can scale multiple workers
heroku ps:scale web=2 worker=3 beat=1
```

**Note**: The `beat` dyno should always be scaled to exactly 1 to avoid duplicate scheduled tasks. You can scale multiple `web` and `worker` dynos based on your traffic and processing needs.

### VPS Deployment

1. **Set up the server**
```bash
# Install system dependencies
sudo apt update
sudo apt install python3 python3-pip python3-venv postgresql postgresql-contrib redis-server

# Install and configure PostgreSQL
sudo -u postgres createuser --interactive
sudo -u postgres createdb announce_db
```

2. **Deploy application**
```bash
# Clone repository
git clone https://github.com/kevinnadar22/announce.git
cd announce/backend

# Set up Python environment
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Set up environment
cp prod.env .env
# Edit .env with your configuration

# Run migrations and collect static files
python manage.py migrate
python manage.py collectstatic --noinput
```

## Database Support

**Important**: This application **only supports PostgreSQL**. SQLite and other databases are not supported due to:

- Specific query requirements and data integrity needs
- Lack of support for certain Django features

## Monitoring and Debugging

### Celery Monitoring with Flower

Access Flower monitoring interface:
```bash
celery -A api flower
# Visit http://localhost:5555
```

**When running with Docker**: Flower is configured with basic authentication for security.
- **Username**: `admin`
- **Password**: `123456`
- **URL**: `http://localhost:5555`

#### Flower Interface Screenshots

**Flower Home Dashboard**:
![Flower Home](../asset/flowerhome.png)

**Flower Tasks Monitoring**:
![Flower Tasks](../asset/flowertasks.png)

The Flower interface provides real-time monitoring of:
- Active and completed tasks

### Logs

Monitor application logs:
```bash
# Django logs
tail -f logs/django.log

# Celery logs
tail -f logs/celery.log
```

## Support

For technical issues or questions:
- Check the API documentation at `/api/docs/`
- Review the Django logs for error details
- Ensure all environment variables are properly configured

### Contact
- Email: jesikamaraj@gmail.com
- GitHub Issues: https://github.com/kevinnadar22/announce/issues
- Twitter: [@kevinnadar22](https://twitter.com/kevinnadar22)
