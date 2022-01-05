import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { deleteCampus } from '../redux/allCampuses';

const ClassroomItem = ({ classroom }) => {
  return (
    <div className="item">
      <h2><Link to={`/classrooms/${classroom.id}`}>{classroom.name}</Link></h2>
      <img src={classroom.imageUrl} />
    </div>
  )
};

export default ClassroomItem
