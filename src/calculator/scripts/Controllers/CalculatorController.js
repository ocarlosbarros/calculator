/**
 * @author Carlos Barros
 * @since 15/03/2021
 * @version 1.0.2
 */

class CalculatorController {

    //constructor
    constructor(){
        this._operation = [];
        this._locale = 'pt-BR';
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

        this.setLastNumberToDisplay();
    }

    setDisplayDateTime(){

        this.currentDate = this.currentDate.toLocaleDateString(this._locale, { 
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        this.hour = this.currentDate.toLocaleTimeString(this._locale);
    }

    //Own event
    addEventListenerAll(element, events, fn){
        //transform string in array using a separator
        events.split(', ').forEach( event => {
            element.addEventListener(event, fn, false);
        });
    };

    clearAll(){
        this._operation = [];
        this.setLastNumberToDisplay();
    }

    cancelEntry(){
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    getLastOperation(){

        return this._operation[this._operation.length - 1];
    }

    setLastOperation( value ){

        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value){
        
        return ( ['+', '-', '*', '/', '%'].indexOf(value) > -1 ); 
        
    }

    performCalculation(){

        let last = '';
        if (this._operation.length > 3){

            last = this._operation.pop();
        }
        let result = eval(this._operation.join(""));

        if ( last == '%' ){

            result /= 100;

            this._operation = [result];
        }
        else
            {

                this._operation = [result];
            }

        this.setLastNumberToDisplay();

        if (last) this._operation.push(last);
    }

    pushOperation(value){

        this._operation.push(value);

        if  ( this._operation.length > 3 )
        {
            this.performCalculation()
        }
    }

    setLastNumberToDisplay(){

        let lastNumber;

        for( let i = this._operation.length - 1; i >= 0; i-- ){

            if ( !this.isOperator(this._operation[i]))
            {
                lastNumber = this._operation[i];
                break;
            }
        }

        if ( !lastNumber ) lastNumber = 0;

        this.display = lastNumber;
    }

    addOperation( value ){

        if (    isNaN( this.getLastOperation() ) )
        {
            //string
            if( this.isOperator(value) )
            {
                this.setLastOperation(value);
            }
            else if ( isNaN(value) ){

                }
                else
                    {
                        this.pushOperation(value);
                        this.setLastNumberToDisplay();
                    }
        }else if ( this.isOperator(value) )
                {
                    this.pushOperation(value);
                }
                else
                    {
                    //number
                    let newValue = this.getLastOperation().toString() + value.toString();
                    this.setLastOperation(parseInt(newValue));

                    this.setLastNumberToDisplay();
                    }
    }

    setError(){
        this.display = "Error";
    }

    execBtn( valueButton ){

        switch( valueButton ){

            case 'ac':
            this.clearAll();
                break;

            case 'ce':
            this.cancelEntry();
                break;

            case 'soma':
                this.addOperation('+');
                break;

            case 'subtracao':
                this.addOperation('-');
                break;

            case 'multiplicacao':
                this.addOperation('*');
                break;
            
            case 'divisao':
                this.addOperation('/');
                break;

            case 'porcento':
                this.addOperation('%');
                break;

            case 'ponto':
                this.addOperation('.');
                break;

            case 'igual':
                this.performCalculation();
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            this.addOperation(parseInt(valueButton));
                break;

            default:
            this.setError();
                break;
        }
    }

    initButtonsEvent(){

        //seleciona os filhos g de #buttons e #parts
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        
        buttons.forEach( (btn, index ) => {

            this.addEventListenerAll(btn, 'click, drag', event => {
                
                let textBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn, 'mouseover, mouseup, mousedown', e => {

                btn.style.cursor = 'pointer';
            });
        });
    }
}//end CalculatorController

