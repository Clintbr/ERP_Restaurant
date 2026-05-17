# Mini-ERP pour Restaurant — Cahier des Exigences

## 1. Introduction

### 1.1 Objectif du projet

Le projet consiste à développer un mini-ERP (Enterprise Resource Planning) destiné à un restaurant, un café, un snack ou un petit établissement de restauration.

Le système devra permettre la gestion centralisée des opérations suivantes :

* Gestion des commandes
* Gestion des tables
* Gestion de la cuisine
* Facturation et paiements
* Gestion du stock et inventaire
* Gestion des employés
* Gestion des achats fournisseurs
* Rapports et statistiques
* Administration et paramètres du système

Le système devra fonctionner dans un réseau local de restaurant ou sur un serveur cloud léger.

---

## 2. Stack Technologique

### Backend

* Node.js
* Express.js
* API REST
* JavaScript

### Frontend

* React
* JavaScript
* Interface responsive

### Base de données

* SQLite

### Communication

* HTTP / HTTPS
* JSON

---

# 3. Architecture Générale

Le système sera composé de trois couches principales :

1. Frontend React
2. Backend Node.js
3. Base de données SQLite

Les clients frontend communiqueront avec le backend via une API REST.

Le backend sera responsable :

* de la logique métier
* de la sécurité
* des validations
* de la gestion des données
* de la communication avec SQLite

SQLite stockera l’ensemble des données métier du système.

---

# 4. Exigences Fonctionnelles

# 4.1 Frontend (React)

## 4.1.1 Interface Caisse / POS

Le système devra fournir une interface de caisse permettant :

* Création de commandes
* Ajout d’articles
* Modification de commandes
* Annulation de commandes
* Gestion des tables
* Séparation des additions
* Paiement par plusieurs méthodes
* Impression des tickets
* Visualisation des commandes ouvertes
* Fermeture des commandes

### Fonctionnalités supplémentaires

* Recherche rapide de produits
* Catégories de produits
* Calcul automatique des montants
* Calcul TVA
* Affichage des promotions
* Historique des paiements

---

## 4.1.2 Affichage Cuisine (KDS)

Le système devra fournir un écran cuisine permettant :

* Affichage des commandes en temps réel
* Affichage du statut des commandes
* Mise à jour du statut de préparation
* Priorisation des commandes
* Communication entre cuisine et salle
* Notification des commandes prêtes

### Statuts possibles

* Nouvelle commande
* En préparation
* Prête
* Servie
* Annulée

---

## 4.1.3 Tableau de Bord Manager

Le tableau de bord devra permettre :

* Visualisation du chiffre d’affaires
* Rapports de ventes
* Rapports de stock
* Suivi des commandes
* Suivi des employés
* Analyse des produits populaires
* Analyse des heures de pointe
* Visualisation des statistiques journalières
* Rapports mensuels

---

## 4.1.4 Application Mobile Serveur

L’application mobile devra permettre :

* Prise de commandes
* Gestion des tables
* Consultation des commandes
* Facturation
* Encaissement
* Consultation des menus
* Mise à jour des statuts de service

---

## 4.1.5 Administration Web

Le panneau d’administration devra permettre :

* Gestion des utilisateurs
* Gestion des rôles
* Gestion des permissions
* Paramètres du restaurant
* Configuration des imprimantes
* Gestion des taxes
* Gestion des catégories produits
* Gestion des sauvegardes
* Gestion des paramètres système

---

# 4.2 Backend (Node.js)

## 4.2.1 API REST

Le backend devra exposer une API REST sécurisée.

### L’API devra permettre :

* Authentification
* Autorisation
* Gestion des sessions
* Gestion CRUD des données
* Validation des requêtes
* Gestion des erreurs
* Journalisation des actions

---

## 4.2.2 Authentification et Sécurité

Le système devra inclure :

* Authentification JWT
* Gestion des rôles
* Gestion des permissions
* Protection des routes API
* Validation des entrées utilisateur
* Hashage des mots de passe
* Protection contre les requêtes invalides

### Rôles possibles

* Administrateur
* Manager
* Serveur
* Cuisine
* Caissier

---

## 4.2.3 Journalisation et Audit

Le backend devra enregistrer :

* Connexions utilisateurs
* Modifications importantes
* Suppressions
* Paiements
* Actions administrateur
* Erreurs système
* Historique des activités

---

# 4.3 Modules ERP

# 4.3.1 Gestion des Utilisateurs et Rôles

Le système devra permettre :

* Création d’utilisateurs
* Modification des utilisateurs
* Suppression des utilisateurs
* Attribution de rôles
* Attribution de permissions
* Gestion des mots de passe
* Activation/désactivation de comptes

---

# 4.3.2 Gestion des Tables

Le système devra permettre :

* Création des tables
* Attribution des zones
* Gestion des statuts des tables
* Fusion des tables
* Déplacement des clients
* Réservation de tables

### Statuts de table

* Libre
* Occupée
* Réservée
* En nettoyage

---

# 4.3.3 Gestion des Commandes

Le système devra permettre :

* Création de commandes
* Modification des commandes
* Suppression de commandes
* Ajout d’articles
* Gestion des quantités
* Envoi vers cuisine
* Suivi des commandes
* Historique des commandes

### Données d’une commande

* Numéro de commande
* Date
* Table
* Serveur
* Produits
* Quantités
* Prix
* Statut
* Montant total

---

# 4.3.4 Module Cuisine

Le module cuisine devra permettre :

* Réception des commandes
* Affichage des détails des commandes
* Mise à jour du statut de préparation
* Gestion des priorités
* Historique de préparation

---

# 4.3.5 Facturation et Paiements

Le système devra permettre :

* Génération de factures
* Impression de tickets
* Paiement partiel
* Paiement multiple
* Gestion TVA
* Historique des paiements
* Gestion des remboursements

### Méthodes de paiement

* Espèces
* Carte bancaire
* Paiement mobile

---

# 4.3.6 Gestion du Stock et Inventaire

Le système devra permettre :

* Gestion des produits
* Gestion des ingrédients
* Suivi des mouvements de stock
* Entrées de stock
* Sorties de stock
* Alertes de stock faible
* Inventaires
* Historique des mouvements

### Données stockées

* Produit
* Quantité
* Seuil minimum
* Fournisseur
* Date de mouvement

---

# 4.3.7 Gestion des Employés

Le système devra permettre :

* Gestion des profils employés
* Gestion des horaires
* Gestion des présences
* Gestion des rôles
* Gestion des permissions
* Historique des activités

---

# 4.3.8 Gestion des Achats

Le système devra permettre :

* Gestion des fournisseurs
* Création des commandes fournisseurs
* Réception des marchandises
* Historique des achats
* Mise à jour automatique du stock

---

# 4.3.9 Rapports et Analyses

Le système devra fournir :

* Rapport de ventes
* Rapport de stock
* Rapport des employés
* Produits populaires
* Analyse du chiffre d’affaires
* Rapports journaliers
* Rapports mensuels
* Rapports annuels

---

# 4.3.10 Notifications

Le système devra permettre :

* Alertes cuisine
* Notifications de commandes
* Alertes de stock faible
* Notifications système
* Alertes administrateur

---

# 5. Services Communs

## 5.1 Service d’Impression

Le système devra permettre :

* Impression des tickets
* Impression cuisine
* Impression des factures
* Impression réseau
* Support ESC/POS

---

## 5.2 Service E-mail

Le système devra permettre :

* Envoi de factures
* Notifications par e-mail
* Alertes système

---

## 5.3 Upload de Fichiers

Le système devra permettre :

* Upload d’images
* Upload de factures
* Upload de documents

---

## 5.4 Sauvegarde

Le système devra permettre :

* Sauvegarde automatique
* Sauvegarde manuelle
* Sauvegarde locale
* Sauvegarde cloud (optionnelle)
* Restauration des sauvegardes

---

# 6. Base de Données SQLite

## 6.1 Exigences Générales

SQLite devra stocker :

* Produits
* Catégories
* Tables
* Commandes
* Paiements
* Stocks
* Fournisseurs
* Employés
* Utilisateurs
* Logs
* Paramètres

---

## 6.2 Tables Principales

### Tables de données

* users
* roles
* permissions
* tables
* orders
* order_items
* products
* categories
* inventory
* inventory_movements
* suppliers
* purchases
* employees
* payments
* invoices
* notifications
* logs
* settings

---

# 7. Exigences Non Fonctionnelles

# 7.1 Performance

Le système devra :

* Répondre rapidement
* Supporter plusieurs clients simultanés
* Optimiser les requêtes SQLite
* Utiliser des index SQL

---

# 7.2 Sécurité

Le système devra :

* Sécuriser les mots de passe
* Sécuriser les API
* Protéger les données sensibles
* Contrôler les accès
* Journaliser les actions critiques

---

# 7.3 Maintenabilité

Le projet devra être :

* Modulaire
* Facile à maintenir
* Facile à étendre
* Structuré par modules
* Documenté

---

# 7.4 Compatibilité

Le système devra fonctionner sur :

* Windows
* Linux
* Tablettes
* Terminaux tactiles
* Navigateurs modernes
* Smartphones
* Navigateurs web modernes

Le système devra également être entièrement utilisable depuis un navigateur web.

### Compatibilité navigateur

L’application devra être compatible avec :

* Google Chrome
* Mozilla Firefox
* Microsoft Edge
* Safari

### Exigences Web

Le frontend React devra être responsive et optimisé pour :

* Desktop
* Tablettes
* Mobiles

Le système devra permettre :

* Utilisation sans installation locale
* Accès via URL interne ou distante
* Utilisation dans un réseau local ou via Internet
* Gestion des sessions utilisateurs dans le navigateur
* Communication sécurisée HTTPS
* Mise à jour centralisée du système

---

# 7.5 Sauvegarde et Restauration

Le système devra :

* Permettre une restauration rapide
* Utiliser des fichiers SQLite sauvegardables
* Permettre une copie simple des données

---

# 8. Déploiement

## 8.1 Déploiement Local

Le système devra pouvoir fonctionner :

* Sur un serveur local du restaurant
* Dans un réseau LAN/Wi-Fi
* Avec plusieurs terminaux connectés

---

## 8.2 Déploiement Cloud

Le système devra pouvoir être déployé en ligne afin d’être accessible depuis Internet.

Le déploiement devra permettre :

* Hébergement sur un serveur VPS
* Hébergement sur un serveur cloud Linux
* Déploiement avec Docker (optionnel)
* Utilisation d’un nom de domaine personnalisé
* Accès sécurisé via HTTPS
* Accès distant depuis un navigateur web
* Utilisation multi-utilisateurs via Internet
* Mise à jour centralisée du système
* Sauvegarde distante des données

### Hébergement Web

Le système devra être compatible avec :

* Hébergement VPS
* Serveur dédié
* Reverse proxy Nginx

### Nom de Domaine

Le système devra permettre :

* L’utilisation d’un nom de domaine personnalisé
* La configuration DNS
* La sécurisation SSL/TLS
* L’accès via HTTPS

### Exemple d’accès

### Sécurité Web

Le déploiement devra inclure :

* Certificat SSL/TLS
* Protection HTTPS
* Sécurisation des API REST
* Gestion des sessions sécurisées
* Protection des accès administrateur

---

# 9. Avantages du Système

Le système devra être :

* Léger
* Rapide
* Économique
* Facile à déployer
* Facile à maintenir
* Adapté aux petits et moyens restaurants
* Facile à sauvegarder

---

# 10. Conclusion

Le mini-ERP restaurant devra fournir une solution complète de gestion de restaurant basée sur :

* React pour le frontend
* Node.js pour le backend
* SQLite pour la base de données

Le système devra être modulaire, évolutif, sécurisé et adapté aux besoins des petits et moyens établissements de restauration.
