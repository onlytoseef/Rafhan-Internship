import React from 'react';
import { useForm } from 'react-hook-form';
import { firestore, storage, collection, addDoc } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const InternshipForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      // Upload passport size picture to Firebase Storage
      const file = data.picture[0];
      const storageRef = ref(storage, file.name);
      await uploadBytes(storageRef, file);
      const fileUrl = await getDownloadURL(storageRef);

      // Save form data to Firestore
      await addDoc(collection(firestore, 'applications'), {
        ...data,
        picture: fileUrl,
      });
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting application: ', error);
      alert('Error submitting application');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 p-4 bg- rounded'
    >
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <label className='block text-white'>
          First Name:
          <input
            type='text'
            {...register('firstName', { required: true })}
            className='mt-1 block w-full p-1  border active:outline-[#67B337] focus:outline-[#67B337]  border-gray-300 rounded-md text-black'
          />
        </label>
        <label className='block  text-white'>
          Last Name:
          <input
            type='text'
            {...register('lastName', { required: true })}
            className='mt-1 focus:outline-[#67B337] block w-full p-1 border border-gray-300 rounded-md text-black '
          />
        </label>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <label className='block text-white'>
          Email Address:
          <input
            type='text'
            {...register('email', { required: true })}
            className='mt-1 block w-full p-1  border active:outline-[#67B337] focus:outline-[#67B337]  border-gray-300 rounded-md text-black'
          />
        </label>
        <label className='block  text-white'>
          Recent Degree:
          <input
            type='text'
            {...register('degree', { required: true })}
            className='mt-1 focus:outline-[#67B337] block w-full p-1 border border-gray-300 rounded-md text-black'
          />
        </label>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <label className='block  text-white'>
          Date of Birth:
          <input
            type='date'
            {...register('dob', { required: true })}
            className='mt-1 focus:outline-[#67B337] block w-full p-1 border border-gray-300 rounded-md text-black'
          />
        </label>
        <label className='block  text-white'>
          Age:
          <input
            type='number'
            {...register('age', { required: true })}
            className='mt-1 focus:outline-[#67B337] block w-full p-1 border border-gray-300 rounded-md text-black'
          />
        </label>
      </div>
      <div className='grid grid-cols-1 items-center lg:grid-cols-2 gap-4'>
        <label className='block  text-white'>
          Your Resume:
          <input
            type='file'
            {...register('picture', { required: true })}
            className='mt-1 focus:outline-[#67B337] block sm:w-[15vw] border border-gray-300 rounded-md text-black'
          />
        </label>
        <label className='block  text-white'>
          Passport Size Picture:
          <input
            type='file'
            {...register('picture', { required: true })}
            className='mt-1 focus:outline-[#67B337] block sm:w-[15vw] w-full border border-gray-300 rounded-md text-black'
          />
        </label>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <label className='block  text-white'>
          Permanent Address:
          <input
            type='text'
            {...register('address', { required: true })}
            className='mt-1 focus:outline-[#67B337] block w-full p-1 border border-gray-300 rounded-md text-black'
          />
        </label>
        <label className='block  text-white'>
          CNIC Number:
          <input
            type='text'
            {...register('cnic', { required: true })}
            className='mt-1 focus:outline-[#67B337] block w-full p-1 border border-gray-300 rounded-md text-black'
          />
        </label>
      </div>
      <label className='block  text-white'>
        <input
          type='checkbox'
          {...register('agreeToRules', { required: true })}
          className='mr-2 focus:outline-[#67B337] leading-tight'
        />
        Agree to Company Rules
      </label>
      <button
        type='submit'
        className='mt-4 focus:outline-[#67B337] sm:w-[20vw] bg-[#67B337] text-white w-[30vw] py-2 rounded-md  hover:bg-[#67B337]'
      >
        Submit
      </button>
    </form>
  );
};

export default InternshipForm;
