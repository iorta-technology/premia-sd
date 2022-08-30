import React, { createContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Radio, Select, Input } from 'antd'
import { Option } from 'antd/lib/mentions'

import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions/leads'
import { stoageGetter } from '../../helpers'

export function OffCanvasForGlobalFilter({ ...props }) {


  const dispatch = useDispatch()

  // searchtxt, lead_status, sorByFlter, sort_status, leadfilter, lead_disposition, leadType

  const [searchTextFilter, setSearchTextFilter] = useState('')
  const [leadStatusFilter, setLeadStatusFilter] = useState('')
  const [sortByFlter, setSortByFlter] = useState('')

  const [shortByStatus, setShortByStatus] = useState('')

  const [sortStatusFilter, setsortStatusFilter] = useState('')
  const [leadFilter, setleadFilter] = useState('')
  const [leadDispositionFilter, setleadDispositionFilter] = useState('')
  const [leadTypeFilter, setleadTypeFilter] = useState('')

  const handleSortByStatus = (e) => {
    console.log("sort by type___________***", e)
    setShortByStatus(e)
  }
  const handleSearchType = (e) => {
    console.log("search type___________***", e.target.value)
    setSortByFlter(e.target.value)
  }
  const handleNameSearch = (e) => {
    console.log("name search___________***", e.target.value)
    setSearchTextFilter(e.target.value)
  }
  const handleAgeGroup = (e) => {
    console.log("age grop___________***", e.target.value)
    setSortByFlter(e.target.value)
  }
  const handleIncomeGroup = (e) => {
    console.log("income grp___________***", e.target.value)
    setSortByFlter(e.target.value)
  }
  const handleMaritalStatus = (e) => {
    console.log("mertal status___________***", e.target.value)
    setSortByFlter(e.target.value)
  }
  const handleSearchBetween = (e) => {
    console.log("search between___________***", e.target.value)
    setSortByFlter(e.target.value)
  }
  const handleApplyButton = () => {
    const { id } = stoageGetter('user')
    let skip = 0
    // let searchtxt = searchTextFilter; 
    // let sorByFlter = sortByFlter;
    // let sort_status = shortByStatus 
    let leadfilter = "all"

    let lead_disposition = ""
    let leadType = ""
    let lead_status = ""

    dispatch(actions.fetchDataAfterFilter(id, skip, searchTextFilter, lead_status, sortByFlter, shortByStatus, leadfilter, lead_disposition, leadType))
    handleClose();
  }


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  React.useEffect(() => {
    setShow(props.show)
  }, [])

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow} className="me-2">
        Filter
      </Button> */}
      <figure
        className="round-cards43" onClick={handleShow} key={"filter"}>
        {' '}
        <figcaption className="card-caption">Filter</figcaption>{' '}
      </figure>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        scroll={true}
        placement='end'
        style={{ width: '30rem', height: 'auto', marginTop: '3.7rem', backgroundColor: 'rgb(247, 247, 247)' }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Select Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div style={{ width: 'auto', height: '6rem', backgroundColor: 'white', marginBottom: '0.5rem' }}>
            <h6 style={{ fontWeight: 'bold', padding: '10px', fontSize: '13px' }}>Sort by</h6>
            <Select
              onChange={handleSortByStatus}
              bordered={false}
              name='SortBy'
              value={shortByStatus}
              style={{ width: '20rem', marginLeft: '1rem', marginTop: '1rem', borderBottom: '1px gray solid', opacity: '0.5' }}
              defaultValue=''
            >
              <Option value='new_to_old'>Lead Created Date - Newest to Oldest</Option>
              <Option value='old_to_new'>Lead Created Date - Oldest to Newest</Option>
              <Option value='allo_new_to_old'>Allocation Date - Newest to Oldest</Option>
              <Option value='allo_old_to_new'>Allocation Date - Oldest to Newest</Option>
            </Select>
          </div>
          <div style={{ width: 'auto', height: '10rem', backgroundColor: 'white', marginBottom: '0.5rem' }}>
            <h6 style={{ fontWeight: 'bold', padding: '10px', fontSize: '13px' }}>Search Type Selection</h6>
            <Radio.Group
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}
            // onChange={handleSearchType}

            >
              <Radio.Button value='name' onChange={handleSearchType}>Name</Radio.Button>
              <Radio.Button value='mobile' onChange={handleSearchType}>Mobile</Radio.Button>
              <Radio.Button value='leadId' onChange={handleSearchType}>Lead ID</Radio.Button>
            </Radio.Group>
            <div style={{ marginLeft: '20px' }}>
              <p>Name</p>
            </div>
            <Input
              type='text'
              style={{ border: 'none', borderBottom: '1px gray solid', opacity: '0.5', width: '25rem', marginLeft: '1rem', marginTop: '-10px' }}
              placeholder='Enter Name'
              size="large"
              onChange={handleNameSearch}
            />

          </div>
          <div style={{ width: 'auto', height: '4rem', backgroundColor: 'white', }}>
            {/* <h6 style={{ fontFamily: 'robotoregular', fontWeight: 'bold', padding: '10px', fontSize: '13px' }}>Filter By</h6>
            <div style={{ width: 'auto', marginTop: '0rem', marginLeft: '0.7rem' }}>
              <p style={{ fontFamily: 'robotoregular', fontWeight: 'bold', fontSize: '13px' }}>Age Group</p>
              <Select bordered={false}
                style={{ width: '6rem', borderBottom: '1px gray solid', opacity: '0.5' }}
                name='Age Group'
                value={''}
                onChange={handleAgeGroup}
              >
                <Option value='18-to-28'>18 to 28</Option>
                <Option value='29-to-35'>29 to 35</Option>
                <Option value='36-to-45'>36 to 45</Option>
                <Option value='56-and-above'>56 and above</Option>
              </Select>
            </div> */}
            {/* <div style={{ width: 'auto', marginLeft: '10rem', marginTop: '-4.3rem' }}>
              <p style={{ fontFamily: 'robotoregular', fontWeight: 'bold', fontSize: '13px' }}>Income Group</p>
              <Select bordered={false}
                style={{ width: '6rem', borderBottom: '1px gray solid', opacity: '0.5' }}
                value={''}
                name='Income Group'
                onChange={handleIncomeGroup}

              >
                <Option value='less-to-2.5'>Less than 2.5 Lacs</Option>
                <Option value='2.5-to-3.9'>2.5 Lacs to 3.9 Lacs</Option>
                <Option value='3.5-to-4.99'>3.5 Lacs to 4.99 Lacs</Option>
                <Option value='5-to-7.99'>5 Lacs to 7.99 Lacs</Option>
                <Option value='8-to-9.9'>8 Lacs to 9.9 Lacs</Option>
                <Option vlue='10-to-14.99'>More than 10 Lacs, Less than 14.99 Lacs</Option>
                <Option value='15-to-20'>More than 15 Lacs, Less than 20 Lacs</Option>
                <Option value='20-to-more'>More than 20 Lacs</Option>
              </Select>
            </div> */}
            {/* <div style={{ widht: 'auto', marginLeft: '19rem', position: 'relative', top: '-4.3rem' }}>
              <p style={{ fontFamily: 'robotoregular', fontWeight: 'bold', fontSize: '13px' }}>Marital Status</p>
              <Select bordered={false}
                style={{ width: '6rem', borderBottom: '1px gray solid', opacity: '0.5' }}
                name='Marital Status'
                value={''}
                onChange={handleMaritalStatus}
              >
                <Option value='Single'>Single</Option>
                <Option value='Married'>Married, No Kids</Option>
                <Option value='With-kids'>With Kids</Option>
              </Select>
            </div> */}
            {/* <div style={{ width: 'auto', height: '6rem', backgroundColor: 'white', marginTop: '-2.5rem' }}>

              <h6 style={{ fontFamily: 'robotoregular', fontWeight: 'bold', padding: '10px', fontSize: '13px' }}>Search Between</h6>
              <Radio.Group
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}
                onChange={handleSearchBetween}
              >
                <Radio.Button value='Name'>MTD</Radio.Button>
                <Radio.Button value='Mobile'>YTD</Radio.Button>
                <Radio.Button value='Lead'>Custom</Radio.Button>
              </Radio.Group>

            </div> */}

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button
                style={{ marginTop: '15px', width: '6rem', backgroundColor: 'rgb(59, 55, 30)', color: '#fff' }}
                onClick={handleApplyButton}
              >Apply</Button>
            </div>

          </div>
        </Offcanvas.Body>

      </Offcanvas>
    </>
  );
}

function GlobalFilters(props) {
  console.log("props*******", props)
  return (
    <>
      <OffCanvasForGlobalFilter key={"0"} filterdata={props} />
    </>
  );
}

export default GlobalFilters;