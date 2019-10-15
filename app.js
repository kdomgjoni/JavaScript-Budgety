// Budget Controller
var budgetCotroller = (function(){

	var Expense = function(id, desription, value){
		this.id = id,
		this.description = desription,
		this.value = value
	};

	var Income = function(id, description, value){
		this.id = id,
		this.desription = description,
		this.value = value
	};

	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		total: {
			exp: 0,
			inc: 0
		}
	};

	return {
		addItem: function(type, des, val){
			var newItem, ID;


			if(data.allItems[type].length > 0){
				ID = data.allItems[type][data.allItems[type].length - 1].id +1;	
			}else{
				ID = 0;
			}
			
			if(type === "exp"){
				newItem = new Expense(ID, des, val);
			}else if(type === "inc"){
				newItem = new Income(ID, des, val);
			}

			data.allItems[type].push(newItem);
			return newItem;
		},

		testing: function(){
			console.log(data);
		}
	}

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
		var input, newItem;
		// 1. Get the field input
		input = UIController.getInput();

		// 2. Add the item to the budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);

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
