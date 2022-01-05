import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getClassroom, _getClassroom } from "../store"
import Video from "./Video"


const Classroom = () => {
  const classroom = useSelector(state => state.classroom)

  const dispatch = useDispatch()

  const [ loading, setLoading ] = useState(true);

  const { id } = useParams()

  useEffect(() => {
    dispatch(getClassroom(id))
    setLoading(false)
    return () => { // same as componentWillUnmount
      dispatch(_getClassroom({}))
    }
  }, [])

  if (loading) return <div>Loading...</div>
  if (!classroom) return <h2>Oops! Classroom does not exist!</h2>
  return (
    <div className="single">
      <h2>Welcome to {classroom.name}!</h2>
      <Video />
    </div>
  )
}

export default Classroom
