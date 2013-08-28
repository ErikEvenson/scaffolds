'use strict';
/* global chai, describe, it */
var chai = require('chai');
var expect = chai.expect;

describe('Persistence', function(){
    describe('#UserProvider', function(){
        it('should exist', function(){
            var UserProvider = require('../../server/providers/userProvider').UserProvider;
            expect(UserProvider).to.not.equal(undefined);
        });
    });
});
