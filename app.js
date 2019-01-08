
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
            {id: 1, name: 'Steak Dinner', calories: 1200},
            {id: 2, name: 'Cookie', calories: 200},
            {id: 3, name: 'Eggs', calories: 400}
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
        itemCaloriesInput: '#item-calories'
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
        }
        e.preventDefault();
    }

    return {
        init: function(){
            const items = ItemCtrl.getItems();

            // Populate list with items
            UICtrl.populateItemList(items);
            // Load Event Listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, UICtrl);

App.init();