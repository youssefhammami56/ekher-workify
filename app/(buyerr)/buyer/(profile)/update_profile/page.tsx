import React from 'react'
import SingleUpdateProfile from '../_compoenets/singleupdateprofile'
import { getLoggedUser } from "@/actions/get-logged-user";


const Page=async()=> {

  const user=await getLoggedUser();
  return (
    <div>
        <SingleUpdateProfile user={user} />
    </div>
  )
}

export default Page