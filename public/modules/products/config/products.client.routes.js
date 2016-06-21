'use strict';

//Setting up route
angular.module('products').config(['$stateProvider',
	function($stateProvider) {
		// Products state routing
		$stateProvider.
		state('view-product', {
			url: '/products/:productId/view',
			templateUrl: 'modules/products/views/view-product.client.view.html'
		}).
		state('edit-product', {
			url: '/products/:productId/edit',
			templateUrl: 'modules/products/views/edit-product.client.view.html'
		}).
		state('create-product', {
			url: '/products/create',
			templateUrl: 'modules/products/views/create-product.client.view.html'
		}).
		state('listProducts', {
			url: '/products',
			templateUrl: 'modules/products/views/products.client.view.html'
		});
	}
]);