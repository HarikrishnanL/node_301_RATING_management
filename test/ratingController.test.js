const expect = require('chai').expect;
const sinon = require('sinon');
const fetchRestaurantApi = require("../src/app/domain/service/fetchRestaurantApi");
const ratingService = require("../src/app/services/ratingService");
const raitingController = require("../src/app/controllers/ratingController");


describe('Rating controller', () => {
    it('should get a single restrauant response',  (done) => {


        const req = {
            params: {
                restaurantId: 200
            },
            user: {
                id: 1,
                role: 'abc',
                name: 'acshs',
                email: 'hari011@mindtree.com',
                phoneNumber: '8288871178',
                token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJyb2xlIjoiQWRtaW4iLCJuYW1lIjoiaGFyaTAwMSIsImVtYWlsIjoiaGFyaTAwMUBtaW5kdHJlZS5jb20iLCJwaG9uZU51bWJlciI6IjgyODg4NzExMDEifSwiaWF0IjoxNjI4NDAzODA5LCJleHAiOjE2Mjg0OTAyMDl9.4tUEsNHlHTt4iAWRhOlHqGXVWBPRk0aiV1y70OWDndE"
            }
        }
        sinon.stub(fetchRestaurantApi, 'getRestaurant');
        fetchRestaurantApi.getRestaurant.returns({status:false});
       
       expect( async ()=> await raitingController.getSingleRating(req,{},()=>{})).to.have.property("message");;
    // raitingController.getSingleRating(req,{},()=>{}).then(result=>{
    //     console.log("result from controller =>>",result)
    //     expect(result).to.be.property("message");
    //     done();
    // }).catch(err=>{
    //     console.log("errr ====>",err)
    // })   
        fetchRestaurantApi.getRestaurant.restore();
       
        
    });

})