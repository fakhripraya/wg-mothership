import React from 'react'
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Checkbox from '../../components/Checkbox';
import TextInput from '../../components/TextInput';
import './style.scss';
import { filterCheckboxes, filterDropdowns, itemListDummy } from '../../variables/dummy/myremote';
import { useEffect } from 'react';
import { smoothScrollTop } from '../../utils/functions/global';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_CATALOG } from '../../variables/global';

export default function DashboardCatalogue(props) {

    // FUNCTIONS SPECIFIC //
    function handleOpenDetail(item, navigate) {
        navigate(`/detail?itemId=${item.ID}`);
    }

    function handleGoToAddCatalogue(navigate) {
        navigate(`/dashboard/add/catalogue`);
    }

    // COMPONENTS SPECIFIC //
    const ShowCheckboxes = () => {
        return filterCheckboxes.map((item, index) => {
            return <Checkbox key={`checkbox-${item.title}-${index}`} className="dashboard-catalogue-checkbox-item" title={item.title} />
        })
    }

    const ShowDropdowns = () => {
        return filterDropdowns.map((item, index) => {
            return <Dropdown onChange={(value) => { }} key={`dashboard-catalogue-filter-dropdown-${index}`} className="dashboard-catalogue-dropdown-item" style={{ width: "100px", maxWidth: "100px" }} showTitle={item.showTitle} toggle={item.toggle} values={item.values} />
        })
    }

    const ShowAddButton = () => {
        // HOOK
        const navigate = useNavigate();

        // RENDER
        return <div onClick={() => handleGoToAddCatalogue(navigate)} className="dashboard-catalogue-add-button margin-top-12-18 dark-bg-color justify-center">
            <span className="main-color">Add +</span>
        </div>
    }

    const ShowBody = () => {
        // HOOK
        const navigate = useNavigate();

        // RENDER
        return itemListDummy.map((item, index) => {
            return <div key={`dashboard-catalogue-items-${index}`} className="dashboard-catalogue-body margin-top-12-18 dark-bg-color">
                <div className="dashboard-catalogue-items dashboard-catalogue-body-identifier">
                    <h3 className="margin-top-0" >{item.title}</h3>
                    <h4 className="margin-top-0 margin-bottom-0" >ID: {item.ID}</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >Tanggal List: {item.date}</h4>
                    <div className="dashboard-catalogue-identifier-img-wrapper">
                        <img className="dashboard-catalogue-identifier-img" src={item.img.src} alt={item.img.alt} />
                    </div>
                </div>
                <div className="dashboard-catalogue-items dashboard-catalogue-body-cpu-spec">
                    <h3 className="margin-top-0 margin-bottom-0" ><span className="main-color">Statistik</span></h3>
                    <h4 className="margin-bottom-0" >Views: 1203</h4>
                    <h4 className="margin-top-0" >Tersewa: 12</h4>
                </div>
                <div className="dashboard-catalogue-items dashboard-catalogue-body-graphical-spec">
                    <h3 className="margin-top-0 margin-bottom-0" ><span className="main-color">Stok</span></h3>
                    <h4 className="margin-bottom-0" >Tersedia: 12</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >Tersewa: 12</h4>
                    <h4 >Total: 24</h4>
                </div>
                <div className="dashboard-catalogue-items dashboard-catalogue-body-storage-spec">
                    <h3 className="margin-top-0 margin-bottom-0" ><span className="main-color">Harga</span></h3>
                    <h4 className="margin-bottom-0" >Rp.1.200.000,00 / day</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >Rp.1.200.000,00 / 3 day</h4>
                    <h4 className="margin-top-0" >Rp.1.200.000,00 / 7 day</h4>
                </div>
                <div className="dashboard-catalogue-items dashboard-catalogue-body-rent-detail">
                    <h3 className="margin-top-0 margin-bottom-0" ><span className="main-color">Penyewaan</span></h3>
                    <h4 className="margin-bottom-0" >Durasi : {item.rentDetail.duration} {item.rentDetail.durationUnit}</h4>
                    <h4 className="margin-top-0 margin-bottom-0" >Berakhir : {item.rentDetail.endAt}</h4>
                    <h5 className="margin-top-0 margin-bottom-0" >{item.rentDetail.price}{item.rentDetail.priceUnit}</h5>
                    <h5 onClick={() => handleOpenDetail(item, navigate)} className="margin-bottom-0 dark-color light-bg-color dashboard-catalogue-body-rent-button" >Details</h5>
                    <h5 className="main-bg-color dashboard-catalogue-body-rent-detail-status" >Status : {item.rentDetail.status}</h5>
                    <h5 className="margin-top-0 margin-bottom-0 red-bg-color dashboard-catalogue-body-rent-button" >Cancel</h5>
                </div>
            </div>
        })
    }

    // INITIAL RENDER
    useEffect(() => {
        smoothScrollTop();
    }, []);

    return (
        <div className={props.toggleOpen === DASHBOARD_CATALOG ? "dashboard-catalogue-container" : "display-none"}>
            <div className="dashboard-catalogue-wrapper">
                <div className="dashboard-catalogue-header dark-bg-color">
                    <div className="dashboard-catalogue-searchbar-container">
                        <div className="dashboard-catalogue-searchbar-wrapper">
                            <TextInput className="dashboard-catalogue-searchbar-input" />
                            <Button>Search</Button>
                        </div>
                    </div>
                    <div className="dashboard-catalogue-tools-container">
                        <div className="dashboard-catalogue-tools-wrapper">
                            <div className="dashboard-catalogue-checkbox">
                                <div className="dashboard-catalogue-checkbox-wrapper">
                                    <ShowCheckboxes />
                                </div>
                            </div>
                            <div className="dashboard-catalogue-dropdown-wrapper">
                                <ShowDropdowns />
                            </div>
                        </div>
                    </div>
                </div>
                <ShowAddButton />
                <ShowBody />
                <div className="dashboard-catalogue-paging margin-top-12-18 justify-center">
                    <div className="dark-bg-color dashboard-catalogue-paging-button">Prev</div>
                    <div className="dark-bg-color dashboard-catalogue-paging-button">1</div>
                    <div className="dark-bg-color dashboard-catalogue-paging-button">2</div>
                    <div className="dark-bg-color dashboard-catalogue-paging-button">3</div>
                    <div className="dark-bg-color dashboard-catalogue-paging-button">Next</div>
                </div>
            </div>
        </div>
    )
}
