import React, {
    useEffect,
    useState
} from 'react';
import './style.scss';

export default function Finder() {

    // STATES //
    const [breadcrumbs, setBreadcrumb] = useState([]);

    // COMPONENT FUNCTIONS //

    useEffect(() => {
        // INITIAL RENDER
        const dummyBreadcrumb = ["Home", "Graphical Renders", "Tesla P100"];
        setBreadcrumb(dummyBreadcrumb);
    }, [])

    return (
        <div className="finder-container">
            <div className="finder-wrapper">
                <div className="finder-breadcrumbs">
                    {breadcrumbs.map((item) => {
                        if (item !== breadcrumbs[breadcrumbs.length - 1]) return <h3>{item}</h3>
                        else return <h3>{item}</h3>
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
                            <div className="finder-dropdown-container">
                                <span className="finder-dropdown-title">Sort by: </span>
                                <div className="finder-dropdown-button-container">
                                    <button className="finder-dropdown-button-wrapper">
                                        <label className="finder-dropdown-button-label">
                                            <span className="light-color">Fittest</span>
                                        </label>
                                        <span className="finder-dropdown-button-label-after" ></span>
                                    </button>
                                    <div className="filter-dropdown-items-container">
                                        <ul className="filter-dropdown-items-unordered-list">
                                            <li className="filter-dropdown-items-list">
                                                <button className="filter-dropdow-list-button">
                                                    <span>Fittest</span>
                                                </button>
                                            </li>
                                            <li className="filter-dropdown-items-list">
                                                <button className="filter-dropdow-list-button">
                                                    <span>Jancokest</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="finder-cards-wrapper">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
