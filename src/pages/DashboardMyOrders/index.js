import React from 'react'
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Checkbox from '../../components/Checkbox';
import TextInput from '../../components/TextInput';
import './style.scss';
import { filterCheckboxes, filterDropdowns, itemListDummy } from '../../variables/dummy/catalogue';
import Accordion from '../../components/Accordion';
import { useEffect } from 'react';
import { smoothScrollTop } from '../../utils/functions/global';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_ORDERS } from '../../variables/global';

export default function DashboardMyOrders(props) {

    // FUNCTIONS SPECIFIC //
    function handleOpenDetail(item, navigate) {
        navigate(`/detail?itemId=${item.ID}`);
    }

    // COMPONENTS SPECIFIC //
    const ShowCheckboxes = () => {
        return filterCheckboxes.map((item, index) => {
            return <Checkbox key={`checkbox-${item.title}-${index}`} className="my-orders-checkbox-item" title={item.title} />
        })
    }

    const ShowDropdowns = () => {
        return filterDropdowns.map((item, index) => {
            return <Dropdown onChange={(value) => { }} key={`my-orders-filter-dropdown-${index}`} className="my-orders-dropdown-item" style={{ width: "100px", maxWidth: "100px" }} showTitle={item.showTitle} toggle={item.toggle} values={item.values} />
        })
    }

    const ShowBodyDigitalRental = () => {
        // HOOK
        const navigate = useNavigate();
        // Render list
        return itemListDummy.map((item, index) => {
            return <div key={`my-orders-items-${index}`} className="my-orders-body margin-top-12-18 dark-bg-color">
                <div className="my-orders-body-items my-orders-body-identifier">
                    <h3 className="margin-top-0" >{item.title}</h3>
                    <h4 className="margin-top-0 margin-bottom-0" >ID: {item.ID}</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >List date: {item.date}</h4>
                    <div className="my-orders-identifier-img-wrapper">
                        <img className="my-orders-identifier-img" src={item.img.src} alt={item.img.alt} />
                    </div>
                </div>
                <div className="my-orders-body-items my-orders-body-cpu-spec">
                    <h3 className="margin-top-0 margin-bottom-0" >{item.cpu.title}</h3>
                    <h4 className="margin-bottom-0" >Core: {item.cpu.core} Cores</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >Thread: {item.cpu.thread} Threads</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >Clock Speed: {item.cpu.clockSpeed} Ghz</h4>
                </div>
                <div className="my-orders-body-items my-orders-body-graphical-spec">
                    <h3 className="margin-top-0 margin-bottom-0" >{item.graphical.title}</h3>
                    <h4 className="margin-bottom-0" >Core: {item.graphical.cudaCore} Cuda Core</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >Clock Speed: {item.graphical.clockSpeed}  Ghz</h4>
                    <h4 className="margin-bottom-0" >Memory: {item.graphical.memory} {item.graphical.memoryUnit} Memory</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >Memory Type: {item.graphical.memoryType}</h4>
                </div>
                <div className="my-orders-body-items my-orders-body-storage-spec">
                    <ShowAccordionDigitalRentals datas={item.storageList} />
                </div>
                <div className="my-orders-body-items my-orders-body-rent-detail">
                    <h4 className="margin-top-0 margin-bottom-0" >Durations : {item.rentDetail.duration} {item.rentDetail.durationUnit}</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >End at : {item.rentDetail.endAt}</h4>
                    <h5 className="margin-top-0 margin-bottom-0" >{item.rentDetail.price}{item.rentDetail.priceUnit}</h5>
                    <h5 onClick={() => handleOpenDetail(item, navigate)} className="margin-bottom-0 dark-color light-bg-color my-orders-body-rent-button" >Details</h5>
                    <h5 className="main-bg-color my-orders-body-rent-detail-status" >Status : {item.rentDetail.status}</h5>
                    <h5 className="margin-top-0 margin-bottom-0 red-bg-color my-orders-body-rent-button" >Cancel</h5>
                </div>
            </div>
        })
    }

    const ShowBodyPhysicalRental = () => {
        // HOOK
        const navigate = useNavigate();
        // Render list
        return itemListDummy.map((item, index) => {
            return <div key={`my-orders-items-${index}`} className="my-orders-body margin-top-12-18 dark-bg-color">
                <div className="my-orders-body-items my-orders-body-identifier">
                    <h3 className="margin-top-0" >{item.title}</h3>
                    <h4 className="margin-top-0 margin-bottom-0" >ID: {item.ID}</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >List date: {item.date}</h4>
                    <div className="my-orders-identifier-img-wrapper">
                        <img className="my-orders-identifier-img" src={item.img.src} alt={item.img.alt} />
                    </div>
                </div>
                <div className="my-orders-body-items my-orders-body-cpu-spec">
                    <h3 className="margin-top-0 margin-bottom-0" >{item.cpu.title}</h3>
                    <h4 className="margin-bottom-0" >Core: {item.cpu.core} Cores</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >Thread: {item.cpu.thread} Threads</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >Clock Speed: {item.cpu.clockSpeed} Ghz</h4>
                </div>
                <div className="my-orders-body-items my-orders-body-graphical-spec">
                    <h3 className="margin-top-0 margin-bottom-0" >{item.graphical.title}</h3>
                    <h4 className="margin-bottom-0" >Core: {item.graphical.cudaCore} Cuda Core</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >Clock Speed: {item.graphical.clockSpeed}  Ghz</h4>
                    <h4 className="margin-bottom-0" >Memory: {item.graphical.memory} {item.graphical.memoryUnit} Memory</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >Memory Type: {item.graphical.memoryType}</h4>
                </div>
                <div className="my-orders-body-items my-orders-body-storage-spec">
                    <ShowAccordionPhysicalRentals datas={item.storageList} />
                </div>
                <div className="my-orders-body-items my-orders-body-rent-detail">
                    <h4 className="margin-top-0 margin-bottom-0" >Durations : {item.rentDetail.duration} {item.rentDetail.durationUnit}</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >End at : {item.rentDetail.endAt}</h4>
                    <h5 className="margin-top-0 margin-bottom-0" >{item.rentDetail.price}{item.rentDetail.priceUnit}</h5>
                    <h5 onClick={() => handleOpenDetail(item, navigate)} className="margin-bottom-0 dark-color light-bg-color my-orders-body-rent-button" >Details</h5>
                    <h5 className="main-bg-color my-orders-body-rent-detail-status" >Status : {item.rentDetail.status}</h5>
                    <h5 className="margin-top-0 margin-bottom-0 red-bg-color my-orders-body-rent-button" >Cancel</h5>
                </div>
            </div>
        })
    }

    const ShowAccordionDigitalRentals = (props) => {
        return props.datas.map((item, index) => {
            return <Accordion
                key={`my-orders-item-accordion-${index}`}
                isButton={false}
                title={item.title}
                toggle={false}
            >
                <div className="my-orders-body-storage-spec-items">
                    <h4 className="margin-bottom-0 text-ellipsis" >{item.installedOs && "OS Installed"}</h4>
                    <h4 className="margin-top-0 margin-bottom-0 text-ellipsis" >{item.isNVME && "NVME"}</h4>
                    <h4 className="margin-top-0 margin-bottom-0 text-ellipsis" >{`Storage Space : ${item.storageSpace} ${item.storageSpaceUnit}`}</h4>
                    <h4 className="margin-top-0 margin-bottom-0 text-ellipsis" >{`Transfer Speed : ${item.transferSpeed} ${item.transferSpeedUnit}`}</h4>
                </div>
            </Accordion>
        })
    }

    const ShowAccordionPhysicalRentals = (props) => {
        return props.datas.map((item, index) => {
            return <Accordion
                key={`my-orders-item-accordion-${index}`}
                isButton={false}
                title={item.title}
                toggle={false}
            >
                <div className="my-orders-body-storage-spec-items">
                    <h4 className="margin-bottom-0 text-ellipsis" >{item.installedOs && "OS Installed"}</h4>
                    <h4 className="margin-top-0 margin-bottom-0 text-ellipsis" >{item.isNVME && "NVME"}</h4>
                    <h4 className="margin-top-0 margin-bottom-0 text-ellipsis" >{`Storage Space : ${item.storageSpace} ${item.storageSpaceUnit}`}</h4>
                    <h4 className="margin-top-0 margin-bottom-0 text-ellipsis" >{`Transfer Speed : ${item.transferSpeed} ${item.transferSpeedUnit}`}</h4>
                </div>
            </Accordion>
        })
    }

    // INITIAL RENDER
    useEffect(() => {
        smoothScrollTop();
    }, []);

    return (
        <div className={props.toggleOpen === DASHBOARD_ORDERS ? "my-orders-container" : "display-none"}>
            <div className="my-orders-wrapper">
                <div className="my-orders-header dark-bg-color">
                    <div className="my-orders-searchbar-container">
                        <div className="my-orders-searchbar-wrapper">
                            <TextInput className="my-orders-searchbar-input" />
                            <Button>Search</Button>
                        </div>
                    </div>
                    <div className="my-orders-tools-container">
                        <div className="my-orders-tools-wrapper">
                            <div className="my-orders-checkbox">
                                <div className="my-orders-checkbox-wrapper">
                                    <ShowCheckboxes />
                                </div>
                            </div>
                            <div className="my-orders-dropdown-wrapper">
                                <ShowDropdowns />
                            </div>
                        </div>
                    </div>
                </div>
                <ShowBodyPhysicalRental />
                <div className="my-orders-paging margin-top-12-18 justify-center">
                    <div className="dark-bg-color my-orders-paging-button">Prev</div>
                    <div className="dark-bg-color my-orders-paging-button">1</div>
                    <div className="dark-bg-color my-orders-paging-button">2</div>
                    <div className="dark-bg-color my-orders-paging-button">3</div>
                    <div className="dark-bg-color my-orders-paging-button">Next</div>
                </div>
            </div>
        </div>
    )
}
