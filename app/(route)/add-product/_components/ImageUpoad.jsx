"use client"
import Image from 'next/image'
import React, { useState } from 'react'

function ImageUpoad({onImageSelect}) {
  const [image,setImage]=useState()

  const handleFileChange = (e) => {
    onImageSelect(e)
   const file=e.target.files[0]
   
   const render=new FileReader()
   render.onload=()=>{
     setImage(render.result)
   }
   render.readAsDataURL(file)
  }
  return (
    <div>
      <h2>Upload Product Image</h2>
      <input type='file' onChange={handleFileChange} id="imageUpload" name="image" className='hidden'/>
      <label htmlFor="imageUpload">
        <div className='p-10 flex justify-center items-center cursor-pointer border-dashed border-2 bg-slate-200 border-black '>
          {image? <Image src={image} width={300} height={300} className='object-contain h-[200px]' alt='image'/> : <Image src={'/image.png'} alt='image'  width={70} height={70}/>}
         
        </div>
      </label>
    </div>
  )
}

export default ImageUpoad