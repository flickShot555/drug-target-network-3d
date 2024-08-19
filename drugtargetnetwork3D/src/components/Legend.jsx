import React from 'react'

const Legend = () => {
  return (
    <div>
         <div className="legend1" id="legend1" style={{ marginLeft: '12px' }}>
      <legend className="legenddata" id="Drug_disease_phase">
        Disease clinical phase
      </legend>
      <ul id="phases_disease" className="legend_inner"></ul>

      <legend className="legenddata" id="Disease_class_heading">
        Disease class
      </legend>
      <ul id="disease_Class" className="legend_inner"></ul>
    </div>
    </div>
  )
}

export default Legend
