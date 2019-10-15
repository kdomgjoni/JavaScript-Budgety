// Budget Controller
var budgetCotroller = (function(){

})();


// UI Controller 
var UIController = (function(){


	var DOMstrings = {
		inputType: '.add__type',
		inputDesription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn'
	};

	// Objetxt that are going to returned are public 
	return {
		getInput: function(){
			return {
				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputDesription).value,
				value: document.querySelector(DOMstrings.inputValue).value
			
			};
		},
 
		getDOMstrings: function(){
			return DOMstrings;
		}
	}



})();



// Global App Controller
var controller = (function(budgetCtrl, UICtrl){ 

	var setupEvenetListeners = function(){
		var DOM = UICtrl.getDOMstrings();

		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function(event){
			if(event.keyCode === 13 || event.keyCode === 13){
				ctrlAddItem();
			} 
		});
	}; 

	var ctrlAddItem = function(){
		// 1. Get the field input
		var input = UIController.getInput();
		console.log(input);

		// 2. Add the item to the budget controller

		// 3. Add the item to the UI

		// 4. Calculate the budget

		// 5. Display the budget on the UI
	};

	return{
		init: function(){
			console.log('the app is working');
			setupEvenetListeners();
		}
	};

	
})(budgetCotroller, UIController);


controller.init();
