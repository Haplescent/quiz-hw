let state = {
  header: {
    html: `
    <header class="d-flex flex-column flex-md-row align-items-md-center p-5 bg-light">
    <div class="pt-md-3 pb-md-4">
      <h1 class="bd-title mt-0">Quiz Header<h1>
      <p class="bd-lead">Quiz Descrption</p>
    </div>
  </header>`,
    clock: {
      html: `<div class="timer">
      <div class="circle-timer">
          <div class="timer-slot">
              <div class="timer-lt"> </div>
          </div>
          <div class="timer-slot">
              <div class="timer-rt"></div>
          </div>
          <div class="count"></div>
      </div>
  </div>`,
      render: function () {
        $("#main").append(this.html);
      },
      setState: function () {},
    },

    render: function () {
      $("#main").append(this.html);
      this.clock.render();
    },
  },

  quiz: {
    html: "<h1>Quiz</h1>",
    numOfAnswers: 4,
    question: {
      questionArray: [
        "Welcome to the Quiz.  This quiz is on Star Wars!",
        "Qustion2",
        "Qustion3",
        "Qustion4",
        "Qustion5",
        "Qustion6",
        "Qustion7",
        "Qustion8",
        "Qustion9",
        "Qustion10",
      ],
      questionIndex: 0,
      html: `<h2>{this.questionArray[this.questionIndex]}</h2>`,
      render: function () {
        $("#main").append(`<h2>${this.questionArray[this.questionIndex]}</h2>`);
      },
    },
    answer: {
      correctAnswerArray: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      numOfAnswers: 4,
      answerArray: [
        ["Start Quiz"],
        [
          "Qustion2Answer1",
          "Qustion2Answer2",
          "Qustion2Answer3",
          "Qustion2Answer4",
        ],
        [
          "Qustion3Answer1",
          "Qustion3Answer2",
          "Qustion3Answer3",
          "Qustion3Answer4",
        ],
        [
          "Qustion4Answer1",
          "Qustion4Answer2",
          "Qustion4Answer3",
          "Qustion4Answer4",
        ],
        [
          "Qustion5Answer1",
          "Qustion5Answer2",
          "Qustion5Answer3",
          "Qustion5Answer4",
        ],
        [
          "Qustion6Answer1",
          "Qustion6Answer2",
          "Qustion6Answer3",
          "Qustion6Answer4",
        ],
        [
          "Qustion7Answer1",
          "Qustion7Answer2",
          "Qustion7Answer3",
          "Qustion7Answer4",
        ],
        [
          "Qustion8Answer1",
          "Qustion8Answer2",
          "Qustion8Answer3",
          "Qustion8Answer4",
        ],
        [
          "Qustion9Answer1",
          "Qustion9Answer2",
          "Qustion9Answer3",
          "Qustion9Answer4",
        ],
        [
          "Qustion10Answer1",
          "Qustion10Answer2",
          "Qustion10Answer3",
          "Qustion10Answer4",
        ],
      ],
      answerIndex: 0,
      render: function () {
        for (let i = 0; i < this.answerArray[this.answerIndex].length; i++)
          $("#main").append(
            `<button type="button" onclick="state.quiz.answer.setState(${i})">${
              this.answerArray[this.answerIndex][i]
            }</button>`
          );
      },
      setState: function (i) {
        if (this.correctAnswerArray[this.answerIndex] === i) {
          state.feedback.html = "<h1>Correct!</h1>";
        } else {
          state.feedback.html = "<h1>Incorrect!</h1>";
          count = count - 5;
        }
        state.quiz.question.questionIndex++;
        this.answerIndex++;
        console.log(this.answerArray[this.answerIndex].length);

        state.clearMain();
        state.render();
      },
    },
    render: function () {
      $("#main").append(this.html);
      this.question.render();
      this.answer.render();
    },
  },
  feedback: {
    html: "",
    render: function () {
      $("#main").append(this.html);
    },
  },

  render: function () {
    this.header.render();
    this.quiz.render();
    this.feedback.render();
  },

  clearMain: function () {
    $("#main").empty();
  },

  initalize: function () {
    state.render();

    function timer() {
      if (!timerPause) {
        count = count - 1;
        if (count <= -1) {
          count = initialCount;
          var el = $(".circle-timer");
          el.before(el.clone(true)).remove();
        }
        $(".timer .count").text(count);
      }
    }

    setInterval(timer, 1000);
  },
};

var initialCount = 60,
  count = initialCount,
  timerPause = false;

state.initalize();
