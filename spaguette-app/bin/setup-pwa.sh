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

# Percorso dei file generati dalla build
BUILD_FILES="./dist/_expo/static/js/web/entry*.js"
HTML_FILES=$(find ./dist -type f -name "*.html")

# Rileva macOS o Linux e usa la sintassi corretta per sed
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' -E "s|https?://[0-9a-zA-Z.-]*\.ngrok-free\.app|$BACKEND_URL|g; s|http://localhost:[0-9]+|$BACKEND_URL|g; s|http://10.0.2.2:[0-9]+|$BACKEND_URL|g" $BUILD_FILES
else
    sed -i -E "s|https?://[0-9a-zA-Z.-]*\.ngrok-free\.app|$BACKEND_URL|g; s|http://localhost:[0-9]+|$BACKEND_URL|g; s|http://10.0.2.2:[0-9]+|$BACKEND_URL|g" $BUILD_FILES
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
      },
      {
        "src": "/assets/icon-192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "maskable"
      },
      {
        "src": "/assets/icon-512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "maskable"
      }
    ]
}
EOL

echo "> manifest.json creato in ./dist/assets/"

# Copia delle icone nella cartella assets
cp ./assets/pwa/image_192.png ./dist/assets/icon-192.png
cp ./assets/pwa/image_512.png ./dist/assets/icon-512.png
echo "> Icone copiate in ./dist/assets/"

# Copia del service worker
SRC_SW="assets/pwa/service-worker.js"
DEST_SW="dist/service-worker.js"
JS_DIR="dist/_expo/static/js/web"

# Trova il file JavaScript che inizia con "entry-"
ENTRY_JS=$(ls "$JS_DIR" | grep -E '^entry-.*\.js$' | head -n 1)

# Controlla se il file è stato trovato
if [[ -z "$ENTRY_JS" ]]; then
    echo "Errore: Nessun file 'entry-*.js' trovato in $JS_DIR"
    exit 1
fi

# Copia il file e sostituisce il nome del file JS
sed "s|entry-[a-f0-9]*\.js|$ENTRY_JS|g" "$SRC_SW" > "$DEST_SW"

echo "> Service worker copiato e aggiornato in $DEST_SW"


# Aggiunta del manifest in tutti i file HTML dentro dist/
for file in $HTML_FILES; do
    if ! grep -q '<link rel="manifest" crossorigin="use-credentials" href="/assets/manifest.json">' "$file"; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' -E "/<head>/ s|<head>|<head>\n    <link rel=\"manifest\" crossorigin=\"use-credentials\" href=\"/assets/manifest.json\">|" "$file"
        else
            sed -i -E "/<head>/ s|<head>|<head>\n    <link rel=\"manifest\" crossorigin=\"use-credentials\" href=\"/assets/manifest.json\">|" "$file"
        fi
        echo "> Aggiunto <link rel=\"manifest\" href=\"/assets/manifest.json\"> in $file"
    else
        echo "> Il link al manifest.json è già presente in $file"
    fi
done

# Aggiunta dello script per il service worker solo a index.html
INDEX_FILE="./dist/index.html"
if [ -f "$INDEX_FILE" ]; then
    if ! grep -q '<script>\n      if ("serviceWorker" in navigator)' "$INDEX_FILE"; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' -E "/<\/body>/ s|<\/body>|    <script>\n      if (\"serviceWorker\" in navigator) {\n        navigator.serviceWorker.register(\"/service-worker.js\")\n          .then(() => console.log(\"Service Worker Registered\"))\n          .catch((err) => console.error(\"Service Worker Registration Failed\", err));\n      }\n    <\/script>\n<\/body>|" "$INDEX_FILE"
        else
            sed -i -E "/<\/body>/ s|<\/body>|    <script>\n      if (\"serviceWorker\" in navigator) {\n        navigator.serviceWorker.register(\"/service-worker.js\")\n          .then(() => console.log(\"Service Worker Registered\"))\n          .catch((err) => console.error(\"Service Worker Registration Failed\", err));\n      }\n    <\/script>\n<\/body>|" "$INDEX_FILE"
        fi
        echo "> Aggiunto script per il service worker in index.html"
    else
        echo "> Lo script per il service worker è già presente in index.html"
    fi
fi
