// import {sequelize, Models} from '../../models';

interface UsersOptions {
  offset: number, limit: number
}
export const selectUsers = async (options: UsersOptions) => {
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

interface UserOptions {
  id?: string, name?: string
}
export const selectUser = async (options: UserOptions) => {
  const {id, name} = options;

  return {id: 1, name: 'geoji'};
}

export const createUser = async (options: UserOptions) => {

}