import {useNavigate} from 'react-router-dom'
import APICaller from '../utils/APICaller'
import React from 'react'
export default function Protected() {
  const [isAuth, setIsAuth] = React.useState(false)
  const [role, setRole] = React.useState('')
  const navigate = useNavigate()
  React.useEffect(() => {
    APICaller('Customer/GetCurrentCustomer', 'GET', null).then((res) => {
      if (res.data) {
        setIsAuth(true)
        setRole(res.data.roleId)
      } else {
        setIsAuth(false)
      }
    }).catch((err) => {
      setIsAuth(false)
    })
  }, [])
  if (isAuth && role === 2) {
    return navigate("/admin")
  } else if (isAuth && role === 1) {
    return navigate("/")
  } else {
    navigate("/dang-nhap")
  }
}