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

export default function MyRemote() {

    // COMPONENTS SPECIFIC //
    const ShowCheckboxes = () => {
        return filterCheckboxes.map((item, index) => {
            return <Checkbox key={`checkbox-${item.title}-${index}`} className="my-remote-checkbox-item" title={item.title} />
        })
    }

    const ShowDropdowns = () => {
        return filterDropdowns.map((item, index) => {
            return <Dropdown key={`my-remote-filter-dropdown-${index}`} className="my-remote-dropdown-item" style={{ width: "100px", maxWidth: "100px" }} showTitle={item.showTitle} toggle={item.toggle} values={item.values} />
        })
    }

    const ShowBody = () => {
        return itemListDummy.map((item, index) => {
            return <div key={`my-remote-items-${index}`} className="my-remote-body margin-top-12-18 dark-bg-color">
                <div className="my-remote-body-items my-remote-body-identifier">
                    <h3 className="margin-top-0" >{item.title}</h3>
                    <h4 className="margin-top-0 margin-bottom-0" >ID: {item.ID}</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >List date: {item.date}</h4>
                    <div className="my-remote-identifier-img-wrapper">
                        <img className="my-remote-identifier-img" src={item.img.src} alt={item.img.alt} />
                    </div>
                </div>
                <div className="my-remote-body-items my-remote-body-cpu-spec">
                    <h3 className="margin-top-0 margin-bottom-0" >{item.cpu.title}</h3>
                    <h4 className="margin-bottom-0" >Core: {item.cpu.core} Cores</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >Thread: {item.cpu.thread} Threads</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >Clock Speed: {item.cpu.clockSpeed} Ghz</h4>
                </div>
                <div className="my-remote-body-items my-remote-body-graphical-spec">
                    <h3 className="margin-top-0 margin-bottom-0" >{item.graphical.title}</h3>
                    <h4 className="margin-bottom-0" >Core: {item.graphical.cudaCore} Cuda Core</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >Clock Speed: {item.graphical.clockSpeed}  Ghz</h4>
                    <h4 className="margin-bottom-0" >Memory: {item.graphical.memory} {item.graphical.memoryUnit} Memory</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >Memory Type: {item.graphical.memoryType}</h4>
                </div>
                <div className="my-remote-body-items my-remote-body-storage-spec">
                    <ShowAccordion datas={item.storageList} />
                </div>
                <div className="my-remote-body-items my-remote-body-rent-detail">
                    <h4 className="margin-top-0 margin-bottom-0" >Durations : {item.rentDetail.duration} {item.rentDetail.durationUnit}</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >End at : {item.rentDetail.endAt}</h4>
                    <h5 className="margin-top-0 margin-bottom-0" >{item.rentDetail.price}{item.rentDetail.priceUnit}</h5>
                    <h5 className="margin-bottom-0 dark-color light-bg-color my-remote-body-rent-button" >Details</h5>
                    <h5 className="main-bg-color my-remote-body-rent-detail-status" >Status : {item.rentDetail.status}</h5>
                    <h5 className="margin-top-0 margin-bottom-0 red-bg-color my-remote-body-rent-button" >Cancel</h5>
                </div>
            </div>
        })
    }

    const ShowAccordion = (props) => {
        return props.datas.map((item, index) => {
            return <Accordion
                key={`my-remote-item-accordion-${index}`}
                isButton={false}
                title={item.title}
                toggle={false}
            >
                <div className="my-remote-body-storage-spec-items">
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
        <div className="my-remote-container">
            <div className="my-remote-wrapper">
                <div className="my-remote-title">
                    <h2>MY REMOTE DEVICE LIST</h2>
                </div>
                <div className="my-remote-header dark-bg-color">
                    <div className="my-remote-searchbar-container">
                        <div className="my-remote-searchbar-wrapper">
                            <TextInput className="my-remote-searchbar-input" />
                            <Button>Search</Button>
                        </div>
                    </div>
                    <div className="my-remote-tools-container">
                        <div className="my-remote-tools-wrapper">
                            <div className="my-remote-checkbox">
                                <div className="my-remote-checkbox-wrapper">
                                    <ShowCheckboxes />
                                </div>
                            </div>
                            <div className="my-remote-dropdown-wrapper">
                                <ShowDropdowns />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-remote-add-button margin-top-12-18 dark-bg-color justify-center">
                    <span className="main-color">Add +</span>
                </div>
                <ShowBody />
                <div className="my-remote-paging margin-top-12-18 justify-center">
                    <div className="dark-bg-color my-remote-paging-button">Prev</div>
                    <div className="dark-bg-color my-remote-paging-button">1</div>
                    <div className="dark-bg-color my-remote-paging-button">2</div>
                    <div className="dark-bg-color my-remote-paging-button">3</div>
                    <div className="dark-bg-color my-remote-paging-button">Next</div>
                </div>
            </div>
        </div>
    )
}
