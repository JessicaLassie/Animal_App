import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { POINTER_EVENT_TYPE_MOUSE } from 'ionic-angular/gestures/pointer-events';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animals = [
    {
      'title': 'Vache',
      'image': 'imgs/animals/cow-icon.png',
      'desc': 'Meugle',
      'file': '/sounds/cow.mp3',
      'playing': false
    },
    {
      'title': 'Dauphin',
      'image': 'imgs/animals/dolphin-icon.png',
      'desc': 'Siffle',
      'file': '/sounds/dolphin.mp3',
      'playing': false
    },
    {
      'title': 'Grenouille',
      'image': 'imgs/animals/frog-icon.png',
      'desc': 'Coasse',
      'file': '/sounds/frog.mp3',
      'playing': false
    },
    {
      'title': 'Oiseau',
      'image': 'imgs/animals/bird-icon.png',
      'desc': 'Chante',
      'file': '/sounds/bird.mp3',
      'playing': false
    },
    {
      'title': 'Cochon',
      'image': 'imgs/animals/pig-icon.png',
      'desc': 'Grogne',
      'file': '/sounds/pig.mp3',
      'playing': false
    },
    {
      'title': 'Chien',
      'image': 'imgs/animals/puppy-icon.png',
      'desc': 'Aboie',
      'file': '/sounds/dog.mp3',
      'playing': false
    },
    {
      'title': 'Chat',
      'image': 'imgs/animals/black-cat-icon.png',
      'desc': 'Miaule',
      'file': '/sounds/cat.mp3',
      'playing': false
    },
    {
      'title': 'Cheval',
      'image': 'imgs/animals/horse-icon.png',
      'desc': 'Hennit',
      'file': '/sounds/horse.wav',
      'playing': false
    },
    {
      'title': 'Ane',
      'image': 'imgs/animals/donkey-icon.png',
      'desc': 'Brait',
      'file': '/sounds/donkey.wav',
      'playing': false
    }
  ];

  private currentAnimal;
  public result: string;
  public showReorder = false;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

  }

  /**
   * Choix aleatoire d'un animal
   * si aucun choix préalable
   */
  pickAnimal() {
    let pos;
    let animal;
    if (!this.currentAnimal) {
      pos = Math.floor(Math.random() * this.animals.length);
      animal = this.animals[pos];
    } else {
      animal = this.currentAnimal;
    }
    return animal;
  }

  /**
   * Lecture d'un son
   */
  playSound() {
    this.result = "";
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
        this.presentToast('Gagné !');
        // Reinitialisation du choix pour faire un nouveau jeu
        this.currentAnimal = null;
      } else {
        this.presentToast('Essaie encore !');
      }
    }
  }

  presentToast(texte) {
    let toast = this.toastCtrl.create({
      message: texte,
      duration: 2000,
      position: 'middle',
      cssClass: 'styleToast'
    });
    toast.present();
  }

}
