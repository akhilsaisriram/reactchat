import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux';
import { authaction } from './reduxstore/store';


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import loginb from './emi.jpg'
import './App.css'


//import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@mui/material/TextField';

import { Bar } from 'react-chartjs-2';

import { Chart,LinearScale,BarElement,CategoryScale,Legend,Title,Tooltip } from 'chart.js';
Chart.register(
  LinearScale,BarElement,CategoryScale,Legend,Title,Tooltip
)

const options={
  Plugin:{
    legend:{
      position:'top'
    },
    title:{
      display:true,
      text:"test"
    }
  }
}




const Dashbord = () => {

  
  const Navigate=useNavigate();

  const dispathch=useDispatch();

    const [dataa,setdataa]=useState([])
    useEffect(() => {
      axios.post('http://127.0.0.1:8000/api/user',{token:sessionStorage.getItem("token")})
          .then((res) => {setdataa(res.data);
            dispathch(authaction.userdata(res.data));
            sessionStorage.setItem("uid",res.data.id)
          if(res.data==="User not found" || res.data==="Invalid credentials"){
        Navigate('./Home.js')
          }
          
        })

        },[])
console.log(dataa)
///////////////////////////////////////////////////////////////////////////
var emi;var interest; var principal 
const background = {
  backgroundImage: `url(${loginb})`,
  height: "670px",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};


const[data,setdata]=useState({
amt:"",
int:"",
per:""
})


const{ amt,int,per}={...data}


const[e,sete]=useState(0);
const[t,sett]=useState(0);
const[ti,setti]=useState(0);
////////////////////////////////////////////////////////

const [bal, setbal] = useState([]);

const handleAddData = (newData) => {
setbal(prevData => [...prevData, newData]);
}
////////////////////////////////////

const [month, setmon] = useState([]);

const handleAddDatam = (newData) => {
setmon(prevData => [...prevData, newData]);
}

///////////////////////////////////////////////////
const [pir, setpir] = useState([]);

const handleAddDatap = (newData) => {
setpir(prevData => [...prevData, newData]);
}
////////////////////////////////////////////////////////////////




const chanfehandler=e=>{
setdata({...data,[e.target.name]:e.target.value});
}

const onsub= async e=>{



console.log(amt,int,per)
var r = int/ 1200 // monthly interest rate
var n =  per // number of payments

var x=Math.pow(1 + r, n)
var xx=amt*r*x
var rw=x-1
emi=xx/rw

sete(emi.toFixed(3))
var kk=emi * per
sett(kk.toFixed(3))
var ii=kk-amt
setti(ii.toFixed(3))

var s=amt
for(var i=1;i<=n;i++){
 interest = s * r;
 principal = emi - interest;


s= s-principal
handleAddData(s.toFixed(3))
handleAddDatam(i)
handleAddDatap(principal.toFixed(3))



}
              
}
const labels=month.map((n)=>n);

const ch={
labels,
datasets:[
  {
    label:'balance',
    data:bal.map((nn)=>nn),
    backgroundColor:'red'
  }
]
}


useEffect(()=>{
setbal([]);
setmon([]);
setpir([]);
onsub();
if(amt+int+per===dataa.spass){

  console.log("ok");
  Navigate('./Chat')
  
}
else{console.log("not ok",dataa.spass)}
},[amt,int,per])

  return (
    <div>Dashbord {data.name}
    
    
    <div style={background}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ background:'rgba(230, 77, 25)' }} >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }} >
            <div style={{"textAlign":"center"}}>EMI calulator</div>
         
          </Typography>
  
        </Toolbar>
      </AppBar>
    </Box>
    <Box
      sx={{
       
        height: 95,
       
        marginTop:5,
      
        backgroundColor: 'white',
        opacity: 0.4,
        '&:hover': {
          backgroundColor: 'white',
          opacity: 0.8
        },
      }}
    >
   <br></br>
   <center>
   <TextField onChange={chanfehandler}  name= "amt" value={amt} id="outlined-basic" label="Loan Amount" variant="outlined" color="secondary"/>   
   <TextField  onChange={chanfehandler} name= "int" value={int} id="outlined-basic" label="Interest %" variant="outlined" color="secondary"/> 
   <TextField onChange={chanfehandler} name= "per" value={per} id="outlined-basic" label="Period in months" variant="outlined" color="secondary" /> 
   </center>
      </Box>

      <div class="container mt-5">
  <div class="row">
    <div class="col-sm-4">
    <Box
      sx={{
        width: 300,
        height: 180,
        margin: 0,
        marginTop:8,
        marginLeft:0,
        backgroundColor: 'white',
        opacity: 0.59,
        '&:hover': {
          backgroundColor: 'white',
         
        },
      }}
    >
     <p>The monthly EMI is {e} </p> 
     <br></br>
     <p>The Total Interest is {ti}</p>
     <br></br>
     <p>The Total Payment is {t}</p>
      </Box>



    </div>
    <div class="col-sm-3 p-3  text-white">

<Box
  sx={{
    width: 850,
    height: 480,
    margin: 0,
    marginTop:0,
    marginLeft:0,
    backgroundColor: 'white',
    opacity: 0.59,
    '&:hover': {
      backgroundColor: 'white',
      opacity: 1,
     
    },
  }}
>
  <Bar options={options} data={ch}/>
  <p>x axis =months</p>
  </Box>

</div>
</div>
</div>
  
  <div class="bgs">
  <table class="table ">
    <thead>
      <tr>
        <th>Month</th>
        <th>Principal</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      
      <tr class="color-dark">
        <td > {month.map((item, index) => <p key={index}>{item}</p>)}</td>
        <td> {pir.map((item, index) => <p key={index}>{item}</p>)}</td>
        <td>{bal.map((item, index) => <p key={index}>{item}</p>)}</td>
      </tr>
      
    </tbody>
  </table>
  </div>

</div>     
    </div>
  )
}

export default Dashbord