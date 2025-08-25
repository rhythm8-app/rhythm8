# Production Environment - Kubernetes

This directory contains Kubernetes configurations for the production environment of rhythm∞.

## Deployment

### Prerequisites
- Production Kubernetes cluster configured
- `kubectl` configured to access the production cluster
- Cert-manager installed for TLS certificates
- NGINX Ingress Controller installed
- Monitoring and alerting configured

### Setup Steps

1. **Create the namespace:**
   ```bash
   kubectl apply -f namespace.yaml
   ```

2. **Create secrets (copy from example and modify):**
   ```bash
   cp secrets-example.yaml secrets.yaml
   # Edit secrets.yaml with secure production values
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

4. **Run the seeder (one-time, initial setup only):**
   ```bash
   kubectl apply -f seeder.yaml
   ```

## Services

- **Frontend**: https://rhythm8.app
- **Backend API**: https://api.rhythm8.app
- **Pocketbase Admin**: https://api.rhythm8.app/_/ (through backend proxy)

## Production Considerations

### Security
- Use strong passwords in secrets
- Enable network policies
- Regular security updates
- Monitor access logs

### Backup
- Regular database backups
- PVC snapshots
- Configuration backups

### Monitoring
```bash
kubectl get pods -n rhythm8-prod
kubectl get services -n rhythm8-prod
kubectl get ingress -n rhythm8-prod
```

### Scaling
Adjust replicas in deployment files as needed:
- Backend: Currently 3 replicas
- Frontend: Currently 3 replicas
- Pocketbase: Single replica (consider HA setup for critical production)

## Maintenance

### Rolling Updates
```bash
kubectl set image deployment/backend backend=rhythm8/backend:new-version -n rhythm8-prod
kubectl set image deployment/frontend frontend=rhythm8/frontend:new-version -n rhythm8-prod
```

### View Logs
```bash
kubectl logs -f deployment/backend -n rhythm8-prod
kubectl logs -f deployment/frontend -n rhythm8-prod
kubectl logs -f deployment/pocketbase -n rhythm8-prod
```

## Emergency Procedures

### Scale Down
```bash
kubectl scale deployment backend --replicas=0 -n rhythm8-prod
kubectl scale deployment frontend --replicas=0 -n rhythm8-prod
```

### Complete Cleanup (DANGER!)
```bash
kubectl delete namespace rhythm8-prod
```