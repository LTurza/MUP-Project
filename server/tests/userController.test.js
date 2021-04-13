const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../server')
const db = require('./../utils/dbConnection')

chai.use(chaiHttp)
chai.should()

const { expect } = chai

describe ('userController', () => {
  after(() => {
    return db.dropCollection('users')
  }) 

  describe('Create new user', () => {
    it('should response with status 201 if successfuly', (done) => {
      chai.request(app).post('/user/signUp').send({
          firstName: 'test',
          lastName: 'test',
          password: 'qwqwqwqwqw',
          email: 'test@test.com'
      }).end((err, res) => {
        expect(res.status).to.eq(201)
        expect(err).to.be.null
        done()
      })
    })

    it('should response with status 409 if user already exists', (done) => {
      chai.request(app).post('/user/signUp').send({
          firstName: 'test',
          lastName: 'test',
          password: 'qwqwqwqwqw',
          email: 'test@test.com'
      }).end((err, res) => {
        expect(res.status).to.eq(409)
        expect(err).to.be.null
        done()
      })
    })
  })
})
