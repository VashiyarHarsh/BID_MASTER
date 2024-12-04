import { request } from 'chai-http';

const baseUrl = 'https://bid-master-backend.vercel.app/'; 

describe('BidController--Ongoing Auction backend Testing', () => {
 
  it('[user] bidding for Products ', (done) => {
    request.execute(baseUrl)
      .post('/api/placeBid')
      .send({productName: "watch23", userEmail: "abc@gmail.com", BidAmt: "123"})
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done();
      });
  });
 
  it('After time out Product Database Updations', (done) => {
    request.execute(baseUrl)
      .get('/api/updateProductDB')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        // console.log(res)
        done();
      });
  });

  it('After time out User Database Updations', (done) => {
    request.execute(baseUrl)
      .get('/api/updateBoughtItems')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        // console.log(res)
        done();
      });
  });
 
 
});