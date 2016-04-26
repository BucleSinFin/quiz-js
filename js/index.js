 (function() {
"use strict";
  
var game = {
  	score: 0,
  	currentQuestionIndex: 0,
  	questions: [
		questionMaker(
		  'What is the first day of spring?', 
		  'spring', 
		  ['14.3.', '12.3.', '21.3.'], 2, 5),
		questionMaker(
		  'What is the meaning of life?', 
		  'life', 
		  ['14', '42', 'family'], 1, 10),
		questionMaker(
		  'Am I awesome?',  
		  'awesome', 
		  ['yes', 'no', 'kind of'], 0, 1),
        questionMaker('Is Schrodinger\'s cat alive?',  
		  'cat', 
		  ['yes', 'no', 'both'], 2, 2),
		],
  	answer: function checkAnswer(inputQuestionIndex, inputAnswer) {
  		var inputQuestion = this.questions[inputQuestionIndex];
  		var isCorrect =  (inputQuestion.positionOfCorrectAnswer == inputAnswer);
  		
  		this.incrementScore(isCorrect, inputQuestion);
  	},
	incrementScore: function incrementScore(isCorrectAnswer, question, game) {
	  if (isCorrectAnswer) {
	    this.score += question.score;
	  }
	},
	perfectScore: function calculatePerfectScore() {
	  var perfectScore = 0;
	
	  for (var x = 0; x < this.questions.length; x++) {
	    perfectScore += this.questions[x].score;
	  }
	  return perfectScore;
	},
	step: function step(inputAnswer){
		var currentQuestion = this.questions[this.currentQuestionIndex];

		this.answer(this.currentQuestionIndex, inputAnswer);
		this.currentQuestionIndex++;

	},
	isOver: function isOver(){
		return (this.questions.length <= this.currentQuestionIndex);
	}
};

function questionMaker(inputTitle, inputSubtitle, inputAnswers, inputPositionOfRightAnswer, inputScore) {
  return {
    title: inputTitle,
    subtitle: inputSubtitle,
    answers: inputAnswers,
    score: inputScore,
    positionOfCorrectAnswer: inputPositionOfRightAnswer
  };
}

  $('#answer-section button').click(function() {   
      var answerIndex = $(this).data('index');
      game.step(answerIndex);
      if (game.isOver()) {
        renderGameOver(); 
      }
      else {
        render();
      }
  });
  
  render();
  
  function render() {
    var question = game.questions[game.currentQuestionIndex];

    $('#question-number').html(game.currentQuestionIndex+1);
    $('#score').html(game.score + '/' + game.perfectScore());
    $('#question-title').html(question.title);
    $('#question-subtitle').html(question.subtitle);
    
    $('#answer-section button').each(function(index) {
      $(this).html(question.answers[index]);
    });
  }
  
  function renderGameOver() {
    $('#question-title').html('Game Over');
    $('#question-subtitle').html('');
    $('#score-wraper').css('visibility', 'hidden');
    $('#answer-section').css('display', 'none');
    $('#result-section').css('display', 'block');
    
    $('#score-achieved').html(game.score);
    $('#score-possible').html(game.perfectScore());
    
  }

  
})();
