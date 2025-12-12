# --- STAGE 1: The "Builder" ---
FROM node:20-slim AS builder

WORKDIR /app

# Copiamo i file di dipendenze (relativo alla root della monorepo)
COPY spaguette-app/package.json spaguette-app/package-lock.json ./

# Installiamo le dipendenze
RUN npm install

# Copiamo il resto del codice sorgente
COPY spaguette-app/ ./

# --- [!! ACTION REQUIRED !!] ---
# Eseguiamo il build script.
# Se usi Expo: spesso è "npx expo export -p web" (crea cartella 'web-build')
# Se usi React Native CLI / Webpack: spesso è "npm run build" (crea cartella 'build' o 'dist')
RUN npx expo export --platform web

# --- STAGE 2: The "Web Server" (Nginx) ---
# Usiamo Nginx per servire i file statici. È molto più leggero di Node.
FROM nginx:alpine

# Rimuoviamo la configurazione di default di Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiamo la nostra configurazione custom
COPY spaguette-app/nginx.conf /etc/nginx/conf.d/default.conf

# --- [!! ACTION REQUIRED !!] ---
# Copiamo i file compilati dallo stage precedente.
# VERIFICA: Se usi Expo, la cartella di output è solitamente 'web-build'.
# Se usi Create React App, è 'build'. Se usi Vite, è 'dist'.
# Esempio per Expo:
COPY --from=builder /app/dist /usr/share/nginx/html

# Esempio se fosse standard React:
# COPY --from=builder /app/build /usr/share/nginx/html

# Esponiamo la porta 80 (standard HTTP)
EXPOSE 80

# Avvia Nginx
CMD ["nginx", "-g", "daemon off;"]