'use client'

import React from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'
import { isValidImageFile } from '@/lib/utils'

interface FileUploadProps {
  onFileAccepted: (file: File) => void
  disabled?: boolean
}

export default function FileUpload({ onFileAccepted, disabled = false }: FileUploadProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    multiple: false,
    disabled,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        if (isValidImageFile(file)) {
          onFileAccepted(file)
        } else {
          alert('Invalid file. Please upload a JPEG, PNG, or WebP image under 10MB.')
        }
      }
    },
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-400'}
      `}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      {isDragActive ? (
        <p className="text-lg">Drop the image here...</p>
      ) : (
        <div>
          <p className="text-lg mb-2">Drag & drop an image here</p>
          <p className="text-sm text-gray-500">or click to select a file</p>
          <p className="text-xs text-gray-400 mt-2">Supports: JPEG, PNG, WebP (max 10MB)</p>
        </div>
      )}
    </div>
  )
}
