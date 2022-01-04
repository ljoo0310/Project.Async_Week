import axios from 'axios'

//// ACTION TYPES ////

const GET_CLASSROOMS = 'GET_CLASSROOMS';

//// ACTION CREATORS ////

const _getClassrooms = (classrooms) => ({
  type: GET_CLASSROOMS,
  classrooms
});

//// THUNK CREATORS ////

export const getClassrooms = () => {
  return async (dispatch) => {
    try {
      const { data: classrooms } = await axios.get('/api/classrooms')
      dispatch(_getClassrooms(classrooms))
    } catch (error) {
      console.error('🧑🏻‍💻 Error while getting all classrooms in thunk!');
    }
  };
};

//// SUB-REDUCER ////

export default (state = [], action) => {
  switch (action.type) {
    case GET_CLASSROOMS:
      return action.classrooms;
    default:
      return state;
  }
};
