import React from 'react';

interface FormWrapperProps {
  formHeader: string;
  children: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ formHeader, children }) => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <h2 className='text-3xl text-center font-semibold tracking-tight first:mt-0 mb-4'>{formHeader}</h2>
      <div className='w-[300px] bg-gray-50 flex flex-col p-4 rounded-lg shadow-md gap-4'>{children}</div>
    </div>
  );
};

export default FormWrapper;
