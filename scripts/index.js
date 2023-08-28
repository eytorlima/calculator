const btn0 = document.querySelector(".b0");
const btn1 = document.querySelector(".b1");
const btn2 = document.querySelector(".b2");
const btn3 = document.querySelector(".b3");
const btn4 = document.querySelector(".b4");
const btn5 = document.querySelector(".b5");
const btn6 = document.querySelector(".b6");
const btn7 = document.querySelector(".b7");
const btn8 = document.querySelector(".b8");
const btn9 = document.querySelector(".b9");
const btnPoint = document.querySelector(".bpoint");
const btnEqual = document.querySelector(".bequal");

const btnAC = document.querySelector(".clear");
const btnDel = document.querySelector(".bdel");
const btnDivision = document.querySelector(".bdivision");
const btnMultiplier = document.querySelector(".bmultiplier");
const btnMinus = document.querySelector(".bminus");
const btnPlus = document.querySelector(".bplus");

const input = document.querySelector(".input");
const subTotal = document.querySelector(".subtotal");

//Array com todos os botões de 0 a 9.
const btnValues = [btn0, btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9];
//Array para os botões de operações.
const btnOperations = [btnDivision, btnMultiplier, btnMinus, btnPlus];
//Variável global para adicionar o valor do click de cada botão.
var num;
//Variável global para guardar o resultado das contas
var resultado;

var flag = 0;
var flagP = 0;

btnEqual.addEventListener("click", showResult);

function showResult(){
    subTotal.style.display = 'none';

    input.textContent = resultado;
    flag = 1;
}

function funCalcula(){
    let exp = input.textContent;
    let b = (input.textContent.length)-1;

    if(exp.lastIndexOf('/') == b || exp.lastIndexOf('x') == b || exp.lastIndexOf('+') == b || exp.lastIndexOf('-') == b){
        exp = exp.substring(0, exp.length - 1);
    }

    while (exp.indexOf('x') !== -1) {
        exp = exp.replace('x', '*');
    };
    resultado = eval(exp);
}

//Botão Clear All, limpa o input principal. 
//Se o conteúdo do input for igual a 0 o num recebe vazio, do contrário +
//+ recebe clear. Evita o bug de inserir 'clear' na tela do input principal.
btnAC.addEventListener("click", () =>{
    if(input.textContent === 0){
        num = '';
    } else {
        num = 'clear';
    }
    changeInput();
})

//Botão Del, verifica se o conteúdo do input não é vazio para rodar. Recebe o valor do input, subtrai o último dígito da string.
//Verifica se o tamanho da string é igual a zero (apenas um dígito) para retornar num = vazio,
//Chama apenas a função de alterar subtotal pois já altera os valores de modo global.
btnDel.addEventListener("click", () =>{  
    if(flag == 1){
        input.textContent = '';
        resetCalculator();
    }
    if(input.textContent != ''){
        num = input.textContent;
        num = num.substring(0, num.length - 1);
        if(num.length == 0){
            num = '';
        }
        
        input.textContent = num;
        changeSubTotal();
    }
})

//Loop for para percorrer o array dos botões de 0 a 9. Num recebe a posição no array do botão clicado identificado pelo índice i.
for(let i = 0; i < btnValues.length; i++){
    btnValues[i].addEventListener("click", () => {
        if(flag == 1){
            input.textContent = '';
            resetCalculator();
            num = i;
            changeInput();
        } else{
            num = i;
            changeInput();
        }
    })
    
}

//loop para receber os botões de operações.
for(let i = 0; i < btnOperations.length; i++){
    btnOperations[i].addEventListener("click", () => {
        switch (i){
            case 0:
                num = '/';
                break;
            case 1:
                num = 'x';
                break;
            case 2:
                num = '-';
                break;
            case 3:
                num = '+';
                break;
        }

        let a = input.textContent;
        let b = (input.textContent.length)-1;

        if(a.lastIndexOf('/') == b){
            num = '';
        } else if(a.lastIndexOf('x') == b){
            num = '';
        } else if(a.lastIndexOf('-') == b){
            num = '';
        } else if(a.lastIndexOf('+') == b){
            num = '';
        } else if(a.lastIndexOf('.') == b){
            num = '';
        }
        

        if(num != ''){
            flagP = 1;
        }
        resetCalculator();
        changeInput();
    })
}

//Botão point, adiciona uma casa decimal ao input, verifica se o conteúdo do input é vazio para adicionar 0 antes do ponto.
//Loop for para percorrer a string do input e verificar se já existe um ponto na string, se sim, retorna num = vazio.
btnPoint.addEventListener("click", () => {
    num = '.';
    let a = input.textContent;

    if(a === ''){
        num = '0.';
    } else if (true){
        let b = (input.textContent.length)-1;
        if(a.lastIndexOf('/') == b){
            num = '';
        } else if(a.lastIndexOf('x') == b){
            num = '';
        } else if(a.lastIndexOf('-') == b){
            num = '';
        } else if(a.lastIndexOf('+') == b){
            num = '';
        } else if(a.lastIndexOf('.') == b){
            num = '';
        }
    }

    for(let i = 0; i < a.length; i++){
        if(a[i] === '.' && flagP < 1){
            num = '';
        }
    }

    flagP = 0;
    changeInput();
});

//While verdadeiro para verificar sempre.
//Verifica se num é diferente de ponto, vazio e clear, se sim, roda um loop for percorrendo o tamanho da string input
//Verifica se há um ponto na string input, se sim, verifica se o tamanho da string é maior que a posição do índice i + 10,
//Ou seja, impede a inserção de mais de 10 casas decimais, recebe num vazio para além disso.
function changeInput(){
    while(true){
        if(num != '.' && num != '' && num != 'clear'){
            for(let i = 0; i < input.textContent.length; i++){
                if(input.textContent[i] === '.'){
                    if(input.textContent.length > i + 10){
                        window.alert("Excesso de números atingido!");
                        num = '';
                    }
                }
            }
        }
        break;
    }

    if(innerWidth > 560){
        var tamanhoTela = 20;
    } else if(innerWidth <= 560){
        var tamanhoTela = 15;
    }

    //Se o input for igual a 0, verifica se o num é diferente de um ponto, se for, input recebe num.
    //Se num for igual a um ponto, input recebe o valor que já possui acrescido de num.

    //Em seguida, verifica se o tamanho da string input é maior que 22 dígitos, se sim, verifica se num é diferente de clear.
    //Se num for diferente de clear, input recebe o mesmo valor que já possui.
    //Se num for igual a clear, input recebe o valor vazio.

    //Verifica se num é igual a clear, em seguida, limpa o input.
    //Se passar por todas as verificações, input recebe o valor que já possui, acrescido de num.
    if(input.textContent == '0'){
        if(num != '.'){
            input.textContent = num;
        } else if(num == '.'){
            input.textContent += num;
        }
    } else if(input.textContent.length > tamanhoTela){
        if(num != 'clear'){
            input.textContent = input.textContent;
        } else if(num === 'clear'){
            input.textContent = '';
        } 
    } else if(num === 'clear'){
        input.textContent = '';
    } else {
        input.textContent += num;
    }

    changeSubTotal();
}

//Function para que o subtotal receba o valor do input.
function changeSubTotal(){
    subTotal.textContent = input.textContent;
    funCalcula();
    subTotal.textContent = resultado;
}

function resetCalculator(){
    flag = 0;
    subTotal.textContent = input.textContent;
    subTotal.style.display = 'flex';
}