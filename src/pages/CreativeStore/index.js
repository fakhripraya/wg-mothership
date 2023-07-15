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
import { scrollCarousel, smoothScrollTop } from '../../utils/functions/global';
import { getGrid, getRecommendedGaming } from '../../variables/dummy/home';
import Tag from '../../components/Tag';
import FloatButton from '../../components/FloatButton';
import BottomSheet from '../../components/BottomSheet';
import DynamicAccordion from '../../components/DynamicAccordion';
import { data } from '../../variables/dummy/creativeStore';
import PlusBtn from '../../assets/svg/square-plus-solid.svg'
import Avatar from 'react-avatar';
import TextInput from '../../components/TextInput';

export default function CreativeStore() {

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
    const ShowRooms = (props) => {
        return props.datas.map((item, index) => {
            return <DynamicAccordion key={`${props.uniqueKey}-accordion-${index}`} toggle={true} isButton={true} title={item.title} data={item.data} />
        })
    }

    //TODO: A PLACE HOLDER AND WILL BE DELETED SOON
    const ShowAccordions = (props) => {
        return props.datas.map((item, index) => {
            return <DynamicAccordion key={`${props.uniqueKey}-accordion-${index}`} toggle={true} isButton={true} title={item.title} data={item.data} />
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
            return <div key={`all-finding-${index}`} onMouseDown={(event) => scrollCarousel(event, gridRefs[index])} className="creative-store-cards-grid-wrapper" ref={ref => gridRefs[index] = ref}>
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
            <div className="creative-store-container">
                <div className="creative-store-wrapper">
                    <div className="creative-store-flex-container">
                        <div className="creative-store-tools-container">
                            <div className="creative-store-tools-sub-container creative-store-avatar">
                                <div className="creative-store-avatar-container">
                                    <div className="creative-store-identifier-img-wrapper">
                                        <Avatar style={{ cursor: "pointer" }} src={"https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g"} round={true} title={"test"} name={"test"} />
                                    </div>
                                </div>
                                <div className="creative-store-header">
                                    <h3 className='creative-store-store-title'>Nama Toko</h3>
                                    <label className='creative-store-store-label'>Kita adalah toko terbaik di muka bumi Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, dignissimos! Obcaecati, magni temporibus soluta atque nesciunt ipsam velit explicabo eligendi earum ullam nemo, voluptate nam totam iusto culpa optio repudiandae?</label>
                                </div>
                            </div>
                            <div className="creative-store-tools-sub-container creative-store-add-menu">
                                <div className="creative-store-add-menu-wording">
                                    <h3 className='white-color'>Add Menu</h3>
                                    <img style={{ height: "30px", marginLeft: "10px" }} src={PlusBtn}></img>
                                </div>
                            </div>
                            <div className="creative-store-tools-sub-container creative-store-scrollable-menu">
                                <ShowRooms uniqueKey="desktop" datas={data} />
                            </div>
                        </div>
                        <div className="creative-store-body-container">
                            <div className="creative-store-body-top-header-container" >
                                <FloatButton onClick={() => handleBottomSheet()} className="creative-store-filter-button" />
                                {/* <div onMouseDown={(event) => scrollCarousel(event, finderTagRef.current)} className="creative-store-cards-tag-container" ref={finderTagRef}>
                                    <ShowGrabableCarouselTag uniqueKey={'creative-store-tag'} arrayFunc={() => getRecommendedGaming()} />
                                </div> */}
                            </div>
                            <div className="creative-store-room-title-container">
                                <div className="creative-store-title-wrapper">
                                    <strong>📢︱announcement</strong>
                                </div>
                                <Dropdown onChange={(value) => { }} style={{ width: "100px", maxWidth: "100px" }} showTitle={true} toggle={true} values={["Fittest", "Jancokest"]} />
                            </div>
                            <div className="creative-store-chatbody-container dark-bg-color">
                                <div className="creative-store-chatbody-wrapper">

                                </div>
                                <div className="creative-store-chat-container">
                                    <TextInput className="creative-store-chat-textinput"></TextInput>
                                    <Button>Send</Button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <BottomSheet toggle={toggle} clicked={handleBottomSheet}>
                <div className="creative-store-mobile-tools-container">
                    <ShowAccordions uniqueKey="desktop" datas={data} />
                </div>
            </BottomSheet>
        </Fragment>
    )
}
