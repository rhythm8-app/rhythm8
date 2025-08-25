# Staging Environment - Kubernetes

This directory contains Kubernetes configurations for the staging environment of rhythm∞.

## Deployment

### Prerequisites
- Kubernetes cluster configured
- `kubectl` configured to access the cluster
- Cert-manager installed for TLS certificates
- NGINX Ingress Controller installed

### Setup Steps

1. **Create the namespace:**
   ```bash
   kubectl apply -f namespace.yaml
   ```

2. **Create secrets (copy from example and modify):**
   ```bash
   cp secrets-example.yaml secrets.yaml
   # Edit secrets.yaml with actual values
   kubectl apply -f secrets.yaml
   ```

3. **Deploy the application:**
   ```bash
   kubectl apply -f configmap.yaml
   kubectl apply -f pocketbase.yaml
   kubectl apply -f backend.yaml
   kubectl apply -f frontend.yaml
   kubectl apply -f ingress.yaml
   ```

4. **Run the seeder (one-time):**
   ```bash
   kubectl apply -f seeder.yaml
   ```

## Services

- **Frontend**: https://test.rhythm8.app
- **Backend API**: https://api.test.rhythm8.app
- **Pocketbase Admin**: https://api.test.rhythm8.app/_/ (through backend proxy)

## Monitoring

Check deployment status:
```bash
kubectl get pods -n rhythm8-stage
kubectl get services -n rhythm8-stage
kubectl get ingress -n rhythm8-stage
```

View logs:
```bash
kubectl logs -f deployment/backend -n rhythm8-stage
kubectl logs -f deployment/frontend -n rhythm8-stage
kubectl logs -f deployment/pocketbase -n rhythm8-stage
```

## Cleanup

To remove the staging environment:
```bash
kubectl delete namespace rhythm8-stage
```