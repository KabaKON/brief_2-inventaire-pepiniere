// Inventaire de la pépinière — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { GROUPES, ajouterPlant, formaterPlant, listerPlants, trouverParId } from './src/registre.js';
import { filtrerParGroupe, rechercherParNom, trierParNombrePlants } from './src/recherche.js';
import { SEUIL_STOCK_FAIBLE, especeLaPlusAbondante, stocksFaibles, syntheseParGroupe, totalPlants } from './src/synthese.js';

const FICHIER_DONNEES = 'donnees/plants.json';
//chargerJson(FICHIER_DONNEES)
let Plant = [];

function afficherAcceuil() {
  console.log("=========================================================");
console.log("           INVENTAIRE DE LA PÉPINIÈRE                     ");
console.log("           Pépinière pédagogique");
console.log("===========================================================");
}


async function chargerInventaire(){
  try {
    const donnees = await chargerJson(FICHIER_DONNEES);
    if (!Array.isArray(donnees)){
      throw new Error('le fichier ne contient pas de tableau');
    }

  plants = donnees;
  console.log(`${especes.length}) espèces(s) chargée(s) depuis ${FICHIER_DONNEES}.`);
  } catch(erreur) {
    plants = [];
    console.log("Impossible de lire `${FICHIER_DONNEES} : ${erreur.message}`.L'inventaire démarre vide.");
  }
}

function afficherMenu() {
  console.log('');
console.log("--------------------- MENU ---------------------");
console.log("1. Ajouter un plant");
console.log("2. Lister l'inventaire");
console.log("3. Rechercher (code, nom, groupe)");
console.log("4. Trier (nombre de plants)");
console.log("5. Synthèse des quantités");
console.log("0. Quitter");

}

// choix 1

async function ajouterPla(){
  console.log("---- Ajouter un plant ----");
const id = await demander("Code du plant (ex. N11) : ");
if ( id === null) return;
const NomCommun = await demander("Nom commun (ex. papayer) : ");
if (nomCommun === null) return;
const groupe = await demander("Groupe botanique (angiosperme ou gymnosperme) : ");
if (groupe === null) return;
const nombrePlants = await demander("Nombre de plants (entier) : ");
if (nombrePlants === null) return;
const dateReleve = await demander("Date du relevé (AAAA-MM-JJ) : ");
if (dateReleve === null) return;

const saisie = {
  id: id.toUppercase(),
  nomCommun: nomCommun.toLowercase(),
  groupe: groupe.toLowercase(),
};

const erreurs = ajouterPlant(plants, saisie);
if (erreurs.length > 0){
  console.log("Ajout refusé : ");
  for (const erreur of erreurs) {
    console.log(` ${erreur}`);
  }
  console.log(`L'inventaire compte toujours) ${plants.length}) plant(s).`);
  return
}
await enregistrerJson(FICHIER_DONNEES, enregistrements) 
  console.log(`Plants ${saisie.id} ajoutée. L'inventaire compte ${plants.length} plant(s).`);
}
// choix 2

function lister(){
  console.log()
}

// choix 3

async function rechercher(plants) {
  console.log('--- Rechercher ---');
  console.log('1.Par code');
  console.log('2.Par nom commun' )
  console.log("3.Les espèces d'un groupe botanique")
  const souschoix = await demander (' Votre choix : ');
  if (souschoix === null)
    return;
  if (souschoix === '1') {
    const reponse = await demander('Code : ');
    if (reponse === null) return;
    const id = reponse.toUpperCase();
    const plant = trouverParId(plants, id);
    console.log(plant === undefined ? ` Plant ${id} introuvable.` : formaterPlant(plant));
  }else if (souschoix === '2') {
    const reponse = await demander('nom commun: ');
    if (reponse === null) return;
    const nomCommun = reponse.toLowerCase();
    const recherche = rechercherParNom (plants, texte);
    console.log(`${recherche.length} plant(s) par nomCommun${nomCommun} :`);
    console.log(listerPlants(recherche));
  }else if (souschoix === '3') {
    const reponse = await demander('les espèces de groupe botamique');
    if (reponse === null) return;
    const groupe = reponse.toLowerCase();
    const trouvées = filtrerParGroupe(plants, groupe);
    console.log(`${trouvées.length} plant(s) par groupe ${groupe} :`);
    console.log(listerPlants(groupe));
  } else {
    console.log('Choix inconnu : retour au menu.');

}

}
 // choix 4
  async function trier() {
console.log(' --- Trier --- ');
console.log('1. Par nombre de plants croissant')
const souschoix = await demander (' Votre choix : ');
  if (souschoix === null) return;

  if (souschoix === '1'); {
    console.log(listerPlants({trierParNombrePlants}));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }

  }
  





























































































































































listerPlants
















































  const choix = await demander('Votre choix : '); 


async function main() {
  ouvrirSaisie();
  console.log("À compléter : écrivez le menu dans app.js (fiches/3-ajouter-lister.md).");
  fermerSaisie();
}

main();
