const quiz = () => {

  const innerBlock = document.querySelector('.quiz__block-enter');
  // const questionBlock = document.querySelector('.quiz__block-question');
  // const questionTitle = document.querySelector('.quiz__question-title');
  // let questionList = document.querySelector('.quiz__question-list')
  let input;
  let select;
  let startBtn;

  let showIndex = 0;
  let userName;

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
    const selectValue = select.value
    checkQuestion(selectValue)
  })


  function checkQuestion(value) {
    switch (value) {
      case 'history':
        showQuestion(history)
        break;

      case 'sport':
        showQuestion(sport)
        break;

      default:
        showQuestion(sport)
        break;
    }
  }

  function showQuestion(arr) {
    clearPage();

    const questionBlock = document.createElement('div')
    questionBlock.classList.add('quiz__block-question');

    const questionList = document.createElement('ul');
    questionList.classList.add('quiz__question-list')


    questionBlock.innerHTML = `
            <div class="quiz__question-top">
              <h2 class="quiz__question-title title">
                ${arr[showIndex]['question']}
              </h2>
              <p class="quiz__question-length"></p>
            </div>

    `
    console.log(questionBlock);


    for (let value of arr[showIndex]['option']) {
      const questionItem = `<li class="quiz__question-item">${value}</li>`;
      questionList.innerHTML += questionItem
    }


    showIndex++
    questionBlock.append(questionList)
    innerBlock.append(questionBlock)
  }

}
export default quiz;