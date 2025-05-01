import React from 'react';
import { Loader2 } from 'lucide-react'; // Optional: if you want a spinning loader

function ThemedSuspense() {
  return (
    <div 
      className="flex items-center justify-center w-full h-screen p-6 
                 text-lg font-medium text-gray-600 
                 "
    >
      <div className="flex items-center space-x-2">
        <Loader2 
          className="animate-spin text-gray-500 dark:text-gray-300" 
          size={24} 
        />
        <span className='text-[#00B0C7] animate-pulse'>Loading...</span>
      </div>
    </div>
  );
}

export default ThemedSuspense;