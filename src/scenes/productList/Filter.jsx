import React from 'react'

export default function Filter(props) {
    var handleFilterByName = props.handleFilterByName
    var handleFilterByMaxPrice = props.handleFilterByMaxPrice
  return (
        <div className="well well-small">
            <input type="text" placeholder="Filter"  onChange={handleFilterByName}></input> 
            Max: <input type="text" placeholder="Filter"  onChange={handleFilterByMaxPrice}></input> 
        </div>
  )
}
