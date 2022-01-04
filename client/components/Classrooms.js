import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import { getClassrooms } from "../store";
import ClassroomItem from "./ClassroomItem";

const Classrooms = () => {
  const classrooms = useSelector(state => state.classrooms);

  const dispatch = useDispatch();

  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    dispatch(getClassrooms());
    setLoading(false);
  }, [])

  if (loading) return <div>Loading...</div>;

  return (
    <div className="all">
      <h2>Classrooms</h2>
      {/* <Link to="/classrooms/create">Create a New Classroom</Link> */}
      {classrooms.length < 1
        ? <p>No Classrooms</p>
        : classrooms.map(classroom => <ClassroomItem classroom={classroom} key={classroom.id} />)}
    </div>
  )
}

export default Classrooms;
