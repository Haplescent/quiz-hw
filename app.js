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
      timer: function () {
        if (!timerPause) {
          count = count - 1;
          if (count <= -1) {
            count = 0;
            timerPause = true;
            var el = $(".circle-timer .bd-lead .bd-title .mt-0");
            el.before(el.clone(true)).remove();
          }
          $(".timer .count").text(count);
        }
      },
      html: `<div class="timer bd-lead">
      <div class="circle-timer bd-title mt-0 bd-lead">
          <div class="timer-slot bd-title mt-0 bd-lead">
              <div class="timer-lt bd-title mt-0 bd-lead"> </div>
          </div>
          <div class="timer-slot bd-title mt-0 bd-lead">
              <div class="timer-rt bd-title mt-0 bd-lead"></div>
          </div>
          <div class="count bd-lead bd-title mt-0"></div>
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
    html: `
    <div class="d-flex flex-column flex-md-row align-items-md-center p-5 bg-light">
    <div class="pt-md-3 pb-md-4">
      <h1 class="bd-title mt-0">Star Wars Quiz<h1>
    </div>
  </div>`,
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
      render: function () {
        $("#main").append(`
        <div class="d-flex flex-column flex-md-row align-items-md-center p-5 bg-light">
        <div class="pt-md-3 pb-md-4">
        <h2>${this.questionArray[this.questionIndex]}</h2>
        </div>
      </div>`);
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
            `<button type="button" class="btn btn-primary" onclick="state.quiz.answer.setState(${i})">${
              this.answerArray[this.answerIndex][i]
            }</button>`
          );
      },
      setState: function (i) {
        console.log(this.answerIndex === 0);
        console.log(count <= 1);
        console.log(this.answerIndex === 9);
        if (this.answerIndex === 0) {
          setInterval(state.header.clock.timer, 1000);
          state.quiz.question.questionIndex++;
          this.answerIndex++;
          console.log(this.answerArray[this.answerIndex].length);
          state.clearMain();
          state.render();
        } else if (count <= 1 || this.answerIndex === 9) {
          state.clearMain();
          state.endGame();
        } else if (this.correctAnswerArray[this.answerIndex] === i) {
          state.feedback.html = `<div class="alert alert-success" role="alert">
          Correct!</div>`;
          state.quiz.question.questionIndex++;
          this.answerIndex++;
          console.log(this.answerArray[this.answerIndex].length);
          state.clearMain();
          state.render();
        } else {
          state.feedback.html = `<div class="alert alert-danger" role="alert">
          Incorrect!
        </div>`;
          count = count - 5;
          state.quiz.question.questionIndex++;
          this.answerIndex++;
          console.log(this.answerArray[this.answerIndex].length);
          state.clearMain();
          state.render();
        }
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

  endGame: function () {
    $(document).ready(function () {
      $("form").submit(function (e) {
        e.preventDefault();
        if ($("input").first().val() === "") {
          alert("Must type something");
        } else {
          alert("Submitted");
          $("input").first().val();
          window.localStorage.setItem($("input").first().val(), score);
          state.clearMain();
          state.highScore.render();
        }
      });
    });
    let html = `<form action="" bg-light>
    <div class="form-group">
    <input type="text" name="FirstName" value="Mickey">
    <input type="submit" value="Submit">
  </div></form>
    `;
    state.clearMain();
    score = count;
    console.log(score);
    $("#main").append(html);
  },

  highScore: {
    html: `<table id='table' border='1'>
    </table>`,
    render: function () {
      $("#main").append(this.html);
      scoresObject = this.getScores();
      sortedScores = this.sortScores(scoresObject);
      for (let i = 0; i < sortedScores.length; i++) {
        if (scoresObject[sortedScores[i]] != null) {
          rowHtml = `<tr><td>${scoresObject[sortedScores[i]]}</td><td>${
            sortedScores[i]
          }</td></tr>`;
          $("#table").prepend(rowHtml);
        }
      }
    },
    sortScores: function (list) {
      //   var list = { you: 100, me: 75, foo: 116, bar: 15 };
      keysSorted = Object.keys(list).sort(function (a, b) {
        return list[a] - list[b];
      });
      console.log(keysSorted);
      return keysSorted;
    },
    getScores: function () {
      let itemsObj = {};
      for (var key in window.localStorage) {
        console.log(key);
        console.log(JSON.parse(window.localStorage.getItem(key)));
        itemsObj[key] = JSON.parse(window.localStorage.getItem(key));
      }
      console.log(itemsObj);
      return itemsObj;
    },
  },
};

var initialCount = 10,
  count = initialCount,
  timerPause = false;

state.render();
