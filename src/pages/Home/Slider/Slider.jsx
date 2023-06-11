import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Slider = () => {
    const img1 = "https://images.unsplash.com/photo-1522075782449-e45a34f1ddfb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWVkaXRhdGlvbnxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60";
    const img2 = "https://images.unsplash.com/photo-1577253313708-cab167d2c474?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1lZGl0YXRpb258ZW58MHwwfDB8fHww&auto=format&fit=crop&w=500&q=60";
    const img3 = "https://images.unsplash.com/photo-1559595500-e15296bdbb48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fG1lZGl0YXRpb258ZW58MHwwfDB8fHww&auto=format&fit=crop&w=500&q=60";
    
    return (
        <div className="mb-10">
            <Carousel showThumbs={false} infiniteLoop autoPlay interval={5000} transitionTime={500} emulateTouch swipeable showArrows>
                <div>
                    <img className="h-60 md:h-fit lg:h-[550px]" src={img1} alt="Slide 1" />
                    <p className="legend">Find inner peace and harmony through the practice of yoga and meditation.</p>
                </div>
                <div>
                    <img className="h-60 md:h-80 lg:h-[550px]" src={img2} alt="Slide 2" />
                    <p className="legend">Immerse yourself in the serenity of nature as you engage in yoga and meditation.</p>
                </div>
                <div>
                    <img className="h-60 md:h-fit lg:h-[550px]" src={img3} alt="Slide 3" />
                    <p className="legend">Experience the transformative power of yoga and meditation for a balanced mind, body, and spirit.</p>
                </div>
            </Carousel>
        </div>
    );
};

export default Slider;