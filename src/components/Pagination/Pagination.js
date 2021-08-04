import { useState } from 'react';
import { Pagination } from 'antd';
import './Pagination.css'

const Page = (props) => {
    function itemRender(cur, type, originalElement) {
        // current = props.pageNo
        const onPrevious = ()=>{
           
            console.log(current)
        }
        const onNext = ()=>{

            setcurrent(current+1)
            console.log(current)

        }
        if (type === 'prev') {
          return <button onClick={onPrevious}>Previous</button>;
        }
        if (type === 'next') {
          return <button current={current} onClick={onNext}>Next</button>;
        }
        
        return originalElement;
    }

    const [current,setcurrent] = useState(1)

    const handleClick = (page)=>{
        setcurrent(page)
        // console.log(page)
    }
    
    return (
        <div className="page-holder">
            <Pagination current={current} onChange={handleClick} total={50} defaultPageSize={15} itemRender={itemRender} />
        </div>
    )
}

export default Page
