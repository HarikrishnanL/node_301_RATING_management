// const expect = require('chai').expect;
// const sinon = require('sinon');
// const RatingModel = require('../src/app/models/RatingModel');
// const ratingService = require('../src/app/services/ratingService');


// describe("Rating service test suites", () => {

//     it("should get one rating from database", async () => {

//         let stubValue = {
//             rateId: 2,
//             customer: {
//                 id: 1,
//                 name: "Hari",
//             },
//             resturant: {
//                 id: 2,
//                 dish: "krishnan"
//             }
//         }
//         let fakeCall = sinon.stub(RatingModel, 'findOne').returns({
//             id: 2,
//             "reviewComments": "welcome jungle",
//             rating: 4,
//             status: 1
//         });

//         let check = await ratingService.getSingleRating(stubValue.rateId, stubValue.customer, stubValue.resturant);
//         expect(check).to.have.property("rating")
//         expect(fakeCall.calledOnce).to.be.true;
//         RatingModel.findOne.restore();

//     });

//     it("should throw error if no  rating is available  from database",  (done) => {        
//         let stubValue = {
//             rateId: 2,
//             customer: {
//                 id: 1,
//                 name: "Hari",
//             },
//             resturant: {
//                 id: 2,
//                 dish: "krishnan"
//             }
//         }
//         sinon.stub(RatingModel, 'findOne').returns(null);
//         ratingService.getSingleRating(stubValue.rateId, stubValue.customer, stubValue.resturant)
//             .then((data)=>{
//                 console.log("data ====>",data);
//                 done()
//             }).catch(err=>{
//                 expect(err.statusCode).to.throw('404')
//                 done(err)
//             })
//         RatingModel.findOne.restore();
 
//     })

//     it("should throw error if  database throws", async () => {

//         let stubValue = {
//             rateId: 2,
//             customer: {
//                 id: 1,
//                 name: "Hari",
//             },
//             resturant: {
//                 id: 2,
//                 dish: "krishnan"
//             }
//         }
//         sinon.stub(RatingModel, 'findOne').throws();
//         expect(()=>  awaitratingService.getSingleRating(stubValue.rateId, stubValue.customer, stubValue.resturant)).to.throw()
//         RatingModel.findOne.restore();

//     })
// })