const expect = require('chai').expect;
const sinon = require('sinon');
const RatingModel = require('../src/app/models/RatingModel');
const ratingService = require('../src/app/services/ratingService');


describe("Rating service test suites", () => {
    it("should get one rating from database", async () => {
       
        let stubValue ={
            rateId:2,
            customer:{
                id:1,
                name:"Hari",
            },
            resturant:{
                id:2,
                dish:"krishnan"
            }
        }
       let fakeCall =  sinon.stub(RatingModel, 'findOne').resolves();


        
        expect(async ()=> await ratingService.getSingleRating(stubValue.rateId,stubValue.customer,stubValue.resturant)).to.have.property('status')
      
       expect(fakeCall.calledOnce).to.be.true;
        expect(check).to.throw('Such rating not found');

        RatingModel.findOne.restore();

    })
})