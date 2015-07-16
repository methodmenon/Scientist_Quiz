$(document).ready(function() {
	//question class constructor
	function Question(question, choice_list, answer, hint) {
		this.question = question;
		this.choice_list = choice_list;
		this.answer = answer;
		this.hint = hint;
	};

	var question1 = new Question("Who discovered electromagnetic induction?",
		["Isaac Newton", "Nikola Tesla", "Michael Faraday", "James Clerk Maxwell", "Andre-Marie Ampere", "Alessandro Volta"],
		"Michael Faraday", "Question 1 hint");

	var question2 = new Question("Who proposed the hybridization theory for atomic orbitals?", 
		["Niels Bohr", "Francis Crick", "Erwin Schrodinger", "Linus Pauling", "Ernest Rutherford", "Marie Curie"],
		"Linus Pauling", "Question 2 hint");

	var question3 = new Question("Who is the only person to win the Nobel Prize twice, in multiple sciences?",
		["Isaac Newton", "Albert Einstein", "Louis Pasteur", "Stephen Hawking", "Marie Curie", "Richard Feynman"],
		"Marie Curie", "Question 3 hint");

	var question4 = new Question("Who was awarded the Nobel Price for the creation of quantum mechanics?",
		["Niels Bohr", "Max Planck", "Joseph John Thompson", "Erwin Schrodinger", "Werner Heisenberg", "Louis de Broglie"],
		"Werner Heisenberg", "Question 4 hint");

	var question5 = new Question("Who is known for formulating the Periodic Law?", 
		["Robert Boyle", "Democritus", "John Dalton", "Dmitri Mendeleev", "James Chadwick", "Michael Faraday"],
		"Dmitri Mendeleev", "Question 5 hint");

	var question6 = new Question("What famous scientist is credited with the invention of the pet door?", 
		["Isaac Newton", "Marie Curie", "Edwin Hubble", "Erwin Schrodinger", "Antoine Lavoisier", "J. Robert Oppenheimer"],
		"Isaac Newton", "Question 6 hint");

	//questions array
	var questions = new Array(question1, question2, question3, question4, question5, question6);
	var question_length = questions.length;
	var question_number = 1;
	var current_progress = 0;

	question_load(questions);

	$("#home_nav").click(function() {
		location.reload();
	});

	$("#restart_nav").click(function() {
		location.reload();
	});

	//display instructions
	$('#rules_nav').click(function(e) {
		e.preventDefault();
		$('#quiz_holder').css("display", "none");
		$('#progress_holder').css("display", "none");
		$('#navigation_holder').css("display", "none");
		$('#instructions').fadeIn(1000);
	});

	$('#understand').click(function(e) {
		e.preventDefault();
		$('#instructions').fadeOut(100);
		$('#navigation_holder').fadeIn(1000);
		$('#quiz_holder').fadeIn(1000);
		$('#progress_holder').fadeIn(1000);
	});

	function quiz_progress(current_progress) {
		if (current_progress == 0) {
			$("#number_correct").text("Zero");
		}
		else if (current_progress == 1) {
			$("#number_correct").text("One");
		}
		else if (current_progress == 2) {
			$("#number_correct").text("Two")
		}
		else if (current_progress == 3) {
			$("#number_correct").text("Three");
		}
		else if (current_progress == 4) {
			$("#number_correct").text("Four");
		}
		else if (current_progress == 5) {
			$("#number_correct").text("Five");
		}
		else {
			$("#number_correct").text("Six");
		}
	};

	//var remaining_questions = question_length - question_number;
	function question_load(questions) {
		if ((question_length - question_number) >= 0) {
			quiz_progress(current_progress);
			var currentQuestion = questions[question_number-1];
			$("#question_number").text("Question Number " + question_number);
			$("#question_holder").text(currentQuestion.question);

			var choices = currentQuestion.choice_list;

			//jquery variant of a for loop
			$.each(choices, function (index, value) { 
				//console.log(index);
				//console.log(value);
				if (index < 3) {
					//left side of choices
					$("#choices_left").prepend('<div class="choices" id="choice_"'+(index+1)+'>'+ value +'</div>');
				}
				else {
					//right side of choices
					$("#choices_right").prepend('<div class="choices" id="choice_"'+(index+1)+'>'+ value +'</div>');
				}
			});

			//METHOD 1
			//following ubinds choices element but uses .click(function(e)) instead of .on(..)[BELOW]
			$(".choices").click(function(e) {
				//makes sure user can click on a choice only once before re-trying or moving on to the next step
				$('.choices').unbind('click');
				e.preventDefault();
				var choice = $(this).text();
				var feedback_holder = '<div id="feedback_holder"></div>';
				$("#quiz_holder").append(feedback_holder);

				if (choice == currentQuestion.answer) {
					current_progress++;
					quiz_progress(current_progress);
					var right_answer = '<span class="message" id="correct">You Have Chosen the Correct Answer!</span>';
					var next_question = '<span class="message" id="try_next">Next Question</span>';
					$(this).css("background-color", "green");
					$("#feedback_holder").append(right_answer);
					$("#feedback_holder").append(next_question);
			}
				else {
					var wrong_answer = '<span class="message" id="incorrect">Your Answer is Not Quite Correct...</span>';
					var try_again = '<span class="message" id="try_again">Try Again?</span>';
					var hint = '<span class="message" id="hint">Hint?</span>';
					$(this).css("background-color", "red");
					$("#feedback_holder").append(wrong_answer);
					$("#feedback_holder").append(try_again);
					$("#feedback_holder").append(hint);
				}
			/////////////////////////////////////////////////////////////////////////////////////////////////
			//METHOD 2 (uses .one(..)) --> WORKS
			//does not use .click() and seems to work fine but not a good idea
			// $("#quiz_holder").one('click', '.choices', function(e) {
			// 	e.preventDefault();
			// 	var choice = $(this).text()
			// 	var feedback_holder = '<div id="feedback_holder"></div>';
			// 	$("#quiz_holder").append(feedback_holder);

			// 	if (choice == currentQuestion.answer) {
			// 		current_progress++;
			// 		quiz_progress(current_progress);
			// 		var right_answer = '<span class="message" id="correct">Correct!</span>';
			// 		var next_question = '<span class="message" id="try_next">Next Question</span>';
			// 		$(this).css("background-color", "green");
			// 		$("#feedback_holder").append(right_answer);
			// 		$("#feedback_holder").append(next_question);
			// }
			// 	else {
			// 		var wrong_answer = '<span class="message" id="incorrect">Woops!</span>';
			// 		var try_again = '<span class="message" id="try_again">Try Again!</span>';
			// 		var hint = '<span class="message" id="hint">Hint</span>';
			// 		$("#feedback_holder").append(wrong_answer);
			// 		$("#feedback_holder").append(try_again);
			// 		$("#feedback_holder").append(hint);
			// 	}
			////////////////////////////////////////////////////////////////////////////////////////
			// METHOD 3 (uses .on(..)) --> DOES NOT WORK
			// uses .on(..) to unbind but does not work like above..why is that
			// $('#quiz_holder').on('click', '.choices', function(e) {
			// 	//makes sure user can click on a choice only once before re-trying or moving on to the next step
			// 	$('.choices').unbind('click');
			// 	e.preventDefault();
			// 	var choice = $(this).text();
			// 	console.log(choice);
			// 	var feedback_holder = '<div id="feedback_holder"></div>';
			// 	$('#quiz_holder').append(feedback_holder);

			// 	if (choice == currentQuestion.answer) {
			// 		current_progress++;
			// 		quiz_progress(current_progress);
			// 		var right_answer = '<span class="message" id="correct">Correct!</span>';
			// 		var next_question = '<span class="message" id="try_next">Next Question</span>';
			// 		//$('.choices').remove();
			// 		$('#feedback_holder').append(right_answer);
			// 		$('#feedback_holder').append(next_question);
			// 	}
			// 	else {
			// 		var wrong_answer = '<span class="message" id="incorrect">Woops!</span>';
			// 		var try_again = '<span class="message" id="try_again">Try Again!</span>';
			// 		var hint = '<span class="message" id="hint">Hint</span>';
			// 		$('#feedback_holder').append(wrong_answer);
			// 		$('#feedback_holder').append(try_again);
			// 		$('#feedback_holder').append(hint);
			// 	}
			/////////////////////////////////////////////////////////////////////////////////////////////////
				$("#feedback_holder").on('click', '#try_next', function(e) {
					e.preventDefault();
					$(".choices").remove();
					$(".message").remove();
					$("#feedback_holder").remove();
					question_number++;
					question_load(questions);
				});

				$("#feedback_holder").on('click', '#try_again', function(e) {
					e.preventDefault();
					$(".message").remove();
					$("#feedback_holder").remove();

					$(".choices").remove();
					question_load(questions);
				});

				$("#feedback_holder").on('click', '#hint', function(e)
				{
					e.preventDefault();
					$(".message").remove();
					var hint = currentQuestion.hint;
					var current_hint = '<span class="message" id="current_hint">' + hint + '</span>';
					var try_again = '<span class="message" id="got_hint">Try Again!</span>';
					$("#feedback_holder").append(current_hint);
					$("#feedback_holder").append(try_again);
				});
				
				//use on unless you are not adding dynamic elements
				$("#feedback_holder").on('click', '#got_hint', function(e) {
					console.log();
					e.preventDefault();
					$(".choices").remove();
					$("#feedback_holder").remove();
					question_load(questions);
				});

		});

		}
		else
		{
			alert("Game over!");
			location.reload();
		}
		
	};

});