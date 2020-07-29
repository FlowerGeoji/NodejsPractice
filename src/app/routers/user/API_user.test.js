import 'babel-polyfill';
import app from '../../index';
import {sequelize, Models} from '../../models';
import {v4 as uuid4} from 'uuid'
import request from 'supertest';

describe('ROUTER /users', () => {
  const server = request(app);
  const TEST_ID = '0189f59b-d1de-4a43-86d0-2904ea638efc';
  const USERS = [
    {id: TEST_ID, name: 'aflower'},
    {id: uuid4(), name: 'geoji'},
    {id: uuid4(), name: 'flower-gejoi'}, {id: uuid4(), name: 'kim'},
    {id: uuid4(), name: 'gyujae'}, {id: uuid4(), name: 'kim-gyujae'},
    {id: uuid4(), name: 'jung'}, {id: uuid4(), name: 'sunju'},
    {id: uuid4(), name: 'jung-sunju'}, {id: uuid4(), name: 'gaji'},
    {id: uuid4(), name: 'gaji-geoji'}, {id: uuid4(), name: 'test'},
  ];

  beforeAll(()=>{
    return sequelize.sync({force: true, alter: true});
  })
  beforeAll(()=>{
    
    return Models.User.bulkCreate(USERS);
  })

  afterAll(done=>{
    console.log('Server will close')
    app.close()
    done()
  })

  describe.only('GET /users', ()=>{
    describe('Success', ()=>{
      test('유저 객체 배열 반환', async () => {
        const response = await server.get('/users')
        .expect(200)
        .expect('Content-Type', /json/)
  
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toHaveLength(10);
      })
  
      test('limit 개수 만큼 응답한다', async () => {
        const response1 = await server.get('/users?limit=2')
        .expect(200)
        expect(response1.body).toHaveLength(2)
  
        const response2 = await server.get('/users')
        .expect(200)
        expect(response2.body).toHaveLength(10)
      })
    })
  
    describe('Failed', ()=>{
      test('잘못된 limit', async () => {
        const response = await server.get('/users?limit=tow')
        .expect(400)

        expect(response.body).toHaveProperty('error')
      })
    })
  })

  describe.only('GET /users/:id', ()=>{
    describe('Success', ()=>{
      test(`id=${TEST_ID} 인 유저가 조회된다`, async ()=>{
        const response = await server.get(`/users/${TEST_ID}`)
        .expect(200);

        expect(response.body).toHaveProperty('id', TEST_ID);
        expect(response.body).toHaveProperty('name', 'aflower');
      })
    })
  
    describe('Failed', ()=>{
      test('유저가 존재하지 않으면 404를 반환한다.', async ()=>{
        const response = await server.get('/users/-1').expect(404)
        expect(response.body).toHaveProperty('error')
      })
    })
  })

  describe('POST /users', ()=>{
    describe.only('Success', ()=>{
      const NAME = 'Added flower';
      let ID = '';

      beforeAll(async ()=>{
        const response = await server.post('/users').send({
          name: NAME
        })
        .expect(201)

        expect(response.body).toHaveProperty('data')
        ID = response.body.data;
      })

      test('생성된 유저 검색', async ()=>{
        const response = await server.get(`/users/${ID}`).expect(200);

        expect(response.body).toHaveProperty('data', {id: ID, name: NAME})
      })
    })

    describe('Failed', ()=>{
      test('name 파라미터 누락시', async ()=>{
        await server.post('/users').send({}).expect(400);
      })

      test('name이 중복일 경우', async ()=>{
        await server.post('/users').send({name: 'gyujae'}).expect(409);
      })
    })
  })

  describe('PUT /users/:id', ()=>{
    const NAME = 'Changed';

    describe('Success', ()=>{
      test('name 변경', async ()=>{
        await server.put('/users/1').send({name: NAME}).expect(200);
      })
    })

    describe('Failed', ()=>{
      test('정수가 아닌 id', async ()=>{
        await server.put('/users/two').send({name: NAME}).expect(400);
      })

      test('name이 없을 경우', async ()=>{
        await server.put('/users/2').send({}).expect(400);
        await server.put('/users/2').send({name: ' '}).expect(400);
      })

      test('없는 유저일 경우', async ()=>{
        await server.put('/users/-2').send({name: NAME}).expect(404);
      })

      test('name이 중복일 경우', async ()=>{
        await server.put('/users/2').send({name: NAME}).expect(409);
      })
    })
  })

  describe('DELETE /users/:id', ()=>{
    describe('Success', ()=>{
      test('id가 1인 유저 삭제', async ()=>{
        await server.delete('/users/1').expect(204)
      })
    })

    describe('Failed', ()=>{
      test('id가 숫자가 아닐 경우', async ()=>{
        const response = await server.delete('/users/one').expect(400)
        expect(response.body).toHaveProperty('error')
      })

      test('없는 유저일 경우', async ()=>{
        const response = await server.delete('/users/-1').expect(404)
        expect(response.body).toHaveProperty('error')
      })
    })
  })
})