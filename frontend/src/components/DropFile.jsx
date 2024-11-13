import React from 'react';
import Dropzone from 'react-dropzone';
import fileUploadIcon from '../../assets/file_upload.svg';

export function DropFile({ files, setFile, heading }) {

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile);
  };

  return (
    <div className="w-full min-w-[400px] text-center">
      <div className="border-[1px] border-slate-200 rounded-xl w-full p-3.5">
        <div className="w-full mx-auto flex flex-col justify-start items-start">
          <p className="font-semibold text-base mb-2">{heading}</p>
          <Dropzone onDrop={handleFileUpload}>
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="w-full min-w-[300px] h-[150px] border-dashed rounded-lg border-[2px] border-blue-500 p-3.5 mt-2 mb-2 cursor-pointer" // Set min-width to prevent shrinking
              >
                <input {...getInputProps()} />
                <img src={fileUploadIcon} alt="upload" className="mx-auto mb-4 mt-2 w-[40px]" />
                {files.length > 0 ? (
                  <div className="text-center w-full">
                    <p className="truncate max-w-[200px] mx-auto font-medium text-gray-700">
                      {files[0].name.length > 20 ? `${files[0].name.substring(0, 17)}...` : files[0].name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Size: {(files[0].size / 1024).toFixed(2)} KB | Type: {files[0].type}
                    </p>
                  </div>
                ) : (
                  <p className="text-center">
                    <span className="font-semibold mr-1 text-com-blue">Upload</span>
                    <span className="text-gray-500 text-sm">
                      or Drag & drop attachment (All file types up to 2GB)
                    </span>
                  </p>
                )}
              </div>
            )}
          </Dropzone>
        </div>
      </div>
    </div>
  );
}