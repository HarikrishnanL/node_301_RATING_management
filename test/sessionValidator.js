const expect = require('chai').expect;
const sessionValidatorUtils = require('../src/app/utils/sessionValidatorUtils');
const jwt = require("jsonwebtoken");
const sinon =  require('sinon');
const jwtAuthUtils = require("../src/app/utils/jwtAuthUtils");


describe('Testing session validator ', () => {

    it('should throw an error if no header is present', () => {
        const req = {
            get: () => {
                return null;
            }
        }
        expect(() => sessionValidatorUtils.sessionAuthValidator(req, {}, () => { })).to.throw('AuthToken required')
    })

    it('should throw an error if the token cannot is wrong', () => {
        const req = {
            get: () => {
                return 'Bearer abc';
            }
        }
        expect(() => sessionValidatorUtils.sessionAuthValidator(req, {}, () => { })).to.throw();
    })

    it('should decode token and should  return user object', () => {
        const req = {
            get: () => {
                return 'Bearer joiaGFyaTAwMSIsImVtYWlsIjoiaGFyaTAwMUBtaW5kdHJlZS5jb20iLCJwaG9uZU51bWJaWF0IjoxNj';
            }
        }

        sinon.stub(jwtAuthUtils,'decode');
        jwtAuthUtils.decode.returns({
            id: 1,
            role: 'abc',
            name: 'acshs',
            email: 'hari011@mindtree.com',
            phoneNumber: '8288871178'
        })
        sessionValidatorUtils.sessionAuthValidator(req, {}, () => { });
        expect(req).to.have.property('user');
        expect(req.user).to.have.property('email');
        // expect(req.user).to.have.keys('role');
        expect(jwtAuthUtils.decode.called).to.be.true;
        jwtAuthUtils.decode.restore();
    })
})