var annotateInjectable = require('astral-angular-annotate/lib/annotate-injectable');
var deepApply = require('astral-angular-annotate/lib/deep-apply');

module.exports = {
	name: 'angular:annotator:route-resolve',
	prereqs: [
		'angular:annotator:route'
	],
	run: function (ast, info) {
		deepApply(ast, [{
			"type": "CallExpression",
			"callee": {
				"type": "MemberExpression",
				"object": {
					"ngModule": true
				},
				"property": {
					"type": "Identifier",
					"name": "config"
				}
			}
		}], function (routeChunk) {
			deepApply(routeChunk, [{
				"type": "CallExpression",
				"callee": {
					"type": "MemberExpression",
					"property": {
						"type": "Identifier",
						"name": "when"
					}
				},
				"arguments": [ {},
				{
					"type": "ObjectExpression"
				}
				]
			}], function (whenChunk) {
				deepApply(whenChunk, [{
					"type": "Property",
					"key": {
						"type": "Identifier",
						"name": "resolve"
					},
					"value": {
						"type": "ObjectExpression"
					}
				}], function (resolveChunk) {
					deepApply(resolveChunk, [{
						"type": "Property",
						"key": {
							"type": "Identifier"
						},
						"value": {
							"type": "FunctionExpression"
						}
					}], function (resolveIdentifierChunk) {
						resolveIdentifierChunk.value = annotateInjectable(resolveIdentifierChunk.value);
					});
				});
			});
		});
	}
};