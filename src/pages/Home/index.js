import React, { Fragment, useEffect, useRef } from 'react';
import ImageSlider from '../../components/ImageSlider';
import { getBalanceTools, getRecommendedGaming, getRecommendedGraphicRendering } from '../../variables/styles/home';
import './style.scss';

export default function Home() {

    // HOOKS //
    const recommendRenderingCarouselRef = useRef();
    const recommendGamingCarouselRef = useRef();
    const recommendCarouselRef = useRef();

    // VARIABLES //
    let pos = { top: 0, left: 0, x: 0, y: 0 };

    // FUNCTIONS SPECIFIC //
    function scrollCarousel(e, ele) {

        pos = {
            // The current scroll
            left: ele.scrollLeft,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
        };

        function mouseMoveHandler(e) {
            // How far the mouse has been moved
            const dx = e.clientX - pos.x;

            // Scroll the element
            ele.scrollLeft = pos.left - dx;
        }

        function mouseUpHandler() {
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('mouseup', mouseUpHandler);

            ele.style.cursor = 'grab';
            ele.style.removeProperty('user-select');
        }

        // Change the cursor and prevent user from selecting the text
        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';

        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('mouseup', mouseUpHandler);
    }

    // COMPONENTS SPECIFIC //
    const ShowTools = () => {
        return getBalanceTools().map((items, index) => {
            return <div key={`tool-${index}`} className="home-balance-box home-balance-tools-box main-bg-color">
                <h1 className="home-title-balance light-color">
                    {items.name}
                </h1>
                <p className="home-desc-balance light-color">
                    {items.desc}
                </p>
            </div>
        })
    }

    const ShowGrabableCarouselTag = (props) => {
        return props.arrayFunc().map((item, index) => {
            return <div key={`carousel-${props.key}-${index}`} className="home-carousel-box main-bg-color">
                <h1 className="light-color">
                    {item.name}
                </h1>
            </div>
        })
    }

    const ShowGrabableCarousel = (props) => {
        return props.arrayFunc().map((item, index) => {
            return <div key={`carousel-${props.key}-${index}`} className="home-carousel-box main-bg-color">
                <h1 className="light-color">
                    {item.name}
                </h1>
                <h1 className="light-color">
                    {item.name}
                </h1>
                <h1 className="light-color">
                    {item.name}
                </h1>
            </div>
        })
    }

    // RENDERS SPECIFIC //
    useEffect(() => {
    }, []);

    return (
        <Fragment>
            <div className="home-container">
                <div className="home-wrapper">
                    <ImageSlider />
                    <div className="home-element-container dark-bg-color">
                        <div className="home-balance-wrapper">
                            <div className="home-balance-box home-balance-counter-box dark-bg-color">
                                <h1 className="home-title-balance dark-color">
                                    Balance
                                </h1>
                                <h3 className="home-balance-number dark-color">
                                    Rp. 1000.000
                                </h3>
                                <p className="home-desc-balance dark-color">
                                    Click here for billing
                                </p>
                            </div>
                            <div className="home-balance-tools">
                                <ShowTools />
                            </div>
                        </div>
                    </div>
                    <div className="home-element-container dark-bg-color">
                        <h1 className="home-recommend-title light-color">
                            RECOMMENDED FOR GRAPHIC RENDERING
                        </h1>
                        <div key={'recommendGraphicRendering'} onMouseDown={(event) => scrollCarousel(event, recommendRenderingCarouselRef.current)} className="home-recommend-wrapper" ref={recommendRenderingCarouselRef}>
                            <ShowGrabableCarouselTag arrayFunc={() => getRecommendedGraphicRendering()} />
                        </div>
                    </div>
                    <div className="home-element-container dark-bg-color">
                        <h1 className="home-recommend-title light-color">
                            RECOMMENDED FOR GAMING
                        </h1>
                        <div key={'recommendGaming'} onMouseDown={(event) => scrollCarousel(event, recommendGamingCarouselRef.current)} className="home-recommend-wrapper" ref={recommendGamingCarouselRef}>
                            <ShowGrabableCarouselTag arrayFunc={() => getRecommendedGaming()} />
                        </div>
                    </div>
                    <div className="home-element-container dark-bg-color">
                        <h1 className="home-recommend-title light-color">
                            RECOMMENDED FOR YOU
                        </h1>
                        <div key={'recommend'} onMouseDown={(event) => scrollCarousel(event, recommendCarouselRef.current)} className="home-recommend-wrapper" ref={recommendGamingCarouselRef}>
                            <ShowGrabableCarousel arrayFunc={() => getRecommendedGaming()} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}