import React from 'react'
import { Button, Modal } from 'antd';
import { useState, useEffect } from 'react';
import "./ShowPdf.css"
// import { Document, Page } from 'react-pdf';

// import PDFViewer from "pdf-viewer-reactjs";

const ShowPdf = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    console.log(props.show,"this is show")
    setIsModalOpen(isModalOpen=>props.show)
  }, [props.show])

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Showing PDF"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        centered={true}
        footer={null}
        className="modalStyle"
      >
        <div className='pdf'>
          <iframe src="https://arxiv.org/pdf/quant-ph/0410100.pdf" ></iframe>
        </div>

      </Modal>
    </>
  );
}

export default ShowPdf