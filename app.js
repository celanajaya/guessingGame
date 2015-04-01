var guesses = [];
var guessesLeft = 5;
var answer = Math.floor((Math.random() * 100) + 1);

var enterToRestart = function() {
	$(document).keyup(function() {
		if (event.keyCode === 13) {
			location.reload();
		}
	});
};

var getHint = function() {
	$("#hint").fadeOut();
	$('#answer').fadeIn("slow", function() {
		$('#answer').html("The Answer is " + answer);
	});
};
	
var Guesser = function() {
	var guess = parseInt($('input:text').val());
	var difference = Math.abs(guess - answer);
	var alreadyGuessed = false;

	guesses.forEach(function(a) {
		if (a === guess) {
			alreadyGuessed = true;
		}
	});

	//determines the value of the status variable
	var determineStatus = function(num) {
		if (num <= 5) {
			var status = "VERY warm!!";
		}
		else if (num <= 20) {
			status = "warm!";
		}
		else if (num <= 40) {
			status = "luke warm/coldish..."; 
		}
		else if (num <= 60) {
			status = "cold.";
		}
		else if (num <= 80) {
			status = 'VERY cold!!';
		}
		else {
			status = 'ABSOLUTELY FRIGID!!!';
		}
		$('#result').html("You are " + status)
	};

	//determines the value of the hilow variable
	var hiLow = function (a, b) {	
		if (a < b) {
			var hilow = "higher!";
		}
		else {
			hilow = "lower!";
		}
		$('#hilow').html(" Guess " + hilow);
	};

	//determines how to update the html based on the value of guess and guessesLeft
	var updateHTML = function() {
		if (isNaN(guess)|| guess < 1 || guess > 100) {
			$('#result').html("Please enter a number between 1 and 100")
			$('#hilow').html("Guess Again!");
			$('.input-group input').attr("placeholder", "I said put a VALID NUMBER here, pal!");
		}
		else if (alreadyGuessed) {
			$("#result").html("You already guessed that one!");
			$("#hilow").html("Guess Again!");
		}
		else if (guessesLeft === 0) {
			$("#result").html("You Lose!");
			$("#hilow").html("Press Enter to Play Again!");
			enterToRestart();
		}
		else if (guess === answer) {
			$('#result').html("You Win!!");
			$('#hilow').html("Press Enter to Play Again");
			enterToRestart();
		}
		else {
			guesses.push(guess);
			hiLow(guess, answer);
			determineStatus(difference);
			guessesLeft -= 1;
			$('#guesses').html(guessesLeft);
		}
	};
	updateHTML();
};

$(document).keyup(function(event) {
	if (event.keyCode === 13) {
		Guesser();
	}
	else if (event.keyCode === 72) {
		getHint();
	}
});

$("#guess").click(function() {
	Guesser();
});

$("#hint").click(function() {
	getHint();
});

$("#reset").click(function() {
	location.reload();
})