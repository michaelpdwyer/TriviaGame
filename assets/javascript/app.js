$(document).ready(function () {
	console.log("ready");

	var panel = $("#trivia-game");
	var countStartNumber = 30;

	// Click event

	$(document).on("click", "#start-over", function (e) {
		game.reset();
	});

	$(document).on("click", ".answer-button", function (e) {
		game.clicked(e);
	});

	$(document).on("click", "#start", function (e) {
		$("#subwrapper").prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
		game.loadQuestion();
	});

	// Question objects

	var questions = [{
		question: "Which person was not in the Beatles?",
		answers: ["Paul MacCartney", "George Harrison", "Brian Jones", "John Lennon"],
		correctAnswer: "Brian Jones"
	}, {
		question: "Which person is not a drummer?",
		answers: ["Roger Waters", "Ringo Starr", "Charlie Watts", "John Bonham"],
		correctAnswer: "Roger Waters"
	}, {
		question: "How many of his hits did Elvis write?",
		answers: ["8", "4", "2", "0"],
		correctAnswer: "0"
	}, {
		question: "Who was the lead singer of Queen?",
		answers: ["Robert Plant", "Freddy Mercury", "David Bowie", "Boy George"],
		correctAnswer: "Freddie Mercury",
	}, {
		question: "Janis Joplin, Jimi Hendrix, and Kurt Cobain all died at what age?",
		answers: ["34", "31", "29", "27"],
		correctAnswer: "27"
	}, {
		question: "Grace Slick was the lead singer of which band?",
		answers: ["Jefferson Airplane", "Fleetwood Mac", "The Blackhearts", "Heart"],
		correctAnswer: "Jefferson Airplane"
	}, {
		question: "Which person is not a bass player?",
		answers: ["John Paul Jones", "Catherine Popper", "Sting", "David Gilmour"],
		correctAnswer: "David Gilmour"
	}, {
		question: "Who is the lead singer of Fleetwood Mac?",
		answers: ["Ann Wilson", "Shirley Manson", "Stevie Nicks", "Bonnie Raitt"],
		correctAnswer: "Stevie Nicks"
	},
	{
		question: "Which band was not considered to be a part of the British Invasion?",
		answers: ["The Rolling Stones", "The Doors", "The Who", "The Beatles"],
		correctAnswer: "The Doors"
	},
	{
		question: "Robert Zimmerman is known professionally as...",
		answers: ["Bob Dylan", "Mick Jagger", "Sting", "Bono"],
		correctAnswer: "Bob Dylan"
	}];

	// Game variables + functions

	var game = {
		questions: questions,
		currentQuestion: 0,
		counter: countStartNumber,
		correct: 0,
		incorrect: 0,
		timeOut: 0,

		countdown: function () {
			game.counter--;
			$("#counter-number").html(game.counter);
			if (game.counter === 0) {
				console.log("Time Up!");
				game.timeUp();
				timeOut++;
			}
		},

		loadQuestion: function () {
			timer = setInterval(game.countdown, 1000);
			panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
			for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
				panel.append('<button class="answer-button" id="button"' + questions[this.currentQuestion].answers[i] + questions[this.currentQuestion].answers[i] + '</button>');
			}
		},

		nextQuestion: function () {
			game.counter = countStartNumber;
			$("#counter-number").html(game.counter);
			game.currentQuestion++;
			game.loadQuestion();
		},

		timeUp: function () {
			clearInterval(timer);
			$("#counter-number").html(game.counter);
			panel.html("<h2>Out of Time!</h2>");
			panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
			if (game.currentQuestion === questions.length - 1) {
				setTimeout(game.results, 3 * 1000);
			} else {
				setTimeout(game.nextQuestion, 3 * 1000);
			}
		},

		results: function () {
			clearInterval(timer);

			panel.html("<h2>All done, heres how you did!</h2>");
			$("#counter-number").html(game.counter);
			panel.append("<h3>Right Answers: " + game.correct + "</h3>");
			panel.append("<h3>Wrong Answers: " + game.incorrect + "</h3>");
			panel.append("<h3>Unanswered: " + timeOut + "</h3>");
			panel.append('<br><button id="start">Start Over?</button>');
		},

		clicked: function (e) {
			clearInterval(timer);

			if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer) {
				this.answeredCorrectly();
			} else {
				this.answeredIncorrectly();
			}
		},

		answeredIncorrectly: function () {
			game.incorrect++;
			clearInterval(timer);
			panel.html("<h2>Nope!</h2>");
			panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3> ");
			panel.append(questions[game.currentQuestion].image);

			if (game.currentQuestion === questions.length - 1) {
				setTimeout(game.results, 3 * 1000);
			} else {
				setTimeout(game.nextQuestion, 3 * 1000);
			}
		},

		answeredCorrectly: function () {
			clearInterval(timer);
			game.correct++;
			panel.html("<h2>Correct!</h2>");
			panel.append(questions[game.currentQuestion].image);

			if (game.currentQuestion === questions.length - 1) {
				setTimeout(game.results, 3 * 1000);
			} else {
				setTimeout(game.nextQuestion, 3 * 1000);
			}
		},

		reset: function () {
			this.currentQuestion = 0;
			this.counter = countStartNumber;
			this.correct = 0;
			this.incorrect = 0;
			this.loadQuestion();
		}
	};