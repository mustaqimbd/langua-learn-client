import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomeSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <Slider {...settings}>
        <div className="h-[500px] relative ">
          <img
            src="https://img.freepik.com/premium-photo/front-view-alphabet-letters-stacked-books-earth-globe-education-day_23-2149241026.jpg?w=826"
            alt="Slide 1"
            className="w-full h-full object-cover"
          />
          <div className="text-center text-[#132160] absolute top-[50%] left-[10%] right-[10%]">
            <h1 className="text-6xl font-bold">Welcome to LanguaLearn!</h1>
            <h3 className="text-2xl font-bold my-2">Master multiple languages with ease.</h3>
            <h3 className="text-2xl font-bold">Unlock your linguistic potential.</h3>
          </div>
        </div>

        <div className="h-[500px] relative">
          <img
            src="https://img.freepik.com/premium-photo/3d-laptop-with-bubble-speech-flags_58466-3760.jpg?w=740"
            alt="Slide 2"
            className="w-full h-full object-cover"
          />
          <div className="text-center text-[#132160] absolute top-[50%] left-[10%] right-[10%]">
            <h1 className="text-6xl font-bold">Interactive Learning</h1>
            <h3 className="text-2xl font-bold my-2">Engaging lessons and interactive exercises.</h3>
            <h3 className="text-2xl font-bold">UPractice makes perfect.</h3>
          </div>
        </div>
        <div className="h-[500px] relative">
          <img
            src="https://as2.ftcdn.net/v2/jpg/00/73/04/01/1000_F_73040142_tPquyZMf6c4adnEPUfV8wtGEW23sI8y1.jpg"
            alt="Slide 3"
            className="w-full h-full object-cover"
          />
          <div className="text-center text-[#132160] absolute top-[50%] left-[10%] right-[10%]">
            <h1 className="text-6xl font-bold">Expand Your Horizons!</h1>
            <h3 className="text-2xl font-bold my-2">Learn languages from around the world.</h3>
            <h3 className="text-2xl font-bold">Discover new cultures and perspectives.</h3>
          </div>
        </div>
        <div className="h-[500px] relative">
          <img
            src="https://img.freepik.com/free-photo/english-book-resting-table-working-space_23-2149429572.jpg?w=826&t=st=1686319287~exp=1686319887~hmac=546bb6e78c06a4b3b7081c8d421b23285bdd715fbc735bad4974b315401286a9"
            alt="Slide 4"
            className="w-full h-full object-cover"
          />
          <div className="text-center text-[#132160] absolute top-[50%] left-[10%] right-[10%]">
            <h1 className="text-6xl font-bold">Personalized Approach</h1>
            <h3 className="text-2xl font-bold my-2">Tailored learning paths for your goals.</h3>
            <h3 className="text-2xl font-bold">Learn at your own pace.</h3>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default HomeSlider;
