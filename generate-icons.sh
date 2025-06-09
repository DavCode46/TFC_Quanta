#!/usr/bin/env bash
set -eu

SRC="assets/images/icon-1024.png"
DST="ios/quanta/Images.xcassets/AppIcon.appiconset"

# Define aquí las resoluciones que pide tu Contents.json
# Cada entrada es "baseSize scaleFactor"
# Ejemplo: 20 1 produce 20×20; 20 2 produce 40×40; 29 3 produce 87×87, etc.
declare -a ICONS=(
  "20 1"
  "20 2"
  "20 3"
  "29 1"
  "29 2"
  "29 3"
  "40 1"
  "40 2"
  "40 3"
  "60 2"
  "60 3"
  "76 1"
  "76 2"
  "83.5 2"
  "1024 1"  # App Store
)

# Opcional: Borra viejos PNGs si quieres
# rm -f "$DST"/*.png

for entry in "${ICONS[@]}"; do
  base=$(echo $entry | cut -d' ' -f1)
  scale=$(echo $entry | cut -d' ' -f2)
  # Calcula píxeles exactos (redondea .5)
  px=$(printf "%.0f" "$(echo "$base * $scale" | bc -l)")
  # Genera el nombre igual que espera Contents.json
  filename="icon-${base/@/.}@${scale}x.png"
  echo "Generando $filename → ${px}×${px}px"
  sips -z $px $px "$SRC" --out "$DST/$filename" >/dev/null
done
