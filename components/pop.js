import React from 'react'

function pop(props) {
   
 return (props.trigger)?(
            <div>
                <h3>pop up has to come and show the data enter and edit option</h3>
                <button onClick={()=>props.trigger(true)}>edit</button>
                { props.children  }
            </div>
 ) : "";
    
}

export default pop
