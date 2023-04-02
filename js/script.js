// Get user's name and user level

let userName = localStorage.getItem('userName');
let userLevel = localStorage.getItem('userLevel');

// Pages

const registerPage = document.querySelector('.register-form');
const chooseLevelPage = document.querySelector('.choose-level');
const answerPage = document.querySelector('.answer-page');
const winnerPage = document.querySelector('.winner-page');
const loserPage = document.querySelector('.loser-page');

// Elements

// First page

const nameInput = document.querySelector('#name');
const registerBtn = document.querySelector('#register');

// Second page 

const playButton = document.querySelector('#play');

// Answer

const answerButton = document.getElementsByClassName('.answer');

// Disable all pages at the beginning

chooseLevelPage.style.display = 'none';
answerPage.style.display = 'none';
winnerPage.style.display = 'none';
loserPage.style.display = 'none';

// We should change the title based on the page

function setTitle(value){
    const title = document.querySelector('.title');
    title.innerText = value;
}

// Register

registerBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    if(nameInput.value === '' && userName === '') {
        alert('Please add your name!');
    }else{
        setTitle('Choose your level!')
        localStorage.setItem('userName', nameInput.value);
        registerPage.style.display = 'none';
        chooseLevelPage.style.display = 'block';
    }
})

// Choose level

function chooseLevel(level){
    localStorage.setItem('userLevel', level);
}

function answer(ans){
    localStorage.setItem('answer', ans);
}

function playOneRound(question){
    let score = 0;
    setTitle(question.question);
    let ans = document.getElementsByClassName('answer');
    for(let i = 0;i<question.answers.length;i++){
        ans[i].innerHTML = question.answers[i];
    }
    let result = checkTheAnswer(question.CorrectAnswer);
    return score+result;
}

function checkTheAnswer(realAnswer){
    let answer = localStorage.getItem('answer');
    if(answer === realAnswer){
        answerButton.style.border = "2px solid #0B8F60";
        return 1;
    }else{
        answerButton.style.border = "2px solid red";
        return 0;
    }
}

playButton.addEventListener('click', (e)=> {
    e.preventDefault();
    if(userLevel === ''){
        alert('Please select your level!')
    }else{
        answerPage.style.display = 'block';
        chooseLevelPage.style.display = 'none';
        location.href = '#answer'
        for(let i = 0;i < 5;i++){
            setTitle(questions[i].question);
            playOneRound(questions[i]);
        }
    }
})

window.addEventListener('load', ()=> {
    setTitle('Welcome to HTML & CSS Interview Game!');
})