import { useLayoutEffect, useState } from "react"
import DetailProfile from "./DetailProfile/DetailProfile"
import { checkCookie, getCookie } from "@/services/Cookies"

export default function ViewProfile({user, onClose}){
    // const [user, setUser] = useState({
    //     name: { value: 'Hoang Ba Thien', isDisable: true },
    //     email: { value: 'thienhoang241299@gmail.com', isDisable: true },
    //     password: { value: '********', isDisable: true },
    //     phoneNumber: { value: '0345678912', isDisable: true },
    //     dob: { value: '24/12/1999', isDisable: true },
    //   })
    // const cookie = getCookie('userLogin')
    // const [token, SetToken] = useState('')

    // useLayoutEffect(() => {
    //   if (checkCookie) {
    //     if (getCookie('userLogin')) {
    //       const userLogin = JSON.parse(getCookie('userLogin'))
    //       SetToken(userLogin.accessToken)
    //       setUser(userLogin.user)
    //     } else {
    //       const userLogin = JSON.parse(sessionStorage.getItem('userLogin'))
    //       SetToken(userLogin.accessToken)
    //       setUser(userLogin.user)
    //     }
    //   }
    // }, [cookie])
      
    return (<div className='ViewProfile fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                <div className='relative flex justify-around rounded-lg bg-white p-6 shadow-lg'>
                    <button
                        className='absolute right-2 top-2 text-gray-500 hover:text-gray-700'
                        onClick={onClose}
                    >
                        &times;
                    </button>
                    <DetailProfile user={user}/>
                </div>
            </div>
        )
 }