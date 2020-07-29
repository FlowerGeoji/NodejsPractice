// import {sequelize, Models} from '../../models';

export const selectUsers = async (options) => {
  const {offset=0, limit=10} = options

  return [
    {id: 1, name: 'geoji'},
    {id: 2, name: 'flower-gejoi'}
  ];
  // return await Models.User.findAll({
  //   offset,
  //   limit,
  //   order: [['name', 'ASC']],
  // });
}

export const selectUser = async (options) => {
  const {id} = options;

  return {id: 1, name: 'geoji'};
}