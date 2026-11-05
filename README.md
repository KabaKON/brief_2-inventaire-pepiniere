# Inventaire de la pépinière

> Projet individuel du SAS DFS, brief 2 (sujet : [SUJET.md](SUJET.md)). Remplacez chaque ✏️ par votre texte, puis supprimez cette ligne.

## Contexte
 Cet outil est destiné au gérant d'une pépinière, qui suit ses jeunes plants au quotidien. Il a besoin de savoir vite ce qu'il a en stock et ce manque. Il savait le code, un nom, un groupe botamique, un nombre de plants et une date. Le programme lui affiche l'inventaire, les résultats de recherche et de tri, et une synthèse. L' outil ne gère ni les prix, ni les ventes, ni les décisions de production.


## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-2-inventaire-pepiniere.git
cd brief-2-inventaire-pepiniere
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

✏️ *Cochez seulement ce qui marche : `- [x]`.*

- [X] Données lues et enregistrées dans `donnees/plants.json`
- [X] Ajouter un plant, saisies invalides refusées sans arrêter le programme
- [X] Lister l'inventaire, message si l'inventaire est vide
- [X] Rechercher par code ou par nom ; filtrer par groupe botanique
- [X] Trier par nombre de plants
- [X] Synthèse : stock total, espèces et plants par groupe, espèce la plus abondante, stocks faibles (≤ 10 plants)
- [ ] Bonus : supprimer et modifier un plant (choix 6 et 7)
- [ ] Bonus : tri décroissant, groupe le plus fourni

## Données

✏️ *Le fichier, le nombre de lignes, les champs (voir [docs/dictionnaire-donnees.md](docs/dictionnaire-donnees.md)), l'unité. Rappelez qu'elles sont fictives et que les groupes sont fournis par le coach.*

## Limites

✏️ *Au moins trois. Par exemple : le seuil de 10 plants est un repère de suivi, pas une recommandation de production.*

## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

✏️ *Prénom KABA , KabaKON. Entraide : Kamagate Abdallah et Anglovia konan, compréhesnion de l'exercice et l'app.js
