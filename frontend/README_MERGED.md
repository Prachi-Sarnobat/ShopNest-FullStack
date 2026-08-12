# Merged Full-Stack E-commerce Project

This version keeps the existing Django + Django REST Framework backend and merges the stronger visual direction from the previous React e-commerce frontend.

## Structure
- `backend/` — existing Django/DRF backend; intentionally preserved.
- `frontend/` — React/Vite storefront with merged UI.

## Frontend highlights
- Modern ecommerce navbar and search
- Hero, categories, promotional banners and feature section inspired by the previous frontend
- Products loaded from the Django API
- Product search/filter UI
- Product details
- Backend-powered cart
- Backend-powered order creation
- Responsive layout

## Run
### Backend
```bash
cd backend
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend expects `VITE_DJANGO_BASE_URL=http://localhost:8000/` in `frontend/.env`.
