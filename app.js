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
	$("#hint").fadeOut("fast");
	$('#answer').fadeIn("slow", function() {
		$('#answer').html("It's " + answer + "!");
	});
};
	
var Guesser = function() {
	var guess = parseInt($('input:text').val());
	var difference = Math.abs(guess - answer);
	var prevDifference = Math.abs(guesses[guesses.length - 1] - answer);
	var alreadyGuessed = false;

	guesses.forEach(function(a) {
		if (a === guess) {
			alreadyGuessed = true;
		}
	});

	//determines how hot/cold you are! Takes the difference between your guess and the answer as input
	var setStatus = function(diff) {
		var status = '';
		if (diff <= 5) {
			status = "HOT! my friend!!";
			return status;
		}
		else if (diff <= 20) {
			status = "pretty warm!";
			return status;
		}
		else if (diff <= 40) {
			status = "a bit tepid..."; 
			return status;
		}
		else if (diff <= 60) {
			status = "pretty cold.";
			return status;
		}
		else if (diff <= 80) {
			status = 'V-V-VERY cold!!';
			return status;
		}
		else {
			status = 'ABSOLUTELY FRIGID!!! All the molecules in your body have frozen!';
			return status;
		}
	};

	//determines whether the current guess was better or worse than the previous guess and updates HTML.
	var updateStatus = function(diff1, diff2, stat) {
		if (guesses.length === 1) {
			$("#result").html("You are " + stat(diff1));
		}
		else if (diff1 < diff2) {
			$("#result").html("Getting warmer..." + stat(diff1));
		}
		else if (diff1 > diff2) {
			$("#result").html("Getting colder... " + stat(diff1));
		}
	};

	//determines whether the next guess should be higher or lower, takes the current guess and the answer as input.
	var hiLow = function (a, b) {	
		if (a < b) {
			var hilow = "higher!";
		}
		else {
			hilow = "lower!";
		}
		$('#hilow').html("Try to guess " + hilow);
	};

	//the primary gameplay function. 
	var updateHTML = function() {
		//if the guess is correct!
		if (guess === answer) {
			$('#guesses').html(0);
			$('#result').html("You Win!!");
			$('#hilow').html("Press Enter to Play Again").append("<div class='win'><img src='http://i.imgur.com/nuR4V.gif'><div>");
			enterToRestart();
		}
		//if the number has already been guessed
		else if (alreadyGuessed) {
			$("#result").html("You already guessed that one!");
			$("#hilow").html("Try Again!");
		}
		//if the number of guesses has been exceeded
		else if (guessesLeft <= 1) {
			$('#guesses').html(0);
			$("#result").html("You Lose!");
			$("#hilow").html("Press Enter to Play Again!");
			enterToRestart();
		}
		//if the input is invalid
		else if (isNaN(guess)|| guess < 1 || guess > 100) {
			$('#result').html("Invalid Entry! Enter a number between 1 and 100!")
			$('#hilow').html("Try Again!");
			$('.input-group input').attr("placeholder", "I said put a VALID NUMBER here, pal!");
		}
		//else a valid guess was made
		else {
			guesses.push(guess);
			guessesLeft -= 1;
			$('#guesses').html(guessesLeft);
			updateStatus(difference, prevDifference, setStatus);
			hiLow(guess, answer);
		}
	};
	updateHTML();
};

$(document).keyup(function(event) {
	if (event.keyCode === 13) {
		Guesser();
		$('input:text').val('');
	}
	else if (event.keyCode === 72) {
		getHint();
		$('input:text').val('');
	}
});

$("#guess").click(function() {
	Guesser();
	$('input:text').val('');
});

$("#hintbtn").click(function() {
	getHint();
});

$("#reset").click(function() {
	location.reload();
})