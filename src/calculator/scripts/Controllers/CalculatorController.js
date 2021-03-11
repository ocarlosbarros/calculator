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
}//end CalculatorController

