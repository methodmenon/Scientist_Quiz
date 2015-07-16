$(document).ready(function() {
	//question class constructor
	function Question(question, choice_list, answer) {
		this.question = question;
		this.choice_list = choice_list;
		this.answer = answer;
	};

	var question1 = new Question("Who discovered electromagnetic induction?",
		["Isaac Newton", "Nikola Tesla", "Michael Faraday", "James Clerk Maxwell", "Andre-Marie Ampere", "Alessandro Volta"],
		"Michael Faraday");

	var question2 = new Question("Who proposed the hybridization theory for atomic orbitals?", 
		["Niels Bohr", "Francis Crick", "Erwin Schrodinger", "Linus Pauling", "Ernest Rutherford", "Marie Curie"],
		"Linus Pauling");

	var question3 = new Question("Who is the only person to win the Nobel Prize twice, in multiple sciences?",
		["Isaac Newton", "Albert Einstein", "Louis Pasteur", "Stephen Hawking", "Marie Curie", "Richard Feynman"],
		"Marie Curie");

	var question4 = new Question("Who was awarded the Nobel Price for the creation of quantum mechanics?",
		["Niels Bohr", "Max Planck", "Joseph John Thompson", "Erwin Schrodinger", "Werner Heisenberg", "Louis de Broglie"],
		"Werner Heisenberg");

	var question5 = new Question("Who is known for formulating the Periodic Law?", 
		["Robert Boyle", "Democritus", "John Dalton", "Dmitri Mendeleev", "James Chadwick", "Michael Faraday"],
		"Dmitri Mendeleev");

	var question6 = new Question("What famous scientist is credited with the invention of the pet door?", 
		["Isaac Newton", "Marie Curie", "Edwin Hubble", "Erwin Schrodinger", "Antoine Lavoisier", "J. Robert Oppenheimer"],
		"Isaac Newton");

	//questions array
	var questions = new Array(question1, question2, question3, question4, question5, question6);
	var question_length = questions.length;
	var question_number = 0;
});