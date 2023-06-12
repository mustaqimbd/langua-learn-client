import React from 'react';
import HomeSlider from '../components/home/HomeSlider';
import PopularClasses from '../components/home/PopularClasses';
import PopularInstructors from '../components/home/PopularInstructors';

const Home = () => {
    return (
        <div>
            <HomeSlider />
            <PopularClasses />
            <PopularInstructors />
        </div>
    );
};

export default Home;