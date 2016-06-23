'use strict';


angular.module('core').controller('HomeController', ['$scope', '$stateParams', '$location', 'Authentication', 'Products', 'Categories', 'ProductsByCategory', 'Cart',
	function($scope, $stateParams, $location, Authentication, Products, Categories,ProductsByCategory, Cart) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.currentPage = 1;
		$scope.pageSize = 10;
		$scope.offset = 0;

	   	// Page changed handler
	   	$scope.pageChanged = function() {
	   		$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
	   	};
		// List Categories
		$scope. listCategories = function () {
			$scope.categories = Categories.query();
		}
		// list All products
		$scope.listProducts = function () {
			$scope.products = Products.query();
		}

		//list Product By Category
		$scope.listProductsByCategory = function () {
			$scope.products = ProductsByCategory.query({ 
				categoryId: $stateParams.categoryId
			});
		}
		
		// Find existing Product
		$scope.findOne = function() {
			$scope.product = Products.get({ 
				productId: $stateParams.productId
			});
		};

		// Search for a product
		$scope.productSearch = function (product) {
			$location.path('products/' + product._id);
		};

		$scope.addToCart = function (product_id) {
			// Create new Category object
			var cart = new Cart ({
				quantity: this.quantity,
				product_id: product_id
			});

			// Redirect after save
			cart.$save(function(response) {
				$location.path('/cart');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.cart = function () {
			$scope.cartItems = Cart.query();
		}

		$scope.remove = function (cart) {
			if ( cart ) { 
					cart.$remove();
					$location.path('/cart');
			} else {
				cart.$remove(function() {
					$location.path('/cart');
				});
			}
		}

		$scope.updateQuantity = function (cart) {
			var c = new Cart({
				_id: cart._id,
				quantity: cart.quantity
			});

			c.$update(function() {
				$location.path('cart');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		}

	}
]);