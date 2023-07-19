import React, {
    Fragment,
    useEffect,
    useState
} from 'react';
import Button from '../../components/Button';
import './style.scss';
import { smoothScrollTop } from '../../utils/functions/global';
import FloatButton from '../../components/FloatButton';
import BottomSheet from '../../components/BottomSheet';
import DynamicAccordion from '../../components/DynamicAccordion';
import { initialChatTexts, initialRooms, initialVisitors } from '../../variables/dummy/creativeStore';
import Avatar from 'react-avatar';
import TextInput from '../../components/TextInput';
import {
    MENU_MOBILE,
    NEW_ORDERS,
    VISITORS
} from '../../variables/global';

export default function CreativeStore() {

    // REFS //
    const gridRefs = {};

    // STATES //
    const [rooms, setRooms] = useState([]);
    const [visitor, setVisitors] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [selectedRightSide, setSelectedRightSide] = useState(VISITORS);

    // FUNCTIONS SPECIFIC //
    function handleBottomSheet() {
        setToggle(!toggle);
    }

    function handleSelectedRoom() {

    }

    function handleSelectedRightSide() {

    }

    // COMPONENTS SPECIFIC //
    const ShowRightScrollableMenu = () => {
        if (selectedRightSide === NEW_ORDERS) {
            setSelectedRightSide(NEW_ORDERS);
            return <ShowNewOrders datas={initialVisitors} />
        }

        setSelectedRightSide(VISITORS);
        return <ShowVisitors datas={initialVisitors} />
    }

    const ShowNewOrders = (props) => {
        return <Fragment>
            <div className='creative-store-scrollable-visitor-container'>
                {props.datas && props.datas.map((obj, index) => {
                    return <div
                        className='creative-store-visitor-user'
                        key={`creative-store-visitor-user-${index}`}>
                        <Avatar
                            style={{ cursor: "pointer" }}
                            size={40}
                            round={true}
                            title={obj.fullname}
                            name={obj.fullname} />
                        <div className='creative-store-visitor-user-text-container'>
                            <label className="light-color">
                                {obj.fullname}
                            </label>
                            <small>
                                {obj.userRank}
                            </small>
                        </div>
                    </div>
                })}
            </div>
        </Fragment>
    }

    const ShowVisitors = (props) => {
        return <Fragment>
            <div className='creative-store-scrollable-visitor-container'>
                {props.datas && props.datas.map((obj, index) => {
                    return <div
                        className='creative-store-visitor-user'
                        key={`creative-store-visitor-user-${index}`}>
                        <Avatar
                            style={{ cursor: "pointer" }}
                            size={40}
                            round={true}
                            title={obj.fullname}
                            name={obj.fullname} />
                        <div className='creative-store-visitor-user-text-container'>
                            <label className="light-color">
                                {obj.fullname}
                            </label>
                            <small>
                                {obj.userRank}
                            </small>
                        </div>
                    </div>
                })}
            </div>
        </Fragment>
    }

    const ShowSockets = (props) => {
        return (<div className='creative-store-dynamic-accordion-socket-wrapper'>
            {props.data && props.data.map((obj, index) => {
                return <div className='creative-store-dynamic-accordion-socket-user'>
                    <Avatar
                        style={{ cursor: "pointer" }}
                        size={30}
                        round={true}
                        title={obj.name}
                        name={obj.name} />
                    <label
                        className="light-color"
                        key={`${props.uniqueKey}-dynamic-accordion-socket-${index}`}>
                        {obj.name}
                    </label>
                </div>
            })}
        </div>)
    }

    const ShowRoomCategories = (props) => {
        return props.datas.map((obj1, index1) => {
            return <Fragment>
                <DynamicAccordion
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
                {props.datas.length - 1 !== index1 && <hr className='creative-store-linebreak'></hr>}
            </Fragment>
        })
    }

    const ShowChatTexts = (props) => {
        return props.datas.map((obj1, index1) => {
            return <div className="creative-store-chattext-container">
                <div className="creative-store-chattext-avatar">
                    <Avatar style={{ cursor: "pointer" }}
                        round={true} size={50}
                        src={obj1.user.profilePictureURI}
                        title={obj1.user.fullname}
                        name={obj1.user.fullname} />
                </div>
                <div className="creative-store-chattext-wrapper">
                    <div>
                        <h4 className='creative-store-chattext-username'>{obj1.user.fullname}</h4>
                        <small>{obj1.chats[obj1.chats.length - 1].createdAt}</small>
                    </div>
                    {obj1.chats.map((obj2, index2) => {
                        return <p>{obj2.content}</p>
                    })}
                </div>
            </div>
        })
    }

    // INITIAL RENDER
    useEffect(() => {
        smoothScrollTop();
        async function init() {
            setRooms(initialRooms);
            setVisitors(initialVisitors);
        }

        init();
    }, []);

    return (
        <Fragment>
            <div className="creative-store-container">
                <div className="creative-store-wrapper">
                    <div className="creative-store-flex-container">
                        <div className="creative-store-tools-container">
                            <div className="creative-store-sub-container creative-store-avatar">
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
                            <div className="creative-store-sub-container creative-store-add-menu">
                                <div className="creative-store-add-menu-wording">
                                    <h4 className='white-color'>Tambah Kategori</h4>
                                    <span className='creative-store-plus-button' />
                                </div>
                            </div>
                            <div className="creative-store-sub-container creative-store-scrollable-menu-header">
                                <Button className='creative-store-scrollable-menu-button'>Katalog</Button>
                            </div>
                            <div className="creative-store-sub-container creative-store-scrollable-menu-body">
                                <div className='creative-store-scrollable-menu-container'>
                                    <ShowRoomCategories uniqueKey="desktop" datas={rooms} />
                                </div>
                            </div>
                            <div className="creative-store-sub-container creative-store-user-avatar">
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
                                    <small>Newcomer</small>
                                    <div className='creative-store-store-user-tools'>
                                        <span className="creative-store-button-icon creative-store-button-icon-voice" />
                                        <span className="creative-store-button-icon creative-store-button-icon-audio" />
                                    </div>
                                </div>
                                <div className="creative-store-user-avatar-end-container">
                                    <span className="creative-store-button-icon creative-store-button-icon-setting" />
                                </div>
                            </div>
                        </div>
                        <div className="creative-store-body-container">
                            <div className="creative-store-body-header-container" >
                                <div className="creative-store-body-header-left">
                                    <FloatButton onClick={() => handleBottomSheet()} className="creative-store-filter-button" />
                                    <h4>📢︱announcement</h4>
                                </div>
                            </div>
                            <div className="creative-store-chatbody-container dark-bg-color">
                                <div className="creative-store-chatbody-wrapper">
                                    <ShowChatTexts datas={initialChatTexts} />
                                </div>
                            </div>
                            <div className="creative-store-chat-container dark-bg-color">
                                <FloatButton onClick={() => window.handleOpenOverriding(MENU_MOBILE)} className='creative-store-chat-leftside-textinput-button creative-store-chat-leftside-textinput-button-emoji' />
                                <FloatButton onClick={() => window.handleOpenOverriding(MENU_MOBILE)} className='creative-store-chat-leftside-textinput-button creative-store-chat-leftside-textinput-button-gif' />
                                <TextInput className="creative-store-chat-textinput light-color darker-bg-color"></TextInput>
                                <Button>Send</Button>
                            </div>
                        </div>
                        <div className="creative-store-userlists-container">
                            <div className="creative-store-sub-container creative-store-rightside-tools">
                                <div className="creative-store-left-header">
                                    <FloatButton onClick={() => window.handleOpenOverriding(MENU_MOBILE)} className='creative-store-rightside-menu-button-active creative-store-rightside-menu-people-button' />
                                    <FloatButton onClick={() => window.handleOpenOverriding(MENU_MOBILE)} className='creative-store-rightside-menu-button creative-store-rightside-menu-pinned-button' />
                                </div>
                                <div className="creative-store-right-header">
                                    <FloatButton onClick={() => window.handleOpenOverriding(MENU_MOBILE)} className='creative-store-hamburg-menu-button' />
                                </div>
                            </div>
                            <div className="creative-store-sub-container creative-store-scrollable-visitor-header">
                                <h3 className='creative-store-scrollable-visitor-title'>Visitor</h3>
                                <hr className='creative-store-linebreak'></hr>
                            </div>
                            <div className="creative-store-sub-container creative-store-scrollable-visitor-body">
                                <ShowRightScrollableMenu />
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
