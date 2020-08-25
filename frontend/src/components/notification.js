import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {hideNotification} from '../reducers/notification'


const Notification = () => {
  const notification = useSelector(state => state.notification)
  const message = notification.text
  const alertTime = notification.time

  const dispatch = useDispatch()

  if (message === "") {
    return null
  }

  let timeoutToBeClearedIndex = window.setTimeout(()=>null, 0) - 2
  window.clearTimeout(timeoutToBeClearedIndex)

  setTimeout(() => {
    dispatch(hideNotification())
  }, alertTime)


  return (
    <div id="notification">
      {message}
    </div>
  )
}

export default Notification