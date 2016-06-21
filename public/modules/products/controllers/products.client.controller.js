'use strict';

// Products controller
angular.module('products')
	.controller('ProductsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Products',
		function($scope, $stateParams, $location, Authentication, Products) {
			$scope.authentication = Authentication;
		  	$scope.currentPage = 1;
		  	$scope.pageSize = 10;
		  	$scope.offset = 0;

		   // Page changed handler
		   $scope.pageChanged = function() {
		  		$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		   };

			// Create new Product
			$scope.create = function() {
				// Create new Product object
				var product = new Products ({
					name: this.name,
					description: this.description,
					unit_price: this.unit_price,
					stock: this.stock,
					category_id: this.category_id,
				});

				// Redirect after save
				product.$save(function(response) {
					$location.path('products/view/' + response._id);

					// Clear form fields
					$scope.name = '';
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			};

			// Remove existing Product
			$scope.remove = function(product) {
				if ( product ) { 
					product.$remove();

					for (var i in $scope.products) {
						if ($scope.products [i] === product) {
							$scope.products.splice(i, 1);
						}
					}
				} else {
					$scope.product.$remove(function() {
						$location.path('products');
					});
				}
			};

			// Update existing Product
			$scope.update = function() {
				var product = $scope.product;

				product.$update(function() {
					$location.path('products/' + product._id);
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			};

			// Find a list of Products
			$scope.find = function() {
				$scope.products = Products.query();
			};

			// Find existing Product
			$scope.findOne = function() {
				$scope.product = Products.get({ 
					productId: $stateParams.productId
				});
			};

			// Search for a product
			$scope.productSearch = function(product) {
				$location.path('products/' + product._id);
			};
		}
]);