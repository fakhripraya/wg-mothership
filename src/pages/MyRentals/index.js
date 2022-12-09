import React from 'react'
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Checkbox from '../../components/Checkbox';
import TextInput from '../../components/TextInput';
import './style.scss';
import { filterCheckboxes, filterDropdowns, itemListDummy } from '../../variables/dummy/myremote';
import Accordion from '../../components/Accordion';
import { useEffect } from 'react';
import { smoothScrollTop } from '../../utils/functions/global';
import { useNavigate } from 'react-router-dom';

export default function MyRentals() {

    // FUNCTIONS SPECIFIC //
    function handleOpenDetail(item, navigate) {
        navigate(`/detail?itemId=${item.ID}`);
    }

    // COMPONENTS SPECIFIC //
    const ShowCheckboxes = () => {
        return filterCheckboxes.map((item, index) => {
            return <Checkbox key={`checkbox-${item.title}-${index}`} className="my-rentals-checkbox-item" title={item.title} />
        })
    }

    const ShowDropdowns = () => {
        return filterDropdowns.map((item, index) => {
            return <Dropdown key={`my-rentals-filter-dropdown-${index}`} className="my-rentals-dropdown-item" style={{ width: "100px", maxWidth: "100px" }} showTitle={item.showTitle} toggle={item.toggle} values={item.values} />
        })
    }

    const ShowBody = () => {
        // HOOK
        const navigate = useNavigate();
        // Render list
        return itemListDummy.map((item, index) => {
            return <div key={`my-rentals-items-${index}`} className="my-rentals-body margin-top-12-18 dark-bg-color">
                <div className="my-rentals-body-items my-rentals-body-identifier">
                    <h3 className="margin-top-0" >{item.title}</h3>
                    <h4 className="margin-top-0 margin-bottom-0" >ID: {item.ID}</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >List date: {item.date}</h4>
                    <div className="my-rentals-identifier-img-wrapper">
                        <img className="my-rentals-identifier-img" src={item.img.src} alt={item.img.alt} />
                    </div>
                </div>
                <div className="my-rentals-body-items my-rentals-body-cpu-spec">
                    <h3 className="margin-top-0 margin-bottom-0" >{item.cpu.title}</h3>
                    <h4 className="margin-bottom-0" >Core: {item.cpu.core} Cores</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >Thread: {item.cpu.thread} Threads</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >Clock Speed: {item.cpu.clockSpeed} Ghz</h4>
                </div>
                <div className="my-rentals-body-items my-rentals-body-graphical-spec">
                    <h3 className="margin-top-0 margin-bottom-0" >{item.graphical.title}</h3>
                    <h4 className="margin-bottom-0" >Core: {item.graphical.cudaCore} Cuda Core</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >Clock Speed: {item.graphical.clockSpeed}  Ghz</h4>
                    <h4 className="margin-bottom-0" >Memory: {item.graphical.memory} {item.graphical.memoryUnit} Memory</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >Memory Type: {item.graphical.memoryType}</h4>
                </div>
                <div className="my-rentals-body-items my-rentals-body-storage-spec">
                    <ShowAccordion datas={item.storageList} />
                </div>
                <div className="my-rentals-body-items my-rentals-body-rent-detail">
                    <h4 className="margin-top-0 margin-bottom-0" >Durations : {item.rentDetail.duration} {item.rentDetail.durationUnit}</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >End at : {item.rentDetail.endAt}</h4>
                    <h5 className="margin-top-0 margin-bottom-0" >{item.rentDetail.price}{item.rentDetail.priceUnit}</h5>
                    <h5 onClick={() => handleOpenDetail(item, navigate)} className="margin-bottom-0 dark-color light-bg-color my-rentals-body-rent-button" >Details</h5>
                    <h5 className="main-bg-color my-rentals-body-rent-detail-status" >Status : {item.rentDetail.status}</h5>
                    <h5 className="margin-top-0 margin-bottom-0 red-bg-color my-rentals-body-rent-button" >Cancel</h5>
                </div>
            </div>
        })
    }

    const ShowAccordion = (props) => {
        return props.datas.map((item, index) => {
            return <Accordion
                key={`my-rentals-item-accordion-${index}`}
                isButton={false}
                title={item.title}
                toggle={false}
            >
                <div className="my-rentals-body-storage-spec-items">
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
        <div className="my-rentals-container">
            <div className="my-rentals-wrapper">
                <div className="my-rentals-title">
                    <h2>MY RENTAL LISTS</h2>
                </div>
                <div className="my-rentals-header dark-bg-color">
                    <div className="my-rentals-searchbar-container">
                        <div className="my-rentals-searchbar-wrapper">
                            <TextInput className="my-rentals-searchbar-input" />
                            <Button>Search</Button>
                        </div>
                    </div>
                    <div className="my-rentals-tools-container">
                        <div className="my-rentals-tools-wrapper">
                            <div className="my-rentals-checkbox">
                                <div className="my-rentals-checkbox-wrapper">
                                    <ShowCheckboxes />
                                </div>
                            </div>
                            <div className="my-rentals-dropdown-wrapper">
                                <ShowDropdowns />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-rentals-add-button margin-top-12-18 dark-bg-color justify-center">
                    <span className="main-color">Add +</span>
                </div>
                <ShowBody />
                <div className="my-rentals-paging margin-top-12-18 justify-center">
                    <div className="dark-bg-color my-rentals-paging-button">Prev</div>
                    <div className="dark-bg-color my-rentals-paging-button">1</div>
                    <div className="dark-bg-color my-rentals-paging-button">2</div>
                    <div className="dark-bg-color my-rentals-paging-button">3</div>
                    <div className="dark-bg-color my-rentals-paging-button">Next</div>
                </div>
            </div>
        </div>
    )
}
