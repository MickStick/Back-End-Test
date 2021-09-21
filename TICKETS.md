# QA has submitted the following tickets

## Filtering Orders
### QA Notes
When getting all orders filtered by a property, the orders are not being filtered at all. I tried filtering the orders by name for any order that was an "Additional Topping" but I'm getting all orders back.

### Tips
For query params you will want to assume `filterProperty` is "name" and `filterValue` is "Additional Topping".

### Dev Notes / Response
- Updated filter value with a conditional against the filterValue check which would return the filterd list
  _(Time Taken 20 mins)_
---


## Placing An Order
### QA Notes
When testing an order for a family of 6, the total is not as expected. I placed an order for the following: 

    - 2 Cheeseburgers
    - 2 Pickle Toppings
    - 1 Large Fiesta Salad
    - 3 Avocado Toppings
    - 1 Medium Hawaiian Pizza
    - 3 Medium French Fries
    - 4 Large Fountain Drinks

I calculated that the total should be $74.23 but I'm getting $51.28. Because that's a difference of $22.95, I have a feeling the "Medium Hawaiian Pizza" isn't being added.

### Tips
All items ordered (and more) can be referenced in lib/orders.js

### Dev Notes / Response


---


## Updating An Order
### QA Notes
When getting updating an order I expect to only have to pass what has changed. However, if I don't pass everything (customerName or items), that value gets removed. If for instance I did not change the customer name, I would expect it to use the one originally on the order.

Additionally, when updating the items ordered, the total is not updating.

### Dev Notes / Response
- Added checks for request body arguments, check if they were defined and add them to the updated order accordingly
- Update order total, if items were passed then set as the toal of items else use the current total on the order

  _(Time taken 5 mins)_
---


## Deleting An Order
### QA Notes
When  I delete an order, the order that gets deleted is never the one I expect. I know we recently changed how we are doing our deletes so I'm not sure everything got updated. But when I delete a specific order, that's usually not the one that gets deleted. Unless I delete it immediately.

### Dev Notes / Response


---


## Other
- Added a start script
- for filtering, I added a check for if the field to check is defined
