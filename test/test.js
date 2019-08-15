var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var baseUrl = "http://swapi.co/api/";
var util = require("util");
var assert = require("assert");

//Could this task be implemented through pythonic decorators ?
function time(target, key, descriptor){
	const origFunc = descriptor.value.bind(target);

	let i = 0;
	descriptor.value = function (...args) {
		let id = i++;
		console.time(key + id);
		let value = origFunc(...args);
		console.timeEnd(key + id);
		return value
    }
}

describe("3POSuite",
	function(){
	beforeEach(function () {
		console.time()
    });
	afterEach(function () {
		console.timeEnd()
    });
	it('3POTestCase', function(done){
		this.timeout(5000);
		setTimeout(done, 300);
		request.get({
			url: baseUrl + "people/2", 
		},
		function(err, resp, body){
			expect(resp.statusCode).to.equal(200);
			var threePO = JSON.parse(body);
			assert.equal(75, threePO['mass']);
			console.log(body);
			console.log("3POTestCase Finished");
		done();
		});
	});
	it('verifyThreePOHeight', function (done) {
		this.timeout(5000);
		setTimeout(done, 1000);
		request.get({
			url: baseUrl+"people/2"
		},
			function (err, resp, body) {
				expect(resp.statusCode).to.equal(200);
				var threePO = JSON.parse(body);
				should.equal("167", threePO['height']);
				console.log("verifyThreePOHeight finished")
            })
    })
});

