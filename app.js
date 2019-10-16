// Budget Controller
var budgetCotroller = (function(){

	var Expense = function(id, description, value){
		this.id = id,
		this.description = description,
		this.value = value
	};

	var Income = function(id, description, value){
		this.id = id,
		this.description = description,
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

			// Create new ID
			if(data.allItems[type].length > 0){
				ID = data.allItems[type][data.allItems[type].length - 1].id +1;	
			}else{
				ID = 0;
			}
			 
			// Create new item based on 'inc' or 'exp' type
			if(type === "exp"){
				newItem = new Expense(ID, des, val);
			}else if(type === "inc"){
				newItem = new Income(ID, des, val);
			}

			// Push it into our data structure
			data.allItems[type].push(newItem);
			return newItem;
		},

		testing: function(){
			console.log(data);
		},

	}

})();


// UI Controller 
var UIController = (function(){


	var DOMstrings = {
		inputType: '.add__type',
		inputdescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expenseContainer: '.expenses__list'
	};

	// Objetxt that are going to returned are public 
	return {
		getInput: function(){
			return {
				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputdescription).value,
				value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
			
			};
		},

		addListItem: function(obj, type){
			var html, newHtml, element;

			//Create Html strings with placeholder text
			if(type === 'inc'){
				element = DOMstrings.incomeContainer;

				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}else if(type === 'exp'){
				element = DOMstrings.expenseContainer;
				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}

			// Replace the placeholder text with some actual data
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);

			// Insert Html into dom
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
		},

		clearFields: function(){
			var fields, fieldsArr;

			fields = document.querySelectorAll(DOMstrings.inputdescription + ', ' + DOMstrings.inputValue);

			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach( function(current, index) {
				current.value = "";
			});
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

	var updateBudget = function(){
		// 1. Calculate the budget

		// 2. Return the budget

		// 3. Display the budget on the UI
	}



	var ctrlAddItem = function(){
		var input, newItem;
		// 1. Get the field input
		input = UIController.getInput();

		if(input.description !== "" && !isNaN(input.value) && input.value > 0){
			// 2. Add the item to the budget controller
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);

			// 3. Add the item to the UI
			UICtrl.addListItem(newItem, input.type);

			// Clear fileds to the UI
			UICtrl.clearFields();
		}


		// Update the budget
		updateBudget();
		
	};

	return{
		init: function(){
			console.log('the app is working');
			setupEvenetListeners();
		}
	};

	
})(budgetCotroller, UIController);


controller.init();  
