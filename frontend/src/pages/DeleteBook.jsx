import React, { useState } from 'react';
import BackButtom from '../components/BackButtom';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';


const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  const handleDeleteBook = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:4000/books/${id}`);
      toast.success('Book Deleted Successfully');
      navigate('/')
    } catch (err) {
      toast.error('Error');
      console.log(err);
    } finally {
      setLoading(false);
    }

  }
  return (
    <div className='p-4'>
      <BackButtom />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner/ > : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-150 p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>Yes, Delete it</button>

      </div>
      
    </div>
  )
}

export default DeleteBook
