export default
class Button {
    constructor (buttonParameters) {
        const button = document.createElement('div');
        button.innerHTML = buttonParameters.small;
        button.classList.add("button");       
        button.id = `${buttonParameters.keyCode}`;
        if (buttonParameters.specialClass) {
            button.classList.add("special");
            button.classList.add(buttonParameters.specialClass);    
        }     
        this.btn = button;     
        this.btnPar = buttonParameters;

        button.addEventListener('mousedown', this.getPress);       
        button.addEventListener('mouseup', this.getUnPress); 
        button.addEventListener('mouseleave', this.getUnPress);       
        return this;
    }  
    
    getPress (event) {                          
        event.currentTarget.classList.add('active');                         
    }
    getUnPress (event) {                          
        event.currentTarget.classList.remove('active');                 
    }  
    
}