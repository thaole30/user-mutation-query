import React from 'react'
import 'boxicons';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import { deleteUser, getAllUsers } from './../helper/helper';

export default function Users() {

    console.log(useQuery('users', getAllUsers))
  const { data, status, error, isFetching, isError } = useQuery("users", getAllUsers);

    const queryClient = useQueryClient();
    const deleteMutation = useMutation(deleteUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        }
    });

    const handleDelete = async (e) => {
        console.log("elm", e.target);
        console.log("elm delete id", e.target.dataset.deleteId);
        if(e.target.dataset.deleteId) {
            await deleteMutation.mutate(e.target.dataset.deleteId);
            console.log("user deleted successfully");
        }
    }

  return (
    <div className="users grid grid-cols-3 justify-center gap-20">
        {
          isFetching ? <div>Background Updating...</div> : <></>
        }

        {
          (status == "success") ? data.map( (user, i) => <UserComponent key={i} data={user} handleDelete={handleDelete}></UserComponent>) : <></>
        }
    </div>
  )
}


function UserComponent({ data, handleDelete}){
    if(!data) return <></>;
    let flag = data.status == "active" ? 'bg-green-300' :'bg-gray-300';
    return (
        <div className="relative profile py-10 px-5 flex flex-col justify-center items-center text-center gap-4 ">
            <div className="img relative">
                <img src={data.imgUrl} className="w-24" alt="" />   
                <h5 className={`status ${flag}`}></h5>
            </div>
        
            <div className="details text-gray-600">
                <h1 className='text-md'>{data.name}</h1>
                <h5 className='text-xs'>{data.email}</h5>        
            </div>
            {/* <div data-id={data.id} className='w-full h-full absolute'></div> */}
            <button onClick={handleDelete} className='delete py-2' ><box-icon data-delete-id={data.id} color="rgb(248 113 113)" name='trash'></box-icon></button>

        </div> 
    )
}