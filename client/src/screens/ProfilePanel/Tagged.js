import React from 'react';

const Tagged = () => {
    return (
        <div style={{ display:"flex",flexDirection:"column", alignItems:"center",}}>
           <div style={{height:"60px",width:"60px",border:"1px solid black",borderRadius:"50%",alignItems:"center",marginTop:"50px"}}>
               <i className="fal fa-camera-alt fa-2x" style={{marginTop:"12px"}}></i>
           </div>

            <h3 style
            ={{fontWeight:"200"}}>Photos of you</h3>
            <p style
            ={{fontWeight:"200"}}>When people tag you in photos, they'll appear here.</p>
        </div>
    );
};

export default Tagged;