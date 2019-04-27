// Questions and answers array
var questions = [{
	question: "Which person was not in the Beatles?",
	answers: [{
		answer: "Paul McCartney",
		value: false
	}, {
		answer: "George Harrison",
		value: false
	}, {
		answer: "Brian Jones",
		value: true
	}, {
		answer: "John Lennon",
		value: false
	}]
}, {
	question: "Which person is not a drummer?",
	answers: [{
		answer: "Roger Waters",
		value: true
	}, {
		answer: "Ringo Starr",
		value: false
	}, {
		answer: "Charlie Watts",
		value: false
	}, {
		answer: "John Bonham",
		value: false
	}]
}, {
	question: "How many of his hits did Elvis write?",
	answers: [{
		answer: "8",
		value: false
	}, {
		answer: "4",
		value: false
	}, {
		answer: "2",
		value: false
	}, {
		answer: "0",
		value: true
	}]
}, {
	question: "Who was the lead singer of Queen?",
	answers: [{
		answer: "Robert Plant",
		value: false
	}, {
		answer: "Freddy Mercury",
		value: true
	}, {
		answer: "David Bowie",
		value: false
	}, {
		answer: "Boy George",
		value: false
	}]
}, {
	question: "Janis Joplin, Jimi Hendrix, and Kurt Cobain all died at what age?",
	answers: [{
		answer: "34",
		value: false
	}, {
		answer: "31",
		value: false
	}, {
		answer: "29",
		value: false
	}, {
		answer: "27",
		value: true
	}]
}, {
	question: "Grace Slick was the lead singer of which band?",
	answers: [{
		answer: "Jefferson Airplane",
		value: true
	}, {
		answer: "Fleetwood Mac",
		value: false
	}, {
		answer: "The Blackhearts",
		value: false
	}, {
		answer: "Heart",
		value: false
	}]
}, {
	question: "Which person is not a bass player?",
	answers: [{
		answer: "John Paul Jones",
		value: false
	}, {
		answer: "Catherine Popper",
		value: false
	}, {
		answer: "Sting",
		value: false
	}, {
		answer: "David Gilmour",
		value: true
	}]
}, {
	question: "Who is the lead singer of Fleetwood Mac?",
	answers: [{
		answer: "Ann Wilson",
		value: false
	}, {
		answer: "Shirley Manson",
		value: false
	}, {
		answer: "Stevie Nicks",
		value: true
	}, {
		answer: "Bonnie Raitt",
		value: false
	}]
}, {
	question: "Which band was not considered to be a part of the British Invasion?",
	answers: [{
		answer: "The Rolling Stones",
		value: false
	}, {
		answer: "The Doors",
		value: true
	}, {
		answer: "The Who",
		value: false
	}, {
		answer: "The Beatles",
		value: false
	}]
}, {
	question: "Robert Zimmerman is known professionally as...",
	answers: [{
		answer: "Bob Dylan",
		value: true
	}, {
		answer: "Mick Jagger",
		value: false
	}, {
		answer: "Sting",
		value: false
	}, {
		answer: "Bono",
		value: false
	}]
}];

// Global variables

var game = {
	questions: questions,
	currentQuestion: 0,
	counter: countStartNumber,
	correct: 0,
	incorrect: 0,
	countdown: function () {
		game.counter--;
		$("#counter-number").html(game.counter);

		if (game.counter === 0) {
			console.log("Time Up!");
			game.timeUp();
		}
	},

	loadQuestion: function () {
		timer = setInterval(game.countdown, 1000);
		panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
		for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
			panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i] + '</button>');
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
		panel.append("<img src=" + questions[this.currentQuestion].image + " />");

		if (game.currentQuestion === questions.length - 1) {
			setTimeout(game.results, 3 * 1000);
		} else {
			setTimeout(game.nextQuestion, 3 * 1000);
		}
	},

	results: function () {
		clearInterval(timer);

		panel.html("<h2>All done, heres how you did!</h2>");
		$('#counter-number').html(game.counter);
		panel.append("<h3>Correct Answers: " + game.correct + "</h3 > ");
		panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3 > ");
		panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3> ");
		panel.append("<br><button id="start - over">Start Over?</button>");
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
		panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3 > ");
		panel.append("<img src=" + questions[game.currentQuestion].image + " />");

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
		panel.append("<img src=" + questions[game.currentQuestion].image + " />");

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