#!/bin/bash

# Création des répertoires nécessaires
mkdir -p nginx/conf.d nginx/ssl nginx/logs

# Génération des certificats SSL auto-signés pour le développement
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/nginx.key \
  -out nginx/ssl/nginx.crt \
  -subj "/C=FR/ST=IDF/L=Paris/O=Dev/CN=localhost"

# Création du fichier .env
cat > .env << EOL
NODE_ENV=development
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/eventvibe
REDIS_URL=redis://redis:6379
NEXTAUTH_SECRET=dev-secret
NEXTAUTH_URL=http://localhost
EOL