# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique | texte | non vide, absent des données | — | N09 |
|nomCommun |Nom de l'espèce |texte |non vide |- |pin |
| groupe | Groupe botamique |texte |dans la liste autorisée |- |gymnosperme |
|nombrePlants |Nombre de plants |nombre entier |positif ou nul |- |8 |
| datReleve |Date du relevé |date |AAAA/MM/JJ | |2026-10-24 |

**Listes de valeurs autorisées** : groupe : angiosperme ou gymnosperme

**Sources** : donnees-test.json

