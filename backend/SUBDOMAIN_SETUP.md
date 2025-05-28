# Subdomain Setup Guide

This guide explains how to link subdomains to specific ports in your Docker Compose setup.

## Current Services
- **Web Application**: Port 8000 (Django + Gunicorn)
- **Flower Monitoring**: Port 5555 (Celery monitoring)

## Option 1: Using Nginx Reverse Proxy (Recommended)

### 1. DNS Configuration
First, configure your DNS to point subdomains to your server:
```
api.yourdomain.com    → Your Server IP
flower.yourdomain.com → Your Server IP
```

### 2. Run with Nginx
Use the main `docker-compose.yml` file:
```bash
docker-compose up -d
```

### 3. Access Your Services
- Main API: `http://api.yourdomain.com`
- Flower Monitoring: `http://flower.yourdomain.com`

### 4. Customize Nginx Configuration
Edit `nginx.conf` to change:
- Replace `yourdomain.com` with your actual domain
- Adjust upstream server ports if needed
- Add SSL/HTTPS configuration if required

## Option 2: Using Traefik

### 1. Run with Traefik
```bash
docker-compose -f docker-compose.traefik.yml up -d
```

### 2. Access Your Services
- Main API: `http://api.yourdomain.com`
- Flower Monitoring: `http://flower.yourdomain.com`
- Traefik Dashboard: `http://your-server-ip:8080`

## Local Development (hosts file)

For local testing, add these entries to your `/etc/hosts` file:
```
127.0.0.1 api.yourdomain.com
127.0.0.1 flower.yourdomain.com
```

## SSL/HTTPS Setup

### For Nginx + Let's Encrypt:
1. Install Certbot in the nginx container
2. Update nginx.conf with SSL configuration
3. Set up automatic certificate renewal

### For Traefik + Let's Encrypt:
Add these labels to your services:
```yaml
labels:
  - "traefik.http.routers.web.tls.certresolver=letsencrypt"
  - "traefik.http.routers.web.rule=Host(`api.yourdomain.com`)"
```

## Production Considerations

1. **Security**: 
   - Use strong authentication for Flower
   - Implement rate limiting
   - Use HTTPS in production

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
curl -H "Host: api.yourdomain.com" http://localhost
curl -H "Host: flower.yourdomain.com" http://localhost
``` 