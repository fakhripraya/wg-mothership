import React, {
    useEffect,
    useRef,
    useState
} from 'react';
import Dropdown from '../../components/Dropdown';
import Button from '../../components/Button';
import './style.scss';
import Card from '../../components/Card';
import { scrollCarousel } from '../../utils/functions/global';
import { getGrid, getRecommendedGaming } from '../../variables/styles/home';
import Tag from '../../components/Tag';
import FloatButton from '../../components/FloatButton';

export default function Finder() {

    // REFS //
    const finderTagRef = useRef();
    const gridRefs = {};

    // STATES //
    const [breadcrumbs, setBreadcrumb] = useState([]);

    // COMPONENTS SPECIFIC //
    const ShowBreadcrumbs = () => {
        let breadCrumbTexts = "";
        breadcrumbs.forEach((item) => breadCrumbTexts += `${item} - `);
        breadCrumbTexts = breadCrumbTexts.slice(0, -2);
        return <h3>{breadCrumbTexts}</h3>
    }

    const ShowGrabableCarouselTag = (props) => {
        return props.arrayFunc().map((item, index) => {
            return <Tag key={`carousel-${props.uniqueKey}-${index}`} text={item.name} textStyle={{ marginTop: "12px", marginBottom: "12px" }} />
        })
    }

    const ShowGrabableCardCarousel = (props) => {
        return props.arrayFunc().map((item, index) => {
            return <Card
                className="dark-bg-color"
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
                    <ShowBreadcrumbs />
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
                        <div className="finder-cards-top-header-container" >
                            <FloatButton className="finder-filter-button">
                            </FloatButton>
                            <div onMouseDown={(event) => scrollCarousel(event, finderTagRef.current)} className="finder-cards-tag-container" ref={finderTagRef}>
                                <ShowGrabableCarouselTag uniqueKey={'finder-tag'} arrayFunc={() => getRecommendedGaming()} />
                            </div>
                        </div>
                        <div className="finder-cards-header">
                            <div className="finder-cards-counter">
                                <span>Showing 1 - 60 products of 257k of </span>
                                <strong>Graphical Render</strong>
                            </div>
                            <Dropdown style={{ width: "100px", maxWidth: "100px" }} showTitle={true} toggle={true} values={["Fittest", "Jancokest"]} />
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
