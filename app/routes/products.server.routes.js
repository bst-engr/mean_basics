'use strict';

module.exports = function(app) {
	var products = require('../../app/controllers/products.server.controller');
    var users = require('../../app/controllers/users.server.controller');

	app.route('/products')
				.get(products.list)
				.post(users.requiresLogin, products.create);

	// the categoryId param is added to the params object for the request
   	app.route('/products/:productId')
   		.get(products.read)
		.put(users.requiresLogin, products.update)
        .delete(users.requiresLogin, products.delete);

    app.route('/products/:category_id/category').get(products.readCategory);
	// Finish by binding the article middleware
	// What's this? Where the categoryId is present in the URL
	// the logic to 'get by id' is handled by this single function
	// and added to the request object i.e. request.category.
	app.param('productId', products.productByID);
	app.param('category_id', products.productByCategory);

};