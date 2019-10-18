// Budget Controller
var budgetCotroller = (function(){

	var Expense = function(id, description, value){
		this.id = id,
		this.description = description,
		this.value = value,
		this.percentage = -1
	};

	Expense.prototype.calcPercentage = function(totalIncome){
		if(totalIncome > 0){
			this.percentage = Math.round((this.value / totalIncome) * 100); 	
		}else{
			this.percentage = -1;
		}
	};

	Expense.prototype.getPercentage = function(){
		return this.percentage;
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
		},
		budget: 0,
		percentage: -1

	};

	var calculateTotal = function(type){
		var sum = 0;
		data.allItems[type].forEach(function(cur){
			sum += cur.value;
		});

		data.total[type] = sum;
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

		deleteItem: function(type, id){

			var ids, index;

			ids = data.allItems[type].map(function(current){
				return current.id; 
			});

			index = ids.indexOf(id);

			if(index !== -1){
				data.allItems[type].splice(index, 1);
			}


		},

		calculateBudget: function(){
			// Calculate total income and expenses
			calculateTotal('exp');
			calculateTotal('inc');

			// Calculate the budget: income - expenses
			data.budget = data.total.inc - data.total.exp;

			// Calculate the percentage of income the we spent
			data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
		},

		calculatePercentages: function(){
			data.allItems.exp.forEach(function(cur){
				cur.calcPercentage(data.total.inc);
			})
		},

		getPercentages: function(){
			var allPerc = data.allItems.exp.map(function(current){
				return current.getPercentage();
			});
			return allPerc;
		},

		getBudget: function(){
			return{
				budget: data.budget,
				totalInc: data.total.inc,
				totalExp: data.total.exp,
				percentage: data.percentage,
			}
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
		expenseContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expensesLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage',
		container: '.container',
		expensesPercLabel: '.item__percentage'
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

				html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}else if(type === 'exp'){
				element = DOMstrings.expenseContainer;
				html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
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

		displayBudget: function(obj){
			document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
			document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
			document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
			
			if(obj.percentage > 0) {
				document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + " %";	
			}else{
				document.querySelector(DOMstrings.percentageLabel).textContent = "---";

			}
		},

		deleteListItem: function(selectorID){
			var el = document.getElementById(selectorID);
			el.parentNode.removeChild(el);
		},

		displayPercentages: function(percentages){
			var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
			console.log(fields);

			var nodeListForEach = function(list, callback){
				for(var i = 0; i < list.length; i++){
					callback(list[i], i);
				}
			}

			nodeListForEach(fields, function(current, index){
				if(percentages[index] > 0){
					current.textContent = percentages[index] + ' %';	
				}else{
					current.textContent = '---';
				}
				
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

		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
	}; 

	var updateBudget = function(){
		// 1. Calculate the budget
		budgetCtrl.calculateBudget();

		// 2. Return the budget
		var budget = budgetCtrl.getBudget();

		// 3. Display the budget
		UICtrl.displayBudget(budget);
		
	};

	var updatePercentage = function(){
		// 1. Calculate Percentage
		budgetCtrl.calculatePercentages();

		// 2. Read Percentages from the budget controller
		var percentages = budgetCtrl.getPercentages();

		// 3. Update UI with new percentages
		UICtrl.displayPercentages(percentages);
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

			// Update the budget
			updateBudget();

			// Update percentage
			updatePercentage();
			
		}
		
	};

	var ctrlDeleteItem = function(event){
		var itemID, splitID, ID;

		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
		
		if(itemID){
			splitID = itemID.split('-');

			type = splitID[0];

			ID = parseInt(splitID[1]);

			// 1. delete the item from the data structure
			budgetCtrl.deleteItem(type, ID);

			// 2. delete the item from the UI
			UICtrl.deleteListItem(itemID);

			// 3. Update and show the new budget
			updateBudget();

			// Update percentage
			updatePercentage();
		}
	}

	return{
		init: function(){
			console.log('the app is working');
			setupEvenetListeners();

			// 3. Display the budget on the UI
			UICtrl.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1
			});
		}
	};

	
})(budgetCotroller, UIController);


controller.init();  
