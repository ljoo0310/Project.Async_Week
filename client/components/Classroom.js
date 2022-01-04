import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getClassroom, _getClassroom } from "../store"

const Classroom = props => {
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
  return (
    <div className="single">
      {!classroom
        ? <h1>Oops! Classroom does not exist!</h1>
        : <div>
            <h1>Name: {classroom.name}</h1>
            <img src={classroom.imageUrl} />
            <h2>Address: {classroom.address}</h2>
            <p><b>Description:</b> {classroom.description}</p>
            {/* <div className="editDelete">
              <Link to={`/classrooms/edit/${classroom.id}`}>Edit</Link>
              <button type="button" onClick={() => this.props.deleteClassroom(classroom.id)}>Delete</button>
            </div> */}
            {/* <ListStudents students={classroom.students} isEdit={isEdit} /> */}
          </div>
        }
      </div>
  )
}

export default Classroom
