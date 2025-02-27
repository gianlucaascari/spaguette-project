#!/bin/bash

# Trova gli URL da ngrok
BACKEND_URL=$(curl -s http://127.0.0.1:4040/api/tunnels | jq -r '.tunnels[] | select(.name=="back-end") | .public_url')
FRONTEND_URL=$(curl -s http://127.0.0.1:4040/api/tunnels | jq -r '.tunnels[] | select(.name=="front-end") | .public_url')

# Controlla se gli URL sono stati trovati
if [ -z "$BACKEND_URL" ]; then
    echo "> Errore: Nessun tunnel trovato con il nome 'back-end'. Assicurati che ngrok sia avviato."
    exit 1
fi

if [ -z "$FRONTEND_URL" ]; then
    echo "> Errore: Nessun tunnel trovato con il nome 'front-end'. Assicurati che ngrok sia avviato."
    exit 1
fi

echo "> Nuovo URL back-end: $BACKEND_URL"
echo "> Nuovo URL front-end: $FRONTEND_URL"

# Percorso del file generato dalla build (modifica se necessario)
BUILD_FILE="./dist/_expo/static/js/web/entry*.js"
INDEX_FILE="./dist/index.html"

# Rileva macOS o Linux e usa la sintassi corretta per sed
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' -E "s|https://[0-9a-zA-Z.-]*\.ngrok-free\.app|$BACKEND_URL|g; s|localhost:4000|$BACKEND_URL|g; s|10.0.2.2:4000|$BACKEND_URL|g" $BUILD_FILE
else
    sed -i -E "s|https://[0-9a-zA-Z.-]*\.ngrok-free\.app|$BACKEND_URL|g; s|localhost:4000|$BACKEND_URL|g; s|10.0.2.2:4000|$BACKEND_URL|g" $BUILD_FILE
fi

# Creazione della cartella assets se non esiste
mkdir -p ./dist/assets

# Creazione del manifest.json
cat > ./dist/assets/manifest.json <<EOL
{
    "name": "Spaguette",
    "short_name": "Spaguette",
    "description": "A collaborative shopping list app",
    "start_url": "/index.html",
    "display": "standalone",
    "background_color": "#ffffff",
    "icons": [
      {
        "src": "/assets/icon-192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/assets/icon-512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ]
}
EOL

echo "> manifest.json creato in ./dist/assets/"

# Copia delle icone nella cartella assets
cp ./assets/images/icon.png ./dist/assets/icon-192.png
cp ./assets/images/icon.png ./dist/assets/icon-512.png

echo "> Icone copiate in ./dist/assets/"

# Aggiunta del manifest nel file index.html se non esiste già
if [ -f "$INDEX_FILE" ]; then
    # Aggiunta del manifest nel file index.html se non esiste già
    if ! grep -q '<link rel="manifest" href="/assets/manifest.json">' "$INDEX_FILE"; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' -E "/<head>/ s|<head>|<head>\n    <link rel=\"manifest\" href=\"/assets/manifest.json\">|" "$INDEX_FILE"
        else
            sed -i -E "/<head>/ s|<head>|<head>\n    <link rel=\"manifest\" href=\"/assets/manifest.json\">|" "$INDEX_FILE"
        fi
        echo "> Aggiunto <link rel=\"manifest\" href=\"/assets/manifest.json\"> in $INDEX_FILE"
    else
        echo "> Il link al manifest.json è già presente in $INDEX_FILE"
    fi
else
    echo "> Attenzione: il file $INDEX_FILE non esiste. Nessuna modifica effettuata."
fi
