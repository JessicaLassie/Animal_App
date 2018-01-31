import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { AnimalsProvider } from '../../providers/animals/animals';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private currentAnimal;
  public showReorder = false;
  public animals;

  constructor(public navCtrl: NavController, 
              public toastCtrl: ToastController, 
              public animalsProvider: AnimalsProvider) {this.animals = animalsProvider.animals

  }

  /**
   * Choix aleatoire d'un animal si aucun choix préalable
   */
  pickAnimal() {
    let pos;
    let animal;
    // Test si aucun animal n'a encore été choisi
    if (!this.currentAnimal) {
      // Détermination d'une position dans le tableau animals
      pos = Math.floor(Math.random() * this.animals.length);
      // L'animal choisi est l'animal de la position déterminée précédemment
      animal = this.animals[pos];
    } else {
      // L'animal choisi est l'animal courant
      animal = this.currentAnimal;
    }
    return animal;
  }

  /**
   * Lecture du son correspondant à l'animal choisi aleatoirement
   */
  playSound() {
    // Choix d'un animal
    this.currentAnimal = this.pickAnimal();
    // Chargement du son
    let audio = new Audio();
    audio.src = 'assets' + this.currentAnimal.file;
    audio.load();
    // Lecture du son
    audio.play();
  }

  /**
   * Deviner l'animal en fonction de son cri
   */
  guess(animalName) {
    // Test si on a joué un son
    if (this.currentAnimal) {
      // Test si on a choisi le bon animal
      if (animalName == this.currentAnimal.title) {
        // Affichage du toast
        this.presentToast('Gagné !');
        // Reinitialisation du choix pour faire un nouveau jeu
        this.currentAnimal = null;
      } else {
        // Affichage du toast
        this.presentToast('Essaie encore !');
      }
    }
  }

  /**
   * Toast
   */
  presentToast(texte) {
    let toast = this.toastCtrl.create({
      message: texte,
      duration: 2000,
      position: 'middle',
      cssClass: 'styleToast'
    });
    toast.present();
  }

  /**
   * Afficher la page details de l'animal choisi
   */
  goToDetails(animal) {
    this.navCtrl.push(DetailsPage, { data: animal });
  }

}
