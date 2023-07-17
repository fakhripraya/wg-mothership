import React, {
    Fragment,
    useEffect,
    useState
} from 'react';
import Button from '../../components/Button';
import './style.scss';
import Card from '../../components/Card';
import { scrollCarousel, smoothScrollTop } from '../../utils/functions/global';
import Tag from '../../components/Tag';
import FloatButton from '../../components/FloatButton';
import BottomSheet from '../../components/BottomSheet';
import DynamicAccordion from '../../components/DynamicAccordion';
import { initialRooms } from '../../variables/dummy/creativeStore';
import PlusBtn from '../../assets/svg/square-plus-solid-green.svg'
import Avatar from 'react-avatar';
import TextInput from '../../components/TextInput';
import { MENU_MOBILE } from '../../variables/global';

export default function CreativeStore() {

    // REFS //
    const gridRefs = {};

    // STATES //
    const [rooms, setRooms] = useState(initialRooms);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [toggle, setToggle] = useState(false);

    // FUNCTIONS SPECIFIC //
    function handleBottomSheet() {
        setToggle(!toggle);
    }

    function handleSelectedRoom() {

    }

    // COMPONENTS SPECIFIC //
    const ShowSockets = (props) => {
        if (!props.data || props.data.length === 0) return null;
        return (<div className='creative-store-dynamic-accordion-socket-wrapper'>
            {props.data.map((obj, index) => {
                return <label
                    className="light-color"
                    key={`${props.uniqueKey}-dynamic-accordion-socket-${index}`}>
                    {obj.name}
                </label>
            })}
        </div>)
    }

    const ShowRoomCategories = (props) => {
        return props.datas.map((obj1, index1) => {
            return <DynamicAccordion
                key={`${props.uniqueKey}-dynamic-accordion-${index1}`}
                toggle={true}
                isButton={false}
                title={obj1.title} >
                {obj1.data.map((obj2, index2) => {
                    return <button
                        key={`${props.uniqueKey}-dynamic-accordion-${obj2.roomTitle}-${index2}`}
                        className="dynamic-accordion-button creative-store-dynamic-accordion-button">
                        <h6 className="dynamic-accordion-subtitle light-color">{obj2.roomTitle}</h6>
                        <ShowSockets uniqueKey={props.uniqueKey} data={obj2.roomSockets} />
                    </button>
                })}
            </DynamicAccordion>
        })
    }

    // INITIAL RENDER
    useEffect(() => {
        smoothScrollTop();
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
                                        <Avatar
                                            style={{ cursor: "pointer" }}
                                            src={"https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g"}
                                            size={60}
                                            title={"test"}
                                            name={"test"} />
                                    </div>
                                </div>
                                <div className="creative-store-header">
                                    <h3 className='creative-store-store-title'>Bahari One Stop</h3>
                                    <label className='creative-store-store-label'>Kita adalah toko terbaik di muka bumi Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, dignissimos! Obcaecati, magni temporibus soluta atque nesciunt ipsam velit explicabo eligendi earum ullam nemo, voluptate nam totam iusto culpa optio repudiandae?</label>
                                </div>
                            </div>
                            <div className="creative-store-tools-sub-container creative-store-add-menu">
                                <div className="creative-store-add-menu-wording">
                                    <h4 className='white-color'>Tambah Kategori</h4>
                                    <span className='creative-store-plus-button' />
                                </div>
                            </div>
                            <div className="creative-store-tools-sub-container creative-store-scrollable-menu">
                                <div className='creative-store-scrollable-menu-container'>
                                    <ShowRoomCategories uniqueKey="desktop" datas={rooms} />
                                </div>
                            </div>
                            <div className="creative-store-tools-sub-container creative-store-user-avatar">
                                <div className="creative-store-user-avatar-container">
                                    <div className="creative-store-user-identifier-img-wrapper">
                                        <Avatar style={{ cursor: "pointer" }}
                                            round={true} size={50}
                                            title={"Freddy Sambo"}
                                            name={"Freddy Sambo"} />
                                    </div>
                                </div>
                                <div className="creative-store-user-avatar-side-container">
                                    <h4 className='creative-store-store-user-name'>Freddy Sambo</h4>
                                    <div className='creative-store-store-user-tools'>
                                        <span className="creative-store-button-icon creative-store-button-icon-voice" />
                                        <span className="creative-store-button-icon creative-store-button-icon-audio" />
                                        <span className="creative-store-button-icon creative-store-button-icon-setting" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="creative-store-body-container">
                            <div className="creative-store-body-header-container" >
                                <div className="creative-store-body-header-left">
                                    <FloatButton onClick={() => handleBottomSheet()} className="creative-store-filter-button" />
                                    <h4>📢︱announcement</h4>
                                </div>
                                <FloatButton onClick={() => window.handleOpenOverriding(MENU_MOBILE)} className='creative-store-hamburg-menu-button' />
                            </div>
                            <div className="creative-store-chatbody-container dark-bg-color">
                                <div className="creative-store-chatbody-wrapper">
                                    <div className="creative-store-chattext-container">
                                        <div className="creative-store-chattext-avatar">
                                            <Avatar style={{ cursor: "pointer" }}
                                                round={true} size={50}
                                                title={"Veallen Aisyah"}
                                                name={"Veallen Aisyah"} />
                                        </div>
                                        <div className="creative-store-chattext-wrapper">
                                            <label>Veallen Aisyah</label>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio pariatur, doloremque a ducimus, provident cum officia neque consequuntur, maxime quam obcaecati iusto dolorem odit natus deleniti consectetur asperiores saepe quis.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio pariatur, doloremque a ducimus, provident cum officia neque consequuntur, maxime quam obcaecati iusto dolorem odit natus deleniti consectetur asperiores saepe quis.</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio pariatur, doloremque a ducimus, provident cum officia neque consequuntur, maxime quam obcaecati iusto dolorem odit natus deleniti consectetur asperiores saepe quis.</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio pariatur, doloremque a ducimus, provident cum officia neque consequuntur, maxime quam obcaecati iusto dolorem odit natus deleniti consectetur asperiores saepe quis.</p>
                                        </div>
                                    </div>
                                    <div className="creative-store-chattext-container">
                                        <div className="creative-store-chattext-avatar">
                                            <Avatar style={{ cursor: "pointer" }}
                                                round={true} size={50}
                                                title={"Fakhri Prayatna Putra"}
                                                name={"Fakhri Prayatna Putra"} />
                                        </div>
                                        <div className="creative-store-chattext-wrapper">
                                            <label>Fakhri Prayatna Putra</label>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio pariatur, doloremque a ducimus, provident cum officia neque consequuntur, maxime quam obcaecati iusto dolorem odit natus deleniti consectetur asperiores saepe quis.</p>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio pariatur, doloremque a ducimus, provident cum officia neque consequuntur, maxime quam obcaecati iusto dolorem odit natus deleniti consectetur asperiores saepe quis.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="creative-store-chat-container dark-bg-color">
                                <TextInput className="creative-store-chat-textinput light-color darker-bg-color"></TextInput>
                                <Button>Send</Button>
                            </div>
                        </div>
                        <div className="creative-store-tools-container">
                            <div className="creative-store-tools-sub-container creative-store-avatar">
                                <div className="creative-store-avatar-container">
                                    <div className="creative-store-identifier-img-wrapper">
                                        <Avatar
                                            style={{ cursor: "pointer" }}
                                            src={"https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/8/14/e642c4eb-e25a-474d-9619-d1c4a0f22e6a.jpg.webp?ect=4g"}
                                            size={60}
                                            title={"test"}
                                            name={"test"} />
                                    </div>
                                </div>
                                <div className="creative-store-header">
                                    <h3 className='creative-store-store-title'>Bahari One Stop</h3>
                                    <label className='creative-store-store-label'>Kita adalah toko terbaik di muka bumi Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, dignissimos! Obcaecati, magni temporibus soluta atque nesciunt ipsam velit explicabo eligendi earum ullam nemo, voluptate nam totam iusto culpa optio repudiandae?</label>
                                </div>
                            </div>
                            <div className="creative-store-tools-sub-container creative-store-scrollable-menu">
                                <div className='creative-store-scrollable-menu-container'>
                                    <ShowRoomCategories uniqueKey="desktop" datas={rooms} />
                                </div>
                            </div>
                            <div className="creative-store-tools-sub-container creative-store-user-avatar">
                                <div className="creative-store-user-avatar-container">
                                    <div className="creative-store-user-identifier-img-wrapper">
                                        <Avatar style={{ cursor: "pointer" }}
                                            round={true} size={50}
                                            title={"Freddy Sambo"}
                                            name={"Freddy Sambo"} />
                                    </div>
                                </div>
                                <div className="creative-store-user-avatar-side-container">
                                    <h4 className='creative-store-store-user-name'>Freddy Sambo</h4>
                                    <div className='creative-store-store-user-tools'>
                                        <span className="creative-store-button-icon creative-store-button-icon-voice" />
                                        <span className="creative-store-button-icon creative-store-button-icon-audio" />
                                        <span className="creative-store-button-icon creative-store-button-icon-setting" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomSheet toggle={toggle} clicked={handleBottomSheet}>
                <div className="creative-store-mobile-tools-container">
                </div>
            </BottomSheet>
        </Fragment>
    )
}
