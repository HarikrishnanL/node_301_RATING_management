// const expect = require('chai').expect;
// const sinon = require('sinon');
// const fetchRestaurantApi = require("../src/app/domain/service/fetchRestaurantApi");
// const ratingService = require("../src/app/services/ratingService");
// const raitingController = require("../src/app/controllers/ratingController");


// describe('Rating controller', () => {
//     let res;
//     beforeEach(() => {
        
//         res = { json: function() {} };
      
//       });
//     it('should get a single restrauant response',  async () => {
//         try {
//             const req = {
//                 params: {
//                     restaurantId: 2,
//                     rateId: 2
//                 },
//                 user: {
//                     id: 1,
//                     role: 'abc',
//                     name: 'acshs',
//                     email: 'hari011@mindtree.com',
//                     phoneNumber: '8288871178',
//                     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJyb2xlIjoiQWRtaW4iLCJuYW1lIjoiaGFyaTAwMSIsImVtYWlsIjoiaGFyaTAwMUBtaW5kdHJlZS5jb20iLCJwaG9uZU51bWJlciI6IjgyODg4NzExMDEifSwiaWF0IjoxNjI4NDAzODA5LCJleHAiOjE2Mjg0OTAyMDl9.4tUEsNHlHTt4iAWRhOlHqGXVWBPRk0aiV1y70OWDndE"
//                 }
//             }
//             const fakeCall = sinon.stub(fetchRestaurantApi, 'getRestaurant').returns({ status: false });
//             // console.log(fakeCall, "fakeCall 1 =====>");
//             // let check = await raitingController.getSingleRating(req, res, () => { });
//             //  expect(res).to.have.property('status');
//             // expect(check.statusCode).to.equal(404);
//             expect(async ()=>await fetchRestaurantApi.getRestaurant(req.params.restaurantId,req.user.token)).to.have.property('status')
            
//             // expect(fakeCall.calledOnce).to.be.true;
//             fetchRestaurantApi.getRestaurant.restore();
//         } catch (err) {
//             console.log("error ====> failed herer -", err);
//         }


//     });

// })