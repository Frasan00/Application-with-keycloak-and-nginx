#!/bin/bash

# deployment file for microk8s
# make sure to have a microk8s cluster running on your machine
# this file auto-deploys on your cluster all the microservicies

cd kubernetes
sudo microk8s enable ingress dns 
alias k="microk8s kubectl"

# postgres
k apply -f postgres-secret.yaml
k apply -f postgres-deployment.yaml

# keycloak
k apply -f keycloak-secret.yaml
k apply -f keycloak-deployment.yaml

# server 
k apply -f server-deployment.yaml

# client
k apply -f client-deployment.yaml

# nginx
k apply -f nginx-ingress.yaml

# Informations
echo " "
echo "Pods "
k get pods
echo " "
echo "Servicies "
k get svc
echo " "
echo "Secrets "
k get secret
echo " "
echo "Ingress "
k get ingress nginx-ingress

### remember to save in your /etc/hosts file the configuration fra.com cluster-ip ###