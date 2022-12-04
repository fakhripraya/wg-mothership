import React, {
    Fragment,
    useEffect,
    useRef,
    useState
} from 'react';
import Dropdown from '../../components/Dropdown';
import Button from '../../components/Button';
import './style.scss';
import Card from '../../components/Card';
import { scrollCarousel } from '../../utils/functions/global';
import { getGrid, getRecommendedGaming } from '../../variables/dummy/home';
import Tag from '../../components/Tag';
import FloatButton from '../../components/FloatButton';
import BottomSheet from '../../components/BottomSheet';
import Accordion from '../../components/Accordion';
import { filterData } from '../../variables/dummy/finder';

export default function Finder() {

    // REFS //
    const finderTagRef = useRef();
    const gridRefs = {};

    // STATES //
    const [breadcrumbs, setBreadcrumb] = useState([]);
    const [toggle, setToggle] = useState(false);

    // FUNCTIONS SPECIFIC //
    function handleBottomSheet() {
        setToggle(!toggle);
    }

    // COMPONENTS SPECIFIC //
    const ShowBreadcrumbs = () => {
        let breadCrumbTexts = "";
        breadcrumbs.forEach((item) => breadCrumbTexts += `${item} - `);
        breadCrumbTexts = breadCrumbTexts.slice(0, -2);
        return <h3>{breadCrumbTexts}</h3>
    }

    const ShowAccordions = (props) => {
        return props.datas.map((item, index) => {
            return <Accordion key={`${props.uniqueKey}-accordion-${index}`} toggle={true} isButton={true} title={item.title} data={item.data} />
        })
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
        <Fragment>
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
                            <ShowAccordions key="desktop" datas={filterData} />
                        </div>
                        <div className="finder-cards-container">
                            <div className="finder-cards-top-header-container" >
                                <FloatButton onClick={() => handleBottomSheet()} className="finder-filter-button" />
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
            <BottomSheet toggle={toggle} clicked={handleBottomSheet}>
                <div className="finder-mobile-tools-container">
                    <ShowAccordions uniqueKey="desktop" datas={filterData} />
                </div>
            </BottomSheet>
        </Fragment>
    )
}
