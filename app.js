// Budget Controller
var budgetCotroller = (function(){

})();


// UI Controller 
var UIController = (function(){

})();



// Global App Controller
var controller = (function(budgetCtrl, UICtrl){ 

	var ctrlAddItem = function(){
		// 1. Get the field input

		// 2. Add the item to the budget controller

		// 3. Add the item to the UI

		// 4. Calculate the budget

		// 5. Display the budget on the UI

		console.log('it works');
	}

	document.querySelector(".add__btn").addEventListener('click', ctrlAddItem);


	document.addEventListener('keypress', function(event){
		if(event.keyCode === 13 || event.keyCode === 13){
			ctrlAddItem();
		}
	})


})(budgetCotroller, UIController);