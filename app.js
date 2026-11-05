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
let inventaire = [];

function afficherAcceuil() {
  console.log("=========================================================");
console.log("   INVENTAIRE DE LA PÉPINIÈRE");
console.log("   Pépinière pédagogique");
  console.log("=========================================================");
}


async function chargerInventaire(){
  try {
    const donnees = await chargerJson(FICHIER_DONNEES);
    if (!Array.isArray(donnees)){
      throw new Error('le fichier ne contient pas de tableau');
    }

  inventaire = donnees;
  console.log(`${inventaire.length}) espèces(s) chargée(s) depuis ${FICHIER_DONNEES}.`);
  } catch(erreur) {
    inventaire = [];
    console.log("Impossible de lire `${FICHIER_DONNEES} : ${erreur.message}`.L'inventaire démarre vide.");
  }
}

function afficherMenu() {
  console.log('');
console.log("--------------------- MENU ------------------------");
console.log("1. Ajouter un plant");
console.log("2. Lister l'inventaire");
console.log("3. Rechercher (code, nom, groupe)");
console.log("4. Trier (nombre de plants)");
console.log("5. Synthèse des quantités");
console.log("0. Quitter");

}

// choix 1

async function ajouterPlants(){
  console.log("--- Ajouter un plant ---");
const id = await demander("Code du plant (ex. N11) : ");
if ( id === null) return;
const nomCommun = await demander("Nom commun (ex. papayer) : ");
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
  nombrePlants: nombrePlants,
  dateReleve: dateReleve,
};

const erreurs = ajouterPlant(inventaire, saisie);
if (erreurs.length > 0){
  console.log("Ajout refusé : ");
  for (const erreur of erreurs) {
    console.log(`${erreur}`);
  }
  console.log(`L'inventaire compte toujours ${inventaire.length}plant(s).`);
  return
}
await enregistrerJson(FICHIER_DONNEES, inventaire) 
  console.log(`Plant ${id} ajouté. L'inventaire compte ${plants.length} plant(s).`);
}
// choix 2

function lister(){
  console.log(`--- Inventaire(${inventaire.length} espèces(s))---`);
  console.log(listerPlants(inventaire))
}

// choix 3

async function rechercher() {
  console.log('--- Rechercher ---');
  console.log('1. Par code');
  console.log('2. Par nom commun' )
  console.log("3. Les espèces d'un groupe botanique")
  const souschoix = await demander ('Votre choix : ');
  if (souschoix === null)
    return;
  if (souschoix === '1') {
    const reponse = await demander('Code : ');
    if (reponse === null) return;
    const id = reponse.toUpperCase();
    const plant = trouverParId(inventaire, id);
    console.log(plant === undefined ? ` Plant ${id} introuvable.` : formaterPlant(plant));
  }else if (souschoix === '2') {
    const reponse = await demander('Nom ou partie du nom: ');
    if (reponse === null) return;
    const nomCommun = reponse.toLowerCase();
    const recherche = rechercherParNom (inventaire, nomCommun);
    console.log(`${recherche.length} plant(s) par nomCommun${nomCommun} :`);
    console.log(listerPlants(recherche));
  }else if (souschoix === '3') {
    const saisie = await demander(` Groupe ${GROUPES.join(' ou ')} : `);
    if (saisie=== null) return;
    const groupe = reponse.toLowerCase();
    const trouvees = filtrerParGroupe(inventaire, groupe);
    console.log(`${trouvees.length} plant(s) par groupe ${groupe} :`);
    console.log(listerPlants(trouvees));
  } else {
    console.log('Choix inconnu : retour au menu.');

}

}
 // choix 4
  async function trier() {
console.log('--- Trier ---');
console.log('1. Par nombre de plants croissant');
const souschoix = await demander ('Votre choix : ');
  if (souschoix === null) return;

  if (souschoix === '1') {
    console.log(listerPlants(trierParNombrePlants(inventaire)));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }

}

// choix 5
function synthese () {
  console.log(" --- Synthèse de l'inventaire ---");
  const total = totalPlants(inventaire);
  console.log(`Nombre d'espèces : ${inventaire.length}`);
  console.log(`Stock total : ${total} plants`);
  console.log("Par groupe botamique :");
  const synthese = syntheseParGroupe(inventaire);
  for (const [groupe, infos] of Object.entries(synthese)) {
    console.log(`${groupe} : ${infos.especes} espèce(s), ${infos.plants} plants`);
  }


  const abondante = 
  especeLaPlusAbondante(inventaire);
  if (abondante) {
    console.log(`Espèce la plus abondante : ${formaterPlant(abondante)}`);

  }else {
    console.log("Espèce la plus abondante : aucune donnée");
  }
const faibles = stocksFaibles(inventaire, SEUIL_STOCK_FAIBLE);
console.log(`Stocks faibles ( <= ${SEUIL_STOCK_FAIBLE} plants : ${faibles.length}.)`);
for (const plant of faibles) {
  console.log(`  ${formaterPlant(plant)}`);
  
}
console.log("Rappel : le seuil de 10 plants est un répère pédagogique de suivi, pas une recommandation de production.");

}

async function main() {
  ouvrirSaisie();
  afficherAcceuil(); 
  await chargerInventaire();

let quitter = false;
while (!quitter) {
  afficherMenu ();
  const choix = await demander ("Votre choix : ");
  if(choix === null) {
    quitter = true;
    break;
  }
 try {
    switch (choix){
      case "1":
        await ajouterPlants();
         break;
         case "2":
          await lister();
          break;
          case "3":
            await rechercher();
            break;
            case "4":
              await trier();
            break;
            case "5":
              await synthese();
              break;
              case"0":
              quitter = true;
              break;
              default:
                console.log(`Choix incoonu : << ${choix}. Tapez un chiffre du menu.`);
                }
                } catch(erreur) {
     if(erreur.message.startsWith("TODO")) {
     console.log(`${erreur.message}`);
                } else {
                  console.log(`Erreur inattendue : A completer ${erreur.message}`);
                }
              }
            }
          }
console.log("Au revoir !");


  fermerSaisie();
  

main();