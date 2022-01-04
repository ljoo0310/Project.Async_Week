import axios from 'axios';

//// ACTION TYPES ////

const GET_CLASSROOM = 'GET_CLASSROOM';

//// ACTION CREATORS ////

export const _getClassroom = (classroom) => {
  return {
    type: GET_CLASSROOM,
    classroom
  };
};

//// THUNK CREATORS ////

export const getClassroom = (id) => {
  return async (dispatch) => {
    const { data: classroom } = await axios.get(`/api/classrooms/${id}`);
    dispatch(_getClassroom(classroom));
  };
};

//// SUB-REDUCER

export default (state = {}, action) => {
  switch (action.type) {
    case GET_CLASSROOM:
      return action.classroom;
    default:
      return state;
  }
};
