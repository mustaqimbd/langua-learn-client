import React from 'react';
import SelectedClasses from './SelectedClasses'
const EnrolledClasses = () => {
    return (
        <div>
            <h1 className='text-3xl font-bold text-center my-6'>Enrolled Classes</h1>
            <SelectedClasses enrolledPage={true}/>
        </div>
        
    );
};

export default EnrolledClasses;