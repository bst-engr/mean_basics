'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		})
		.state('product-by-category', {
			url: '/:categoryId/category',
			templateUrl: 'modules/core/views/products.client.view.html'
		})
		.state('products-view', {
			url: '/:productId/view',
			templateUrl: 'modules/core/views/view-product.client.view.html'	
		})
		.state('view-cart', {
			url: '/cart',
			templateUrl: 'modules/core/views/cart.client.view.html'
		});
	}
]);