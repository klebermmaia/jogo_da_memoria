const cards = document.querySelectorAll('.card')
let firstCard, secondCard;
let hasFlipCard = false
let lockBoard = false
let attempts = 0
let wins = 0
let hits = 0
let bestGame = 100
const attempts_cell = document.getElementById('attempts')
const wins_cell = document.getElementById('wins')
const bestGame_cell = document.getElementById('bestGame')

function resetGame(){
  cards.forEach((card)=>{
    card.classList.remove('flip')
    card.addEventListener('click', flipCard)
    setTimeout(()=>{
      let ramdomPoisition = Math.floor(Math.random() * 12)
      card.style.order = ramdomPoisition
    }, 600)
  })
  hits = 0
  attempts = 0
  attempts_cell.innerText = attempts
  resetBoard()
}
function win(){
  wins_cell.innerText = wins
  console.log("melhor", bestGame)
  if(attempts < bestGame){
    console.log(attempts)
    bestGame = attempts
    bestGame_cell.innerText = bestGame
  }
}
function resetBoard(){
  [hasFlipCard, lockBoard] = [false, false]
  [firstCard, secondCard] = [null, null]
}
function unFlipCards(){
  lockBoard = true
  setTimeout(()=>{
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')
    resetBoard()
  }, 1200)
}
function disableCards(){
  firstCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)
  resetBoard()
}
function checkForMath(){
  attempts += 1
  console.log(attempts)
  attempts_cell.innerText = attempts
  if(firstCard.dataset.card === secondCard.dataset.card){
    hits += 1
    if(hits == 6){
      wins += 1
      win()
    }
    disableCards()
    return
  }
  unFlipCards()
}
function flipCard(){
  if(lockBoard) return
  if(this === firstCard) return // Para travar em caso de clicar no mesmo elemento mais de uma vez
  this.classList.add('flip')
  if(!hasFlipCard){
    hasFlipCard = true
    firstCard = this
    return //<---- A declaração return finaliza a execução de uma função e especifica os valores que devem ser retonados para onde a função foi chamada.
  }
  secondCard = this
  hasFlipCard  = false
  checkForMath()
}
(function shuffle(){
  cards.forEach((card)=>{
    let ramdomPoisition = Math.floor(Math.random() * 12)
    card.style.order = ramdomPoisition
  })
})();

cards.forEach((card)=>{
  card.addEventListener('click', flipCard)
})