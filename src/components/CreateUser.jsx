import React from 'react'
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { createUser } from '../helper/helper';


export default function CreateUser() {

  const { register, handleSubmit, resetField } = useForm();

    const queryClient = useQueryClient();
  const addMutation = useMutation(createUser, {
    //sau khi new user is added thi tu dong fetch lai all users de cap nhat UI
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    }
  });

  const onSubmit = async (data) => {
    console.log(data);
    if(data) {
      await addMutation.mutate(data);
      console.log("data created successful");
      resetField('fullname');
      resetField('email');
      resetField('imgUrl');
    }
  }

  return (
    <div className="form py-10">
        <form id="form" className='flex gap-4' onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register('fullname')} placeholder="Full Name" className="form-input"/>    
            <input type="text" {...register('email')} placeholder="@email" className="form-input"/>    
            <input type="text" {...register('imgUrl')} placeholder="ImgUrl" className="form-input"/>    
            <input type="text" {...register('status')} hidden value="active" className="form-input"/>    
            <button className='bg-indigo-500 px-5 rounded text-gray-50'>create</button>   
        </form>    
    </div>
  )
}
