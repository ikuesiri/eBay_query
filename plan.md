Scope
1. Implement API to create, update, delete items in eBay.
2. Implement API to get category ID of a category name
3. Any other related and necessary API.

Note:
- All APIs must have proper validation of models/schemas
- APIs must be Restful
- JSON should be used for data exchange
- Solution must be packaged as a docker container
- Solution must have all documentation

Process:
1. user first calls the category API
- request parameters
- category name (string)
- response
- ebay_category_id (number)
- required fields (array)

2. user then uses the above information to call the API that creates/updates an item
3. any other suggestions welcome.
you will provide at least 2 sets of APIs which my application will call
One of the API set will be creating, updating, deleting items
the second one will be getting category details.

- Example
my application will call your API with a CATEGORY_NAME, and your API will use the CATEGORY_NAME to call eBay API to get the category ID and other details including the required fields for that category