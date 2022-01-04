import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { deleteCampus } from '../redux/allCampuses';

const ClassroomItem = ({ classroom }) => {
  const dispatch = useDispatch();

  return (
    <div className="item">
      <h2>
        <Link to={`/classrooms/${classroom.id}`}>{classroom.name}</Link>
      </h2>
      <img src={classroom.imageUrl} />
      {/* <button type="button" onClick={() => dispatch(deleteCampus(classroom.id))}>Delete</button> */}
      <button type="button" onClick={() => {}}>Delete</button>
    </div>
  )
};

export default ClassroomItem
