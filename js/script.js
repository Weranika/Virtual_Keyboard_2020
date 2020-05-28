import elementsEn from './lang_En.js';
import elementsRu from './lang_Ru.js';
import Button from './button.js';

const textareaId = 'text-area';

class Keyboard {
    constructor() {
        this.arrLang = [elementsEn, elementsRu];
        this.curLangIndex = 0;
        this.main = document.createElement('main');
        this.textarea = document.createElement('textarea');   
        this.mainContainer = document.createElement('div'); 
        this.keyArr = []; 
        this.handlers = this.generateHandlers();
        this.isCapsPressed = false;     
        
        if (localStorage.getItem('langInd')) {
            this.curLangIndex = localStorage.getItem('langInd');
        } else {
            localStorage.setItem('langInd', this.curLangIndex);
        }
        this.lang = this.arrLang[this.curLangIndex];
        this.createButtons(this.lang);
    }

    createButtons (buttonsArr) {
        for (let i = 0; i < buttonsArr.length; i++) {
            const rowContainer = document.createElement('div');
            rowContainer.classList.add("row-container");   
            this.mainContainer.appendChild(rowContainer);       
            buttonsArr[i].forEach(btnObject => {
                const button = new Button(btnObject);              
                button.btn.addEventListener('mousedown', this.getHandler(btnObject.keyCode));
                rowContainer.append(button.btn);                
                this.keyArr.push(button);
            });
        }     
    }

    createElements () {
        this.textarea.classList.add("text-area");    
        this.textarea.id = textareaId;    
        this.main.appendChild(this.textarea);  
        this.textarea.placeholder = 'Press Ctrl + Alt for change language';
        this.mainContainer.classList.add("main-container");
        this.main.appendChild(this.mainContainer);          
        document.body.appendChild(this.main);    
        this.textarea.focus();
        return this;
    }

    changeLang () {        
        if (this.curLangIndex === 0) { 
            this.curLangIndex = 1;            
        } else {
            this.curLangIndex = 0;
        }
        localStorage.setItem('langInd', this.curLangIndex);

        this.lang = this.arrLang[this.curLangIndex];
        this.keyArr.length = 0;
        this.mainContainer.innerHTML = '';
        this.createButtons(this.lang);
    }

    generateHandlers() {
        const map = new Map();
        map.set('Enter', (event) =>{
            this.textarea.value += '\n';
        });
        map.set('Backspace', (event) =>{
            this.textarea.value = this.textarea.value.slice(0, -1); 
        });
        map.set('Tab', (event) =>{
            this.textarea.value += '\t';
        });
        map.set('Space', (event) =>{
            this.textarea.value += ' ';
        });
        map.set('CapsLock', (event) =>{
            const filter = el => el.btnPar.keyCode.startsWith('Key');

            if (this.isCapsPressed) {
                this.isCapsPressed = false;
                this.toggleToLowerCase(filter);
            }  else {
                this.isCapsPressed = true;
                this.toggleToUpperCase(filter);   
            }
        });
        map.set('ShiftLeft', (event) =>{
            if (this.isCapsPressed) {
                this.isCapsPressed = false;
                this.toggleToLowerCase();
            }  else {
                this.isCapsPressed = true;
                this.toggleToUpperCase();   
            }
        });
        map.set('ShiftRight', (event) =>{
            if (this.isCapsPressed) {
                this.isCapsPressed = false;
                this.toggleToLowerCase();
            }  else {
                this.isCapsPressed = true;
                this.toggleToUpperCase();   
            }
        });
        map.set('Delete', (event) =>{
            this.textarea.value += ''; 
            }            
        );
        map.set('Win', (event) =>{
            this.textarea.value += ''; 
            }            
        );
        map.set('ControlLeft', (event) =>{
            this.textarea.value += ''; 
            }            
        );
        map.set('ControlRight', (event) =>{
            this.textarea.value += ''; 
            }            
        );
        map.set('AltLeft', (event) =>{
            this.changeLang(); 
            }     
        );
        map.set('AltRight', (event) =>{
            this.changeLang(); 
            }            
        );
        map.set('default', (event) =>{
            event.preventDefault();
            this.textarea.value += event.currentTarget.innerHTML;
            document.getElementById(textareaId).focus();
        })
        return map;
    }
    getHandler(keyCode){
        return this.handlers.get(keyCode) ? this.handlers.get(keyCode) : this.handlers.get('default');
    }    

    toggleToUpperCase (filter = el => true) {
        this.keyArr.filter(filter).forEach((el) => el.btn.innerHTML = el.btnPar.upper);       
    }

    toggleToLowerCase (filter = el => true) {
        this.keyArr.filter(filter).forEach((el) => el.btn.innerHTML = el.btnPar.small);          
    }
    
    addEventKey () {    
        document.body.addEventListener('keydown', (event) => {
            let foundButton = document.getElementById(event.code); 
            foundButton.classList.add('active');        
            if (event.code === 'CapsLock' ) {
                this.handlers.get('CapsLock')();
            } 
            if (event.code === 'ShiftRight' || event.code === 'ShiftLeft') {
                this.handlers.get('ShiftRight')();
            }
            if (event.code === 'AltRight' || event.code === 'AltLeft') {
                this.handlers.get('AltRight')();
            }
        });
        document.body.addEventListener('keyup', (event) => {
            let foundButton = document.getElementById(event.code);
            foundButton.classList.remove('active');        
        });                     
        return this;
    }        
        
    createKeyboard() {
        this.createElements().addEventKey();
    }   
}

const keyboard = new Keyboard();
keyboard.createKeyboard();