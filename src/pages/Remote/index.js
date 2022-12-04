import React from 'react'
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Checkbox from '../../components/Checkbox';
import TextInput from '../../components/TextInput';
import './style.scss';
import { filterCheckboxes, filterDropdowns, storageList } from '../../variables/dummy/remote';
import Accordion from '../../components/Accordion';

export default function Remote() {

    // COMPONENTS SPECIFIC //
    const ShowCheckboxes = ()=>{
        return filterCheckboxes.map((item,index)=>{
            return <Checkbox key={`checkbox-${item.title}-${index}`} title={item.title}/>
        })
    }

    const ShowDropdowns = ()=>{
        return filterDropdowns.map((item,index)=>{
            return <Dropdown key={`remote-filter-dropdown-${index}`} style={{ width: "100px", maxWidth: "100px" }} showTitle={item.showTitle} toggle={item.toggle} values={item.values} />
        })
    }

    const ShowBody = () =>{

    }

    const ShowAccordion = () =>{
        return storageList.map((item,index)=>{
            return <Accordion 
            key={`remote-item-accordion-${index}`}
            isButton={false} 
            title={item.title}
            toggle={false}
            >
                <div className="remote-body-storage-spec-items">
                    <h4 className="margin-bottom-0 text-ellipsis" >{item.installedOs && "OS Installed"}</h4>
                    <h4 className="margin-top-0 margin-bottom-0 text-ellipsis" >{item.isNVME && "NVME"}</h4>
                    <h4 className="margin-top-0 margin-bottom-0 text-ellipsis" >{`Storage Space : ${item.storageSpace} ${item.storageSpaceUnit}`}</h4>
                    <h4 className="margin-top-0 margin-bottom-0 text-ellipsis" >{`Transfer Speed : ${item.transferSpeed} ${item.transferSpeedUnit}`}</h4>
                </div>
            </Accordion>
        }) 
    }

    return (
        <div className="remote-container">
            <div className="remote-wrapper">
                <div className="remote-title">
                    <h2>MY REMOTE DEVICE LIST</h2>
                </div>
                <div className="remote-header dark-bg-color">
                    <div className="remote-searchbar-container">
                        <div className="remote-searchbar-wrapper">
                            <TextInput/>
                            <Button>Search</Button>
                        </div>
                    </div>
                    <div className="remote-tools-container">
                        <div className="remote-tools-wrapper">
                            <div className="remote-checkbox">
                                <div className="remote-checkbox-wrapper">
                                        <ShowCheckboxes/>
                                </div>
                            </div>
                            <div className="remote-dropdown-wrapper">
                                <ShowDropdowns />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="remote-body margin-top-bottom-12-18 dark-bg-color">
                    <div className="remote-body-identifier">
                        <h3 className="margin-top-0 margin-bottom-0 text-ellipsis" >Title</h3>
                        <h4 className="margin-top-0 margin-bottom-0 text-ellipsis" >ID</h4>
                        <h4 className="margin-top-0 margin-bottom-0 text-ellipsis" >15 june 2022</h4>
                        <div className="remote-identifier-img-wrapper">
                            <img className="remote-identifier-img" src={"https://www.shutterstock.com/image-photo/gaming-pc-rgb-led-lights-600w-1621672105.jpg"} alt={"s"}/>                      
                        </div>
                    </div>
                    <div className="remote-body-cpu-spec">
                        <h3 className="margin-top-0 margin-bottom-0 text-ellipsis" >Intel I5 6600K</h3>
                        <h4 className="margin-bottom-0 text-ellipsis" >4 thread</h4>
                        <h4 className="margin-top-0 margin-bottom-0 text-ellipsis" >4 core</h4>
                        <h4 className="margin-top-0 margin-bottom-0 text-ellipsis" >3.9 Ghz</h4>
                    </div>
                    <div className="remote-body-graphical-spec">
                        <h3 className="margin-top-0 margin-bottom-0 text-ellipsis" >RTX 3080 </h3>
                        <h4 className="margin-bottom-0 text-ellipsis" >10240 Cuda Core</h4>
                        <h4 className="margin-top-0 margin-bottom-0 text-ellipsis" >1.67 Ghz</h4>
                        <h4 className="margin-bottom-0 text-ellipsis" >12GB Memory</h4>
                        <h4 className="margin-top-0 margin-bottom-0 text-ellipsis" >GDDR6X</h4>
                    </div>
                    <div className="remote-body-storage-spec">
                        <ShowAccordion/>
                    </div>
                    <div className="remote-body-rent-detail">
                        <h4 className="margin-top-0 margin-bottom-0 text-ellipsis" >Duration 5 hours</h4>
                        <h5 className="margin-top-0 margin-bottom-0 text-ellipsis" >0.276$ / Hour</h5>
                        <h5 className="margin-bottom-0 text-ellipsis dark-color light-bg-color remote-body-rent-button" >Details</h5>
                        <h5 className="text-ellipsis main-bg-color remote-body-rent-detail-status" >Status : Active</h5>
                        <h5 className="margin-top-0 margin-bottom-0 text-ellipsis red-bg-color remote-body-rent-button" >Cancel</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}
