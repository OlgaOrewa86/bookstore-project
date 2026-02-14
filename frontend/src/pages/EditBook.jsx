import React, { useState, useEffect } from 'react';
import BackButtom from '../components/BackButtom';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';


const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
  const editBook = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:4000/books/${id}`);
      setAuthor(res.data.author);
      setPublishYear(res.data.publishYear)
      setTitle(res.data.title);
    } catch (err) {
      alert('An error happened. Please check the console')
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
    editBook();
  }, [id]);

  const handleEditBook = async () => {
    const data = { title, author, publishYear };
    setLoading(true);
    try {
      await axios.put(`http://localhost:4000/books/${id}`, data);
      toast.success('Book Edited Successfully');
      navigate('/');
    } catch (err) {
      toast.error('Error');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='p-4'>
      <BackButtom/>
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />

        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='text'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBook
