const mongoose = require('mongoose');
// eslint-disable-next-line import/no-unresolved
const chai = require('chai');
// eslint-disable-next-line import/no-unresolved
const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../index');
const factory = require('../factories');

const User = mongoose.model('User');
const Tweet = mongoose.model('Tweet');

describe('Like', () => {
  beforeEach(async () => {
    await User.deleteMany();
    await Tweet.deleteMany();
  });

  it('it should be able to like an tweet', async () => {
    const tweet = await factory.create('Tweet');

    const user = await factory.create('User');
    const jwtToken = user.generateToken();

    const response = await chai.request(app)
      .post(`/api/like/${tweet.id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send();

    expect(response.body.likes).to.include(user.id);
  });
});
