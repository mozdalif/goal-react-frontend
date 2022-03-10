import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



function GoalItem({ goal }) {
    const dispatch = useDispatch()
    const MySwal = withReactContent(Swal)
    return (
        <div className='goal'>
            <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
            <hr />
            <h2>{goal.text}</h2>

            <button className='btn'
                onClick={() => {
                    MySwal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#d33',
                        cancelButtonColor: '#3085d6',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            console.log("dfkjadskj");
                            dispatch(deleteGoal(goal._id))
                        }
                    })
                }}
            >
                Delete
            </button>
        </div>
    )
}

export default GoalItem
