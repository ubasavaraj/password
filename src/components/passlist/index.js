import {MdDelete} from 'react-icons/md'
import './index.css'

const PassList = props => {
  const {list, view, onDelete} = props
  const {id} = list

  const onDeletebtn = () => {
    onDelete(id)
  }

  return (
    <li>
      <div className="listitem">
        <div>
          <h2 className="head">{list.webName[0]}</h2>
        </div>
        <div>
          <p>{list.webName} </p>
          <p>{list.userName} </p>
          {view ? <p>{list.passWord}</p> : <p>*******</p>}
        </div>
        <div>
          <button type="button" onClick={onDeletebtn}>
            <MdDelete />
          </button>
        </div>
      </div>
    </li>
  )
}

export default PassList
