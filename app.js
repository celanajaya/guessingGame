$(document).ready(function() {
	var random = Math.floor((Math.random() * 100) + 1)
	var guesses = [];
	var guessesLeft = 5;

	var guessingGame = function() {
		var status = ""
		var guess = $('input:text').val();
		var diff = Math.abs(parseInt(guess) - random);
		guessesLeft -= 1;
		alert([random, diff]);

		//determines whether the game is over.
		if (guessesLeft === 0) {
			$('#answer').html("You lose, loser!");
		}
		else if (guessesLeft < 0) {
			location.reload();
		}

		//determines whether the player should guess higher or lower
		if (guess - random < 0) {
			var hilow = "higher!";
		}
		else {
			hilow = "lower!";
		}
		//determines how hot or cold the player is getting
		if (diff == 0) { 
			$('#answer').html("That's Right! You Win a Million Dollars!!!");
		}
		else if (diff <= 10) {
			status = "VERY warm!!";
		}
		else if (11 < diff < 20) {
			status = "warm!";
		}
		else if (21 < diff < 40) {
			status = "luke warm..."; 
		}
		else if (41 < diff < 60) {
			status = "cold.";
		}
		else if (61 < diff < 80) {
			status = 'VERY cold!!'
		}
		else if (81 < diff <= 100) {
			status = 'ABSOLUTELY FRIGID!!!'
		}
		$('#answer').html("You are getting " + status) 
		$('#hilow').html(" Guess " + hilow);
		$('#guesses').html(guessesLeft);
	}
	$("button").click(function() {
		guessingGame();
	});
});