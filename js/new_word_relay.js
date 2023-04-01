/*
1. 몇명이 게임을 할지 정하기
2. 첫번째 사람 제시어 입력
 - 첫번째(이전) 제시어 위한 변수
 - input 요소에 입력, 버튼 클릭
 - 새로 입력한 제시어 저장 변수
*/ 
// const number = Number(prompt('몇 명이 참가하나요?'));
const $button = document.querySelector('button');
const $input = document.querySelector('input');
const $word = document.querySelector('span#word');
const $order = document.querySelector('span#order');

const $time = document.querySelector(".time")
const $view =document.querySelector(".word_view");

let i = 1;
const regex = /^[ㄱ-ㅎ|가-힣]+$/;


// 재룡님 추가

let number = Number(prompt("몇 명이 참가하나요?"));
console.log(`참가인원 카운트 확인 :::::`, number);

// 프롬프트창에서 숫자가 아닌 값을 받을 때, 다시 띄울 창
while (isNaN(number)) {
  number = Number(prompt("숫자를 입력하세요"));
  console.log(`숫자 제대로 찍었는지 확인 :::::`, number);
}

// prompt 값 뿌려주면서 참가인원 출력
const $h1 = document.querySelector(`h1`);
$h1.textContent = `참가인원 ${number}명`;

// 재룡님 추가 끝


let word; // 제시어
let newWord; // 새로 입력한 단어
let $prevWord, currWord; //이전 단어 현재 단어
let firstTurn = 1;
let turn = firstTurn //첫번째순서

//추가
//시간 제한
let timeCount = 10;

$time.innerHTML = `제한시간: ${timeCount}`;

const tick = () =>{
  $time.innerHTML = `제한시간: ${timeCount}`;
  if(timeCount === 0){
    clearInterval(start);
    alert("GAME OVER");
   
  }else{
    timeCount -= 1;
  }
};
const start = setInterval(tick, 1000);

let str = 123

const onClickButton = () => {

  // input value를 newWord에 대입
  newWord = $input.value;  

  //추가
  let inputWord = document.querySelector('input').value;

  if (regex.test(inputWord) == false) {
    // 입력값이 문자열이 아니라면
    alert(`단어를 다시 입력하세요 ${i++} / 3`);

    $input.value = '';

    if (i > 3) {

      clearInterval(start);
      alert("값을 잘못 입력하셨습니다. 게임이 끝났습니다."); 
      // 아예 창이 아무것도 안뜨게 하기
      
    }
  } //추가 끝

  // 제시어가 없거나(첫번째), 제시어의 마지막 글자와 입력의 첫글자 같을경우
  else{

    
     if (!word || word[word.length - 1] === newWord[0]) { 
    // 입력한 단어를 제시어로 대입
    
    word = newWord; 
    // oldword = `${newWord}- ${i}`;

    // 제시어 화면에 출력(span#word)
    $word.textContent = `${word} `;

   // if( word < 2 ){
   //   $word.textContent += `${word} `;

   // }else{}

    timeCount = 10;

    // 현재 순서값 숫자로 변경
    const order = Number($order.textContent);
    if (order + 1 > number) {
      $order.textContent = 1;
    } else {
      $order.textContent = order + 1;
    }
  }else if (!newWord){
    alert("입력 값이 없습니다.");

  } else{ // 올바르지 않은가
    alert('올바르지 않은 단어입니다!');
  }
}
  $input.value = '';
  $input.focus();
};

// html문서 load
window.onload = function() {
  $input.focus();
}
// 버튼 클릭했을 때 함수 호출
$button.addEventListener('click', onClickButton);
// input요소에서 엔터키 눌렀을 때
$input.addEventListener('keydown', function search(e) {
  if(e.key == 'Enter') {
    onClickButton();
  }
});