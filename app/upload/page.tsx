'use client';
import React from 'react'
import { CldUploadWidget } from 'next-cloudinary'

const Uploadpage = () => {
  return (
    <CldUploadWidget uploadPreset='ljhe7swv'>
      {({ open }) => (
        <button
          className='btn btn-primary'
          onClick={() => open()}
        >
          Upload
        </button>
      )}
    </CldUploadWidget>
  )
}

export default Uploadpage

