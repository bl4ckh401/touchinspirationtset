import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ crumbs }) => (
    <nav className="bg-gray-200 flex flex-row w-full py-2 z-10 h-fit min-h-8 justify-start items-center">
        <ol className="breadcrumb w-full flex flex-row">
            {crumbs.map((crumb, index) => (
                <li key={index} className="breadcrumb-item">
                    <Link to={crumb.path} className="text-blue-500">{`${crumb.label} > `}</Link>
                </li>
            ))}
        </ol>
    </nav>

);

export default Breadcrumbs;
