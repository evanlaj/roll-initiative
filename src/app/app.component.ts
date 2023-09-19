import { Component, HostListener } from '@angular/core';
import { CharactersService } from './services/characters.service';
import { DEFAULT_CHARACTER_LIST_SIZE } from 'src/models/constants';
import { OptionsService } from './services/options.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public characters: CharactersService, public options: OptionsService) {
    const characterList = JSON.parse(localStorage.getItem('characters'));

    if (characterList && characterList.length > 0)
      this.characters.list = characterList;

    for (let i = 0; i < this.characters.list.length; i++) {
      this.characters.list[i].position = i;
      this.characters.list[i].roll = null;
    }

    while(this.characters.list.length < DEFAULT_CHARACTER_LIST_SIZE)
      this.characters.addCharacter();
  }

  @HostListener('window:unload', ['$event'])
  unloadHandler(event: Event) {    
    if(this.options.saveTeam) {
      const savedCharacters = this.characters.list.filter(character => character.ally);
      localStorage.setItem('characters', JSON.stringify(savedCharacters));
    }
  }
}
