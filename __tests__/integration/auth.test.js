const mongoose = require('mongoose');
// eslint-disable-next-line import/no-unresolved
const chai = require('chai');
// eslint-disable-next-line import/no-unresolved
const chaiHttp = require('chai-http');

const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../index');

const User = mongoose.model('User');

describe('Authentication', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  describe('Sign in', () => {
    it('it should be fucking able to authenticate with valid credentials, do you feel me?', async () => {
      const user = await User.create({
        name: 'Hugo Matheus',
        username: 'hbg',
        email: 'hbgcorp@tech.com',
        password: 'batman123',
      });

      const response = await chai.request(app)
        .post('/api/signin')
        .send({ email: user.email, password: 'batman123' });

      expect(response.body).to.have.property('user');
      expect(response.body).to.have.property('token');
    });

    it('it sould not be able to signin with nonexistent user, ya got it??', async () => {
      const response = await chai.request(app)
        .post('/api/signin')
        .send({ email: 'hehe@.com', password: 'batman123' });

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('error');
    });

    it('it should be fucking able to authenticate with valid credentials, do you feel me?', async () => {
      const user = await User.create({
        name: 'Hugo Matheus',
        username: 'hbg',
        email: 'hbgcorp@tech.com',
        password: 'batman123',
      });

      const response = await chai.request(app)
        .post('/api/signin')
        .send({ email: user.email, password: 'batman' });

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('error');
    });
  });
});
