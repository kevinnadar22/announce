# Heroku Deployment Guide

This guide provides two deployment methods for your Django application on Heroku: using **Buildpacks** (recommended for simplicity) and **Container Deployment** (for more control).

## Prerequisites

1. **Heroku CLI** installed on your machine
   ```bash
   # Install Heroku CLI (macOS)
   brew tap heroku/brew && brew install heroku
   
   # Or download from: https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Git** repository initialized
3. **Heroku account** created at [heroku.com](https://heroku.com)

## Method 1: Buildpack Deployment (Recommended)

### Step 1: Login to Heroku
```bash
heroku login
```

### Step 2: Create Heroku Application
```bash
# Create a new Heroku app (replace 'your-app-name' with your desired name)
heroku create your-app-name

# Or let Heroku generate a random name
heroku create
```

### Step 3: Set Python Buildpack
```bash
# Set the Python buildpack
heroku buildpacks:set heroku/python

# Verify buildpack is set
heroku buildpacks
```

### Step 4: Configure Environment Variables
```bash
# Set Django settings
heroku config:set DJANGO_SETTINGS_MODULE=api.settings
heroku config:set SECRET_KEY="your-secret-key-here"
heroku config:set DEBUG=False
heroku config:set ALLOWED_HOSTS="your-app-name.herokuapp.com"

# Database (Heroku Postgres)
heroku addons:create heroku-postgresql:mini
# This automatically sets DATABASE_URL

# Redis (for Celery)
heroku addons:create heroku-redis:mini
# This automatically sets REDIS_URL

# Optional: Set additional environment variables
heroku config:set ENVIRONMENT=production
```

### Step 5: Configure Database Settings
Make sure your `api/settings.py` includes database configuration for Heroku:

```python
import dj_database_url
import os

# Database configuration for Heroku
if 'DATABASE_URL' in os.environ:
    DATABASES = {
        'default': dj_database_url.parse(os.environ.get('DATABASE_URL'))
    }
```

### Step 6: Update Procfile for Buildpack Deployment
Your current `Procfile` needs to be updated for proper port binding:

```
web: gunicorn api.wsgi:application --bind 0.0.0.0:$PORT --workers 3 --worker-class sync --timeout 30 --keep-alive 2 --max-requests 1000 --max-requests-jitter 100 --log-level info
worker: celery -A api worker --loglevel=info --concurrency=4 -E
beat: celery -A api beat --loglevel=info
flower: celery -A api flower --port=5555 --address=0.0.0.0 --basic_auth=admin:123456 --loglevel=info
```

### Step 7: Add Required Dependencies
Ensure your `requirements.txt` includes (already present in your file):
- `gunicorn` - WSGI server
- `psycopg2-binary` - PostgreSQL adapter
- `dj-database-url` - Database URL parsing

### Step 8: Deploy Application
```bash
# Add and commit all changes
git add .
git commit -m "Configure for Heroku deployment"

# Deploy to Heroku
git push heroku main
# or if your default branch is master:
# git push heroku master
```

### Step 9: Run Database Migrations
```bash
# Run migrations on Heroku
heroku run python manage.py migrate

# Create superuser (optional)
heroku run python manage.py createsuperuser

# Collect static files
heroku run python manage.py collectstatic --noinput
```

### Step 10: Scale Dynos
```bash
# Scale web dyno
heroku ps:scale web=1

# Scale worker dyno for Celery (optional)
heroku ps:scale worker=1

# Scale beat dyno for scheduled tasks (optional)
heroku ps:scale beat=1
```

## Method 2: Container Deployment

### Step 1: Set Stack to Container
```bash
# Set Heroku stack to container
heroku stack:set container
```

### Step 2: Use Existing heroku.yml
Your project already has a `heroku.yml` file configured for container deployment. This tells Heroku to build using your `Dockerfile`.

### Step 3: Update heroku.yml for Multiple Services
If you want to run Celery workers alongside your web app:

```yaml
build:
  docker:
    web: Dockerfile
    worker: Dockerfile
    beat: Dockerfile
run:
  web: gunicorn --bind 0.0.0.0:$PORT --workers 3 --worker-class sync --timeout 30 --keep-alive 2 --max-requests 1000 --max-requests-jitter 100 --log-level info api.wsgi:application
  worker: celery -A api worker --loglevel=info --concurrency=4 -E
  beat: celery -A api beat --loglevel=info
```

### Step 4: Deploy Container
```bash
# Deploy using container
git add .
git commit -m "Container deployment configuration"
git push heroku main
```

## Post-Deployment Configuration

### Environment Variables Management
```bash
# View all config vars
heroku config

# Set additional variables
heroku config:set VAR_NAME=value

# Remove variables
heroku config:unset VAR_NAME
```

### Monitoring and Logs
```bash
# View application logs
heroku logs --tail

# View specific dyno logs
heroku logs --dyno=web.1 --tail

# Monitor dyno status
heroku ps
```

### Database Management
```bash
# Access database console
heroku pg:psql

# View database info
heroku pg:info

# Reset database (WARNING: This deletes all data)
heroku pg:reset DATABASE_URL --confirm your-app-name
```

### Redis Management
```bash
# View Redis info
heroku redis:info

# Access Redis CLI
heroku redis:cli
```

## Scaling Your Application

### Scale Dynos
```bash
# Scale web dynos
heroku ps:scale web=2

# Scale worker dynos
heroku ps:scale worker=2

# Scale beat dynos (only need 1)
heroku ps:scale beat=1
```

### Upgrade Plans
```bash
# Upgrade database
heroku addons:upgrade heroku-postgresql:basic

# Upgrade Redis
heroku addons:upgrade heroku-redis:premium-0
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check build logs
   heroku logs --tail
   
   # Rebuild application
   git commit --allow-empty -m "Empty commit to trigger build"
   git push heroku main
   ```

2. **Database Connection Issues**
   - Ensure `DATABASE_URL` is set: `heroku config:get DATABASE_URL`
   - Check database configuration in `settings.py`
   - Run migrations: `heroku run python manage.py migrate`

3. **Static Files Issues**
   ```bash
   # Collect static files
   heroku run python manage.py collectstatic --noinput
   ```

4. **Celery Worker Issues**
   - Ensure Redis is configured: `heroku config:get REDIS_URL`
   - Check worker dyno status: `heroku ps`
   - Scale worker dyno: `heroku ps:scale worker=1`

### Useful Commands
```bash
# Open application in browser
heroku open

# Access Django shell
heroku run python manage.py shell

# Run one-off commands
heroku run python manage.py <command>

# Restart all dynos
heroku restart
```

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to git
2. **DEBUG Setting**: Always set `DEBUG=False` in production
3. **SECRET_KEY**: Generate a new secret key for production
4. **ALLOWED_HOSTS**: Restrict to your domain only
5. **Database Security**: Use strong passwords and SSL connections

## Cost Optimization

1. **Use Eco Dynos**: For development/testing ($5-7/month per dyno)
2. **Scale Down**: Turn off dynos when not needed
3. **Database**: Start with mini plan and upgrade as needed
4. **Redis**: Start with mini plan for basic caching needs

## Next Steps

1. Set up **Custom Domain**: `heroku domains:add yourdomain.com`
2. **SSL Certificate**: `heroku certs:auto:enable`
3. **CI/CD Pipeline**: Connect to GitHub for automatic deployments
4. **Monitoring**: Set up application monitoring with New Relic or similar
5. **Backup**: Set up regular database backups

---

**Note**: Replace placeholders like `your-app-name`, `your-secret-key-here`, etc., with your actual values.

For more detailed information, visit the [Heroku Dev Center](https://devcenter.heroku.com/). 