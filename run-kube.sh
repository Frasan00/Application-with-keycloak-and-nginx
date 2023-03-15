#!/bin/bash

# make sure to have a cluster running on your machine (es. minikube or k3s) and kubectl installed
# this file auto-deploys on your cluster all the microservicies

cd kubernetes

### select one of the above depending on your needs ###
# minikube addons enable ingress
# kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

# postgres
kubectl apply -f postgres-secret.yaml
kubectl apply -f postgres-deployment.yaml

# keycloak
kubectl apply -f keycloak-secret.yaml
kubectl apply -f keycloak-deployment.yaml

# server 
kubectl apply -f server-deployment.yaml

# client
kubectl apply -f client-deployment.yaml

# nginx
kubectl apply -f nginx-ingress.yaml

# Informations
echo " "
echo "Pods "
kubectl get pods
echo " "
echo "Servicies "
kubectl get svc
echo " "
echo "Secrets "
kubectl get secret
echo " "
echo "Ingress "
kubectl get ingress nginx-ingress

### remember to save in your /etc/hosts file the configuration fra.com cluster-ip ###