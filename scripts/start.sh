#!/bin/bash

# Démarrage des services
docker-compose up -d

# Attente que la base de données soit prête
echo "Attente de la base de données..."
sleep 10

# Exécution des migrations Prisma
docker-compose exec app npx prisma migrate dev

echo "Environnement de développement prêt!"
echo "Application: http://localhost"
echo "Adminer: http://localhost:8080"
