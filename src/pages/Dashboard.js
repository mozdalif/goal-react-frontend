import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { reset } from '../features/goals/goalSlice'
import { getGoals } from '../features/goals/goalThunk'
import { toast } from 'react-toastify'

function Dashboard() {

  const { user } = useSelector(state => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      // toast.error(message)
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    // return () => {
    //   dispatch(reset())
    // }
  }, [user, navigate, isError, message, dispatch, getGoals])


  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />
      <br />
      <hr />
      <br />
      <section className='content'>
        {goals?.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  )
}


export default Dashboard
