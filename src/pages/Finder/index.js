import React, {
    useEffect,
    useState
} from 'react';
import Dropdown from '../../components/Dropdown';
import Button from '../../components/Button';
import './style.scss';
import Card from '../../components/Card';
import { scrollCarousel } from '../../utils/functions/global';
import { getGrid } from '../../variables/styles/home';

export default function Finder() {

    // REFS //
    const gridRefs = {};

    // STATES //
    const [breadcrumbs, setBreadcrumb] = useState([]);

    // COMPONENTS SPECIFIC //
    const ShowGrabableCardCarousel = (props) => {
        return props.arrayFunc().map((item, index) => {
            return <Card
                className="darker-bg-color"
                key={`finding-carousel-${props.uniqueKey}-${index}`}
                imgUrl={item.url}
                title={item.name}
                location={item.location}
                price={item.price}
                desc={item.desc} />
        })
    }

    const ShowGridCardCarousel = (props) => {
        return props.arrayFunc().map((item, index) => {
            return <div key={'all-finding-' + `${index}`} onMouseDown={(event) => scrollCarousel(event, gridRefs[index])} className="finder-cards-grid-wrapper" ref={ref => gridRefs[index] = ref}>
                <ShowGrabableCardCarousel uniqueKey={'all-finding-' + `id-${index}`} arrayFunc={() => item.arrayFunc()} />
            </div>
        })
    }

    // FUNCTIONS SPECIFIC //


    useEffect(() => {
        // INITIAL RENDER
        const dummyBreadcrumb = ["Home", "Graphical Renders", "Tesla P100"];
        setBreadcrumb(dummyBreadcrumb);
    }, [])

    return (
        <div className="finder-container">
            <div className="finder-wrapper">
                <div className="finder-breadcrumbs">
                    {breadcrumbs.map((item, index) => {
                        if (item !== breadcrumbs[breadcrumbs.length - 1]) return <h3 key={`${item}-${index}`} >{item}</h3>
                        else return <h3 key={`${item}-${index}`}>{item}</h3>
                    })}
                </div>
                <div className="finder-title">
                    <h2>THIS IS THE TITLE OF THE FINDER</h2>
                </div>
                <div className="finder-flex-container">
                    <div className="finder-tools-container">
                        <div className="finder-accordion-wrapper">
                            <button className="finder-accordion-button">
                                <h3 className="finder-accordion-title light-color">Kategori</h3>
                            </button>
                            <div className="finder-accordion-lists-container">
                                <button className="finder-accordion-button">
                                    <h6 className="finder-accordion-subtitle light-color">Graphical Render</h6>
                                </button>
                                <button className="finder-accordion-button">
                                    <h6 className="finder-accordion-subtitle light-color">Gaming</h6>
                                </button>
                                <button className="finder-accordion-button">
                                    <h6 className="finder-accordion-subtitle light-color">Working</h6>
                                </button>
                            </div>
                        </div>
                        <div className="finder-accordion-wrapper">
                            <button className="finder-accordion-button">
                                <h3 className="finder-accordion-title light-color">Location</h3>
                            </button>
                            <div className="finder-accordion-lists-container">
                                <button className="finder-accordion-button">
                                    <h6 className="finder-accordion-subtitle light-color">Jakarta Selatan</h6>
                                </button>
                                <button className="finder-accordion-button">
                                    <h6 className="finder-accordion-subtitle light-color">Jember</h6>
                                </button>
                                <button className="finder-accordion-button">
                                    <h6 className="finder-accordion-subtitle light-color">Palembang</h6>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="finder-cards-container">
                        <div className="finder-cards-header">
                            <div className="finder-cards-counter">
                                <span>Showing </span>
                                <span>1 - 60 </span>
                                <span>products of </span>
                                <span>257k of </span>
                                <strong>Graphical Render</strong>
                            </div>
                            <Dropdown toggle={true} values={["Fittest", "Jancokest"]} />
                        </div>
                        <div className="finder-cards-wrapper">
                            <ShowGridCardCarousel arrayFunc={() => getGrid()} />
                        </div>
                        <div className="finder-cards-button-wrapper">
                            <Button className="finder-button">See More</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
