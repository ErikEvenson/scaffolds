'use strict';
/* global describe, it */
var chai = require('chai');
var expect = chai.expect;
var UserProvider = require('../../server/providers/userProvider').UserProvider;

describe('Persistence', function(){
    describe('#UserProvider', function(){
        it('should exist', function(){
            expect(UserProvider).to.not.equal(undefined);
        });
    });
});
