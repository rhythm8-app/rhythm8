# rhythm∞ - Your dance plans, sorted!

## Projektvision
Digitale Organisationsplattform für Tänzer zur Verwaltung von:
- Gruppenorganisation
- Event-Kalender
- Trainingseinheiten
- Reiseplanung
- Kostentracking

## Tech Stack
- Frontend: Vue.js 3 + Vuetify
- Backend: FastAPI
- Database: Pocketbase
- Seeder: Datenbankinitialisierung
- Infrastructure: Docker, Kubernetes
- Development: Open Source / MIT Lizenz

## Funktionsanforderungen

### Persönliche Organisation
- Erinnerungen für Event-Registrierungen
- Zahlungserinnerungen
- Kostenübersicht
- Automatischer Import von Event-Informationen
- Erfolgs-/Rating-Tracking

### Gruppenorganisation
- Modulares System (Events, Training, Reisen, Unterkünfte)
- Training Management
- Unterrichtsmanagement
- Zentrale Kommunikation

### Technische Anforderungen
- Open Source Entwicklung
- Docker-Deployment für die lokale Entwicklung
- Kubernetes Deployment für staging und produktiven Einsatz
- Einfache, intuitive Bedienung der Oberfläche
- kein direkter Zugriff vom Frontend auf die Datenbank, nur über die Backend-Rest-API Schnittstelle

## Entwicklungsanforderungen

### Entwicklungsumgebung
- Docker: Pocketbase, MailPit, Seeder
- Visual Studio Code: Backend, Frontend (zum Entwickeln und Debuggen)
- Domäne: *.rhythm8.local
- Ordner ./deployment/dev

### Stagingumgebung
- Kubernetes: Pocketbase, MailPit, Seeder, Backend, Frontend
- Domäne: *.test.rhythm8.app
- Ordner ./deployment/stage

### Produktivumgebung
- Kubernetes: Pocketbase, MailPit, Seeder, Backend, Frontend
- Domäne: *.rhythm8.app
- Ordner ./deployment/prod
