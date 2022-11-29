import React, {
    useEffect,
    useState
} from 'react';
import Dropdown from '../../components/Dropdown';
import './style.scss';

export default function Finder() {

    // STATES //
    const [breadcrumbs, setBreadcrumb] = useState([]);

    // FUNCTIONS SPECIFIC //
    

    useEffect(() => {
        // INITIAL RENDER
        const dummyBreadcrumb = ["Home", "Graphical Renders", "Tesla P100"];
        setBreadcrumb(dummyBreadcrumb);
    }, [])

    return (
        <div className="finder-container">
            <div className="finder-wrapper">
                <div className="finder-breadcrumbs">
                    {breadcrumbs.map((item,index) => {
                        if (item !== breadcrumbs[breadcrumbs.length - 1]) return <h3 key={`${item}-${index}`} >{item}</h3>
                        else return <h3 key={`${item}-${index}`}>{item}</h3>
                    })}
                </div>
                <div className="finder-title">
                    <h2>THIS IS THE TITLE OF THE FINDER</h2>
                </div>
                <div className="finder-flex-container">
                    <div className="finder-tools-container">
                        <h2>Category</h2>
                    </div>
                    <div className="finder-cards-container">
                        <div className="finder-cards-header">
                            <div className="finder-cards-counter">
                                <span>asdasdas</span>
                                <strong>asdasdasd</strong>
                            </div>
                            <Dropdown toggle={true} values={["Fittest","Jancokest"]}/>
                        </div>
                        <div className="finder-cards-wrapper">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
