const quiz = () => {

  const innerBlock = document.querySelector('.quiz__block-enter');

  let questionBtn;
  let input;
  let select;
  let startBtn;
  let selectValue;
  let showIndex = 0;
  let userName;
  let corretcScore = 0;

  const answerArr = [];

  const history = [
    {
      "question": "Год основания Москвы?",
      "option": [
        1147,
        1148,
        1133,
        1137
      ],
      "correctAnswer": 1
    },
    {
      "question": "Когда закончилась великая отечественная война?",
      "option": [
        1937,
        1948,
        1945,
        1944
      ],
      "correctAnswer": 3
    },
    {
      "question": "Настоящая фамилия Ленина?",
      "option": [
        "Собакевич",
        "Ульянов",
        "Львов",
        "Ноздрев"
      ],
      "correctAnswer": 2
    },
    {
      "question": "Сколько дней длилась блокада Ленинграда?",
      "option": [
        872,
        885,
        730,
        880
      ],
      "correctAnswer": 1
    },
  ]

  const sport = [
    {
      "question": "Какая команда выигрывала Лигу Чемпионов два раза подряд?",
      "option": [
        "Челси",
        "Реал Мадрид",
        "Интер",
        "Барселона"
      ],
      "correctAnswer": 2
    },
    {
      "question": "За какую сборную играет К.Роналдо?",
      "option": [
        "Италия",
        "Франция",
        "Португалия",
        "Бразилия"
      ],
      "correctAnswer": 3
    },
    {
      "question": "Кто выиграл Лигу Чемпионов 2020-21?",
      "option": [
        "Бавария",
        "ПСЖ",
        "Зенит",
        "Челси"
      ],
      "correctAnswer": 4
    },
    {
      "question": "Где проводятся олимпийские игры 2022?",
      "option": [
        "Сочи",
        "Пекин",
        "ЮАР",
        "Норвегия"
      ],
      "correctAnswer": 2
    },
  ]

  showStartpage()

  function clearPage() {
    innerBlock.innerHTML = '';
  }

  function showStartpage() {
    clearPage()

    const startPage = `
    <div class="quiz__block-content">
       <h2 class="quiz__enter-title title">Интерактивная Игра</h2>
            <input class="quiz__enter-input" type="text" required placeholder="Ваше имя" name="name">
            <select class="quiz__enter-select" name="select">
              <option class="quiz__enter-option" selected>Категория Игры</option>
              <option class="quiz__enter-option" value="history">История</option>
              <option class="quiz__enter-option" value="sport">Спорт</option>
            </select>
            <button class="quiz__enter-btn btn">Приступить</button>
             </div>
    `;
    innerBlock.innerHTML = startPage
    startBtn = document.querySelector('.quiz__enter-btn');
    input = document.querySelector('.quiz__enter-input');
    select = document.querySelector('.quiz__enter-select')
  }

  startBtn.addEventListener('click', () => {
    if (input.value.length < 2) return;
    userName = input.value;
    selectValue = select.value
    checkQuestion(selectValue)
  })

  function checkQuestion(value) {
    switch (value) {
      case 'history':
        showQuestion(history, showIndex)
        break;

      case 'sport':
        showQuestion(sport, showIndex)
        break;

      default:
        showQuestion(sport, showIndex)
        break;
    }
  }

  function showQuestion(arr, index) {
    clearPage();
    console.log(arr);
    if (index + 1 > arr.length) {
      clearPage();
      showResult();
      return
    }

    const questionBlock = document.createElement('div')
    questionBlock.classList.add('quiz__block-question');

    const questionList = document.createElement('ul');
    questionList.classList.add('quiz__question-list')


    questionBlock.innerHTML = `
            <div class="quiz__question-top">
              <h2 class="quiz__question-title title">
                ${arr[index]['question']}
              </h2>
              <p class="quiz__question-length">${index + 1} из ${arr.length}</p>
            </div>
    `;

    for (let value of arr[index]['option']) {
      const questionItem = `<li class="quiz__question-item">${value}</li>`;
      questionList.innerHTML += questionItem
    }
    showIndex++
    questionBlock.append(questionList)

    innerBlock.append(questionBlock)

    questionBtn = document.querySelectorAll('.quiz__question-item');

    console.log(index);
    if (index + 1 > arr.length) {
      showResult()
    }
    showNextQuestion(arr[index]['correctAnswer'])

  }

  function showNextQuestion(correctAnswer) {
    questionBtn.forEach((el, index) => {
      el.addEventListener('click', (e) => {
        checkAnswer(e.target, correctAnswer, index);
        setTimeout(() => {
          checkQuestion(selectValue, showIndex)
        }, 1000)
      })
    })
  }

  function checkAnswer(item, correctIndex, index) {
    if (index + 1 == correctIndex) {
      setTimeout(() => {
        item.classList.remove('quiz__question-item')
        item.classList.add('quiz__result-text', 'green')
        answerArr.push(item);
        console.log(answerArr);
      }, 1000)
      corretcScore++
    } else {
      setTimeout(() => {
        item.classList.remove('quiz__question-item')
        item.classList.add('quiz__result-text', 'red')
        answerArr.push(item)
      }, 1000)

    }
  }

  function showResult() {
    clearPage();
    const resultBlock = document.createElement('div');
    resultBlock.classList.add('quiz__block-result');

    const resultTitle = document.createElement('h2')
    resultTitle.classList.add('quiz__result-title', 'title');

    resultTitle.textContent = `Спасибо ${userName} за участие. Резульаты:`;
    resultBlock.append(resultTitle)

    const resultWrapper = document.createElement('ul');
    resultWrapper.classList.add('quiz__result-wrapper');

    const scoreNum = document.createElement('p');
    scoreNum.classList.add('quiz__result-text')
    scoreNum.textContent = `
      Правильных ответов ${corretcScore} из ${answerArr.length}
    `

    const buttonEnd = document.createElement('button')
    buttonEnd.classList.add('quiz__result-btn', 'btn');
    buttonEnd.textContent = 'Повторить';
    buttonEnd.addEventListener('click', () => {
      setTimeout(() => {
        location.reload()
      }, 500)
    })

    answerArr.forEach(el => {
      resultWrapper.append(el)
    })

    resultBlock.append(resultWrapper);
    resultBlock.append(scoreNum);
    resultBlock.append(buttonEnd)
    innerBlock.append(resultBlock)

  }


}
export default quiz;