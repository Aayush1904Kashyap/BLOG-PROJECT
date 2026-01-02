import React, { useEffect, useRef,useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';

const addBlog = () => {

    const editorRef =useRef(null);
    const quillRef=useRef(null);

    const[image,setImage]=useState(false);
    const [title,setTitle]=useState('');
    const [subtitle,setSubtitle]=useState('');
    const [category,setCategory]=useState('');
    const [isPublished,setIsPublished]=useState(false);

    const onSubmitHandler=async(e)=>{
        e.preventDefault();
    }
    const generateContent=async()=>{}

    useEffect(() => {
        if(!quillRef.current && editorRef.current){
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
            });
        }
    },[]);

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
    <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
        <p>Upload Thumbnail</p>
        <label htmlFor="image">
        <img src={!image ? assets.upload_area :URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer'/>
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
        </label>

        <p className='mt-4'>Blog Title</p>
        <input onChange={(e)=>setTitle(e.target.value)} value={title} type="text" placeholder='Enter blog title' className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' required />

        <p className='mt-4'>Blog Subtitle</p>
        <input onChange={(e)=>setSubtitle(e.target.value)} value={subtitle} type="text" placeholder='Enter blog subtitle' className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' required />

        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
            <div ref={editorRef} className='h-60 bg-white border border-gray-300 rounded-lg'></div>
            <button className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hiver:underline cursor-pointer' type='button' onClick={generateContent}>Generate with AI</button>
        </div>

        <p className='mt-4'>Blog Category</p>
        <select  name="category" id="" value={category} onChange={(e)=>setCategory(e.target.value)} className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 rounded outline-none'>
            <option value="">Select Category</option>
           {blogCategories.map((item, index) => {
  return (
    <option key={index} value={item}>
      {item}
    </option>
  );
})}
        </select>
        <div className='flex gap-2 mt-4'>
        <p>Publish Now</p>
        <input type="checkbox" checked={isPublished} onChange={(e)=>setIsPublished(e.target.checked)} className='scale-125 cursor-pointer' />
    </div>
        <button type='submit' className='mt-8 w-40 h-10 bg-primary text-white text-sm rounded-full cursor-pointer hover:bg-primary/90 duration-300'>Add Blog</button>
    </div>
    </form>
  )
}

export default addBlog
