'use strict';

angular.module('products').factory('Products', ['$resource',
	function($resource) {
		return $resource('products/:productId', { productId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
angular.module('products').factory('ProductsByCategory', ['$resource',
	function($resource) {
		return $resource('products/:categoryId/category', { productId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);