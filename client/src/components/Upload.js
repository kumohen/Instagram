// import React, { Component } from 'react';
// import axios from 'axios';

// export default class FilesUploadComponent extends Component {

//     constructor(props) {
//         super(props);

//         this.onFileChange = this.onFileChange.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);

//         this.state = {
//             imgCollection: ''
//         }
//     }

//     onFileChange(e) {
//         this.setState({ imgCollection: e.target.files })
//     }

//     onSubmit(e) {
//         e.preventDefault()

//         var formData = new FormData();
//         for (const key of Object.keys(this.state.imgCollection)) {
//             formData.append('imgCollection', this.state.imgCollection[key])
//         }
//         axios.post("http://localhost:4000/api/upload-images", formData, {
//         }).then(res => {
//             console.log(res.data)
//         })
//     }

//     render() {
//         return (
//             <div className="container">
//                 <div className="row">
//                     <form onSubmit ={this.onSubmit}>
//                     <div className="form-group">
                            
//                         </div>
//                         <div className="form-group">
//                             <input type="file" name="imgCollection" onChange={this.onFileChange} multiple />
//                         </div>
//                         <div className="form-group">
//                             <button className="btn btn-primary" type="submit">Upload</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         )
//     }
// }


import React,{useState} from 'react';
import axios from 'axios';
import {addPost} from "../actions/post_action"
import {useDispatch} from "react-redux"

const Upload = ({show,onChange}) => {
   const [imgCollection,setImgCollection] = useState("");
   const[title,setTitle] = useState("");

       const onFileChange = (e)=> {
       // this.setState({ imgCollection: e.target.files })
       setImgCollection(e.target.files);
    }
    const dispatch = useDispatch();
    const onSubmit = (e)=> {
        e.preventDefault()
        // const config = {
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: "Bearer " + localStorage.getItem("jwt"),
        //     },
        //   };
        var formData = new FormData();
        for (const key of Object.keys(imgCollection)) {
            formData.append('imgCollection', imgCollection[key])
        }
        formData.append('title', title);
        dispatch(addPost(formData));
        onChange(false);
       // window.location.reload()
        // axios.post("http://localhost:4000/api/posts/cpost", formData, config , {
        // }).then(res => {
        //     console.log(res.data)
        // })
    }
    return (
        <div className="container">
                 <div className="row">
                     <form onSubmit ={onSubmit}>
                     <div className="form-group mb-2">
                            <input type="text" name="title" placeholder="write your content" className="form-control" onChange={e => setTitle(e.target.value)}  value={title}/>
                    </div>
                         <div className="form-group mb-2">
                            <input type="file" name="imgCollection" className="form-control" onChange={onFileChange} multiple />
                         </div>
                        <div className="form-group">
                             <button className="btn btn-primary" type="submit">Submit</button>
                         </div>
                    </form>
                 </div>
             </div>
    );
};

export default Upload;