import React, {
    Fragment,
    useEffect,
    useRef,
    useState
} from 'react';
import Dropdown from '../../components/Dropdown';
import './style.scss';
import Card from '../../components/Card';
import { scrollCarousel, smoothScrollTop } from '../../utils/functions/global';
import Tag from '../../components/Tag';
import FloatButton from '../../components/FloatButton';
import BottomSheet from '../../components/BottomSheet';
import Accordion from '../../components/Accordion';
import DashboardHome from '../DashboardHome';

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
            return <div key={`all-finding-${index}`} onMouseDown={(event) => scrollCarousel(event, gridRefs[index])} className="dashboard-cards-grid-wrapper" ref={ref => gridRefs[index] = ref}>
                <ShowGrabableCardCarousel uniqueKey={`all-finding-id-${index}`} arrayFunc={() => item.arrayFunc()} />
            </div>
        })
    }

    // INITIAL RENDER
    useEffect(() => {
        smoothScrollTop();
        const dummyBreadcrumb = ["Home", "Graphical Renders", "Tesla P100"];
        setBreadcrumb(dummyBreadcrumb);
    }, []);

    return (
        <Fragment>
            <div className="dashboard-container">
                <div className="dashboard-wrapper">
                    <div className="dashboard-flex-container">
                        <div className="dashboard-tools-container">
                            <FloatButton onClick={() => handleBottomSheet()} className="dashboard-menu-button dashboard-menu-button-home" />
                            <FloatButton onClick={() => handleBottomSheet()} className="dashboard-menu-button dashboard-menu-button-order" />
                            <FloatButton onClick={() => handleBottomSheet()} className="dashboard-menu-button dashboard-menu-button-chat" />
                            <FloatButton onClick={() => handleBottomSheet()} className="dashboard-menu-button dashboard-menu-button-product" />
                        </div>
                        <div className="dashboard-cards-container">
                            <div className="dashboard-cards-header">
                                <div className="dashboard-cards-tool-items">
                                    <FloatButton onClick={() => handleBottomSheet()} className="dashboard-menu-button display-mobile dashboard-menu-button-main" />
                                    <h3>Hello, Fakhri !</h3>
                                </div>
                                <div className="dashboard-cards-tool-items">
                                    <FloatButton onClick={() => handleBottomSheet()} className="dashboard-menu-button dashboard-menu-button-bell" />
                                    <Dropdown style={{ width: "100px", maxWidth: "100px" }} showTitle={true} toggle={true} values={["Fittest", "Jancokest"]} />
                                </div>
                            </div>
                            <DashboardHome />
                        </div>
                    </div>
                </div>
            </div>
            <BottomSheet toggle={toggle} clicked={handleBottomSheet}>
                <div className="dashboard-mobile-tools-container">
                    <FloatButton onClick={() => handleBottomSheet()} className="dashboard-menu-button dashboard-menu-button-home" />
                    <FloatButton onClick={() => handleBottomSheet()} className="dashboard-menu-button dashboard-menu-button-order" />
                    <FloatButton onClick={() => handleBottomSheet()} className="dashboard-menu-button dashboard-menu-button-chat" />
                    <FloatButton onClick={() => handleBottomSheet()} className="dashboard-menu-button dashboard-menu-button-product" />
                </div>
            </BottomSheet>
        </Fragment>
    )
}
