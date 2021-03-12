/**
 * @author Carlos Barros
 * @since 11/03/2021
 * @version 1.0.1
 */

class CalculatorController {

    //constructor
    constructor(){
        this.locale = 'pt-BR';
        this._displayEl = document.getElementById("display");
        this._dateEl = document.querySelector("#data");
        this._hourEl = document.querySelector("#hora");
        this._currentDate = new Date();
        this.initialize();
        this.initButtonsEvent();
    }

    //Getters e Setters
    get display(){
        return this._displayEl;
    }

    set display(value){
        this._displayEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        return this._dateEl.innerHTML = value;
    }

    get hour(){
        return this._hourEl.innerHTML;
    }

    set hour(value){
        return this._hourEl.innerHTML = value;
    }

    initialize(){

        this.setDisplayDateTime();

        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);
     
    }

    setDisplayDateTime(){

        this.currentDate = this.currentDate.toLocaleDateString(this.locale, { 
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        this.hour = this.currentDate.toLocaleTimeString(this.locale);
    }

    //Own event
    addEventListenerAll(element, events, fn){
        //transform string in array using a separator
        events.split(', ').forEach( event => {
            element.addEventListener(event, fn, false);
        });
    }

    initButtonsEvent(){

        //seleciona os filhos g de #buttons e #parts
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        
        buttons.forEach( (btn, index ) => {

            this.addEventListenerAll(btn, 'click, drag', event => {
                
                console.log(btn.className.baseVal.replace("btn-", ""));
            });

            this.addEventListenerAll(btn, 'mouseover, mouseup, mousedown', e => {

                btn.style.cursor = 'pointer';
            });
        });
    }
}//end CalculatorController

