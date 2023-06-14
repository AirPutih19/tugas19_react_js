import axios from "axios";
import React,{Component} from "react";

class App extends Component{
constructor(props){
  super(props);
  this.state={
    edit:false,
    dataApi:[],
    dataPost:{
      id:0,
      nama_karyawan:"",
      jabatan:"",
      jenis_kelamin:"",
      tanggal_lahir:"",
    }
  }
  this.inputChange= this.inputChange.bind(this);
  this.handleRemove=this.handleRemove.bind(this);
}




reloadData(){
  axios.get(`http://localhost:3004/data-karyawan`).then(
    res=>{this.setState({
      dataApi:res.data,
      edit:false
    })}
  )

};
clearData=()=>{
  let newdataPost = {...this.dataPost};
  

  newdataPost['id']="";
  newdataPost['nama_karyawan']="";
  newdataPost['jabatan']="";
  newdataPost['jenis_kelamin']="";
  newdataPost['tanggal_lahir']="";

  this.setState({
    dataPost:newdataPost
  });
}


inputChange(e){

  let newdataPost = {...this.state.dataPost};
  if(this.edit === false){
    newdataPost['id'] = new Date().getTime;
  }
    newdataPost[e.target.name] = e.target.value
  this.setState({ 

    dataPost:newdataPost
  },
  ()=> console.log(this.state.dataPost)
  )
}

handleRemove(e){
  console.log(e.target.value);
  fetch(`http://localhost:3004/data-karyawan/${e.target.value}`,{
    method: "DELETE"
  }).then(res=>this.reloadData())
}


onSubmitForm = ()=>{
  if(this.state.edit===false){
  axios.post(`http://localhost:3004/data-karyawan`,this.state.dataPost)
  .then(()=>{this.reloadData()});
  this.clearData();
  }else{
    axios.put(`http://localhost:3004/data-karyawan/${this.state.dataPost.id}`,this.state.dataPost)
    .then(()=>{this.reloadData();
      this.clearData();
    })
    ;
  }
}

getDataId= (e) =>{
  axios.get(`http://localhost:3004/data-karyawan/${e.target.value}`)
  .then(res=>{
    this.setState({
      dataPost:res.data,
      edit:true
    })
  })

}

componentDidMount(){
  this.reloadData();
}



  render(){
    return(
      <div>
        <nav><h1>Data Karyawan</h1></nav>
        <br></br>
        <br></br>
        <input type="text" name="nama_karyawan" value={this.state.dataPost.nama_karyawan} placeholder="Masukan Nama Karyawan" onChange={this.inputChange}/>
        <input type="text" name="jabatan" value={this.state.dataPost.jabatan} placeholder="Masukan Jabatan"onChange={this.inputChange} />
        <input type="text" name="jenis_kelamin" value={this.state.dataPost.jenis_kelamin} placeholder="Masukan Jenis Kelamin" onChange={this.inputChange}/>
        <input type="date" name="tanggal_lahir" value={this.state.dataPost.tanggal_lahir} onChange={this.inputChange}/>
        <button className="save" onClick={this.onSubmitForm}>Save Data</button>
        {this.state.dataApi.map((dat,index)=>
        {
          return(
            <div className="hasil" key={index}>
              <p> Nama : {dat.nama_karyawan}</p>
              <p> Jabatan : {dat.jabatan}</p>
              <p> Jenis Kelamin : {dat.jenis_kelamin}</p>
              <p> Tanggal Lahir : {dat.tanggal_lahir}</p>
              <button className="delete" value={dat.id} onClick={this.handleRemove}>Delete</button>
              <button className="editData" onClick={this.getDataId} value={dat.id}>Edit data</button>
            </div>
          )
        })}
      </div>
    );
  }
} 

export default App;
