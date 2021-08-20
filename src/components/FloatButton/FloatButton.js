import React from 'react'
import {PlusCircleFilled} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import './FloatButton.css'
const FloatButton = () => {
    return (
        <div>
            <Link to="/leadmasterpage/statuslead">
                <PlusCircleFilled className="icon-size" />
            </Link>
        </div>
    )
}

export default FloatButton
