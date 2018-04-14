'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

const {app, runServer, closeServer} = require('../server');

chai.use(chaiHttp);
app.use(morgan('common'));


describe('baseTest', function() {

	before(function() {
		return runServer();
	});

	after(function() {
		return closeServer();
	});


	it('should return status of 200', function() {
		return chai.request(app)
		.get('/')
		.then(function(res) {
			expect(res).to.have.status(200);
		});
	});

});