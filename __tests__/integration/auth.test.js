const mongoose = require('mongoose');
// eslint-disable-next-line import/no-unresolved
const chai = require('chai');
// eslint-disable-next-line import/no-unresolved
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const nodemailer = require('nodemailer');

const transport = {
  sendMail: sinon.spy(),
};

sinon.stub(nodemailer, 'createTransport').returns(transport);

const { expect } = chai;

chai.use(chaiHttp);

const app = require('../../index');
const factory = require('../factories');

const User = mongoose.model('User');

describe('Authentication', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  describe('Sign up', () => {
    it('it should be able to sign up, dogg', async () => {
      const user = await factory.attrs('User');

      const response = await chai.request(app)
        .post('/api/signup')
        .send(user);

      expect(response.body).to.have.property('user');
      expect(response.body).to.have.property('token');
    });

    it('it should not be able to sign up with duplicates, remember that yo punk!', async () => {
      const user = await factory.create('User');

      const user2 = await factory.attrs('User', {
        email: user.email,
      });

      console.log(user);
      console.log(user2);

      const response = await chai.request(app)
        .post('/api/signup')
        .send(user2);

      expect(response).to.have.status(400);
      expect(response.body).to.have.status('error');
    });
  });

  describe('Sign in', () => {
    it('it should be fucking able to authenticate with valid credentials, do you feel me?', async () => {
      const user = await factory.create('User', {
        password: 'batman123',
      });

      const response = await chai.request(app)
        .post('/api/signin')
        .send({ email: user.email, password: 'batman123' });

      expect(response.body).to.have.property('user');
      expect(response.body).to.have.property('token');
      expect(transport.sendMail.calledOnce).to.be.true;
    });

    it('it sould not be able to signin with nonexistent user, ya got it??', async () => {
      const response = await chai.request(app)
        .post('/api/signin')
        .send({ email: 'hehe@.com', password: 'batman123' });

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('error');
    });

    it('it should be fucking able to authenticate with valid credentials, do you feel me?', async () => {
      const user = await factory.create('User', {
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
