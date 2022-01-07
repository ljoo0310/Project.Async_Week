import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import history from '../history'
import { getClassroom, _getClassroom } from "../store"
import Video from "./Video"


const Classroom = () => {
  const { auth, classroom } = useSelector(state => state)
  const { isLoggedIn } = useSelector(state => ({
    isLoggedIn: !!state.auth.id
  }));

  const dispatch = useDispatch()

  const [ loading, setLoading ] = useState(true);

  const { id } = useParams()

  useEffect(() => {
    dispatch(getClassroom(id))
    setLoading(false)
    return () => { // same as componentWillUnmount
      dispatch(_getClassroom({}))
    }
    // if (!isLoggedIn) {
    //   window.alert('You must be logged in to enter a classroom!')
    //   history.push('/login')
    // } else {
    //   dispatch(getClassroom(id))
    //   setLoading(false)
    //   return () => { // same as componentWillUnmount
    //     dispatch(_getClassroom({}))
    //   }
    // }
  }, [])

  if (loading) return <div>Loading...</div>
  if (!classroom) return <h2>Oops! Classroom does not exist!</h2>

  return (
    <div className="single">
      <h2>Welcome to {classroom.name}!</h2>
      <Video />
      {/* {auth.classroomId === classroom.id ? (
        <div>
          <h2>Welcome to {classroom.name}!</h2>
          <Video />
        </div>
      ) : (
        <h2>Sorry, you need to be registered for this classroom first!</h2>
      )} */}
    </div>
  )
}

export default Classroom
