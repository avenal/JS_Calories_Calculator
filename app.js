
// StorageController

// Item Controller
const ItemCtrl = (function(){
    const Item = function(id, name, calories)
    {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    // Data Structure / State
    const data = {
        items: [
            // {id: 1, name: 'Steak Dinner', calories: 1200},
            // {id: 2, name: 'Cookie', calories: 200},
            // {id: 3, name: 'Eggs', calories: 400}
        ],
        currentItem: null,
        totalCalories: 0
    }
    return {
        getItems:  function() {
            return data.items;
        },
        addItem: function(name, calories) {
            //Create ID
            let ID;
            if(data.items.length>0) {
                ID = data.items[data.items.length-1].id+1;
            } else {
                ID = 0;
            }
            // Calories to num
            calories = parseInt(calories);
            //Create new item
            newItem = new Item(ID, name, calories);
            //Add to items array
            data.items.push(newItem);
            return newItem;
        },
        getTotalCalories: function() {
            let total = 0;
            data.items.forEach(function(item){
                total += item.calories;
            });
            data.totalCalories = total;
            return data.totalCalories;
        },
        logData: function() {
            return data;
        }
    }

})();

// UI Controller
const UICtrl = (function(){

    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }

    return {
        populateItemList: function(items){
            let html= '';
            items.forEach(function(item){
                html+= `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                        </li>`;
            });

            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: function() {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function(item){
            document.querySelector(UISelectors.itemList).style.display = 'block';
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
            <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        clearInput: function() {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        hideList: function() {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        getSelectors: function() {
            return UISelectors;
        }
    }
})();

// App Controller
const App = (function(ItemCtrl, UICtrl){

    // Load event listeners
    const loadEventListeners = function() {
        const UISelectors = UICtrl.getSelectors();

        //Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    }

    const itemAddSubmit = function(e) {
        const input = UICtrl.getItemInput();
        //Check if input is not empty
        if(input.name !== '' && input.calories !== '')
        {
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            UICtrl.addListItem(newItem);
            const totalCalories = ItemCtrl.getTotalCalories();
            UICtrl.showTotalCalories(totalCalories);                                                                            
            //clear fields
            UICtrl.clearInput();
        }
        e.preventDefault();
    }

    return {
        init: function(){
            const items = ItemCtrl.getItems();

            // check if any items
            if(items.length === 0){
                UICtrl.hideList();
            }else{
                UICtrl.populateItemList(items);
            }
            const totalCalories = ItemCtrl.getTotalCalories();
            UICtrl.showTotalCalories(totalCalories);
            // Load Event Listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, UICtrl);

App.init();