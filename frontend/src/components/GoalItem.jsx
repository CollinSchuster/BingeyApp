import { useDispatch } from "react-redux"
import { deleteGoal } from '../features/goals/goalSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css/goal.css'


function GoalItem({goal}) { // the {goal} destructures the goal
  const dispatch = useDispatch()
  return (
    <div className="goal">
      <div>
        {new Date(goal.createdAt).toLocaleString('en-US')}
      </div>
      <h2>{goal.text}</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close"><FontAwesomeIcon icon="fa-solid fa-xmark" /></button>
    </div>
  )
}

export default GoalItem
