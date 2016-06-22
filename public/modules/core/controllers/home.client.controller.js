'use strict';


angular.module('core').controller('HomeController', ['$scope', '$stateParams', '$location', 'Authentication', 'Products', 'Categories', 'ProductsByCategory',
	function($scope, $stateParams, $location, Authentication, Products, Categories,ProductsByCategory) {
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
		
		// Search for a product
		$scope.productSearch = function(product) {
			$location.path('products/' + product._id);
		};

	}
	]);