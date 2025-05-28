# Subdomain Setup Guide

This guide explains how to link subdomains to specific ports in your Docker Compose setup.

## Current Services
- **Web Application**: Port 8000 (Django + Gunicorn)
- **Flower Monitoring**: Port 5555 (Celery monitoring)
- **Nginx Proxy**: Port 8080 (HTTP) and 8443 (HTTPS)

## Option 1: Using Nginx Reverse Proxy (Recommended)

### 1. DNS Configuration
First, configure your DNS to point subdomains to your server:
```
api.announce.org.in    → Your Server IP:8080
flower.announce.org.in → Your Server IP:8080
```

### 2. Run with Nginx
Use the main `docker-compose.yml` file:
```bash
docker-compose up -d
```

### 3. Access Your Services
- Main API: `http://api.announce.org.in:8080`
- Flower Monitoring: `http://flower.announce.org.in:8080`

### 4. Customize Nginx Configuration
Edit `nginx.conf` to change:
- Replace domain names with your actual domain
- Adjust upstream server ports if needed
- Add SSL/HTTPS configuration if required

## Local Development (hosts file)

For local testing, add these entries to your `/etc/hosts` file:
```
127.0.0.1 api.announce.org.in
127.0.0.1 flower.announce.org.in
```

Then access:
- Main API: `http://api.announce.org.in:8080`
- Flower Monitoring: `http://flower.announce.org.in:8080`

## SSL/HTTPS Setup

### For Nginx + Let's Encrypt:
1. Install Certbot in the nginx container
2. Update nginx.conf with SSL configuration
3. Access via port 8443: `https://api.announce.org.in:8443`

## Production Considerations

1. **Security**: 
   - Use strong authentication for Flower
   - Implement rate limiting
   - Use HTTPS in production (port 8443)

2. **Performance**:
   - Configure nginx caching
   - Set up proper logging
   - Monitor resource usage

3. **Monitoring**:
   - Set up health checks
   - Configure alerts
   - Monitor SSL certificate expiration

## Troubleshooting

### Check Service Status
```bash
docker-compose ps
docker-compose logs nginx
docker-compose logs web
docker-compose logs flower
```

### Test Connectivity
```bash
# Test internal connectivity
docker-compose exec nginx ping web
docker-compose exec nginx ping flower

# Test external access
curl -H "Host: api.announce.org.in" http://localhost:8080
curl -H "Host: flower.announce.org.in" http://localhost:8080
```

### Port Information
- **8080**: HTTP traffic (nginx listens on internal port 80, exposed as 8080)
- **8443**: HTTPS traffic (nginx listens on internal port 443, exposed as 8443)
- **8000**: Django app (internal only, accessed via nginx proxy)
- **5555**: Flower monitoring (internal only, accessed via nginx proxy) 