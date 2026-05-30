
"use client";
import {useState,useRef} from "react";
import Webcam from "react-webcam";
import html2canvas from "html2canvas";

export default function Home(){
const webcamRef=useRef(null);
const cardRef=useRef(null);
const [name,setName]=useState("");
const [num,setNum]=useState("");
const [img,setImg]=useState(null);
const [scan,setScan]=useState(false);
const [done,setDone]=useState(false);

const capture=()=>setImg(webcamRef.current.getScreenshot());
const upload=e=>{const f=e.target.files[0];if(f)setImg(URL.createObjectURL(f));};

const generate=()=>{
 setScan(true);
 setTimeout(()=>{setScan(false);setDone(true)},3000);
};

const download=async()=>{
 const canvas=await html2canvas(cardRef.current,{scale:2});
 const a=document.createElement("a");
 a.href=canvas.toDataURL("image/png");
 a.download="APL_Player_Card.png";
 a.click();
};

return <main style={{padding:20,textAlign:"center"}}>
<h1>🏏 AGENTIC PREMIER LEAGUE</h1>
<p>By GDG Noida • 31 May</p>

{!done && !scan && <>
<input placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/><br/><br/>
<input placeholder="Jersey Number" value={num} onChange={e=>setNum(e.target.value)}/><br/><br/>

{!img && <Webcam ref={webcamRef} screenshotFormat="image/png" width={320}/>}
<br/>
{!img && <button onClick={capture}>📸 Take Selfie</button>}
<br/><br/>
<input type="file" accept="image/*" onChange={upload}/>

{img && <>
<br/><img src={img} width="220"/>
<br/><br/>
<button onClick={generate}>Generate Player Card</button>
</>}
</>}

{scan && <div className="scan">
<h2>SCANNING PLAYER...</h2>
<p>✓ Face Detected</p>
<p>✓ Jersey Assigned</p>
<p>✓ Team Verified</p>
</div>}

{done && <>
<div ref={cardRef} className="card">
<div style={{background:"#22c55e",color:"#000",padding:10,fontWeight:"bold"}}>
OFFICIAL GDG NOIDA PLAYER
</div>
<img src={img} style={{width:"100%",height:"500px",objectFit:"cover"}}/>
<div style={{padding:15}}>
<h2>{name}</h2>
<p>PLAYER #{num}</p>
<img
  src="https://via.placeholder.com/170x170?text=GDG+Jersey"
  width="170"
  alt="Jersey"
/>
<p><b>AGENTIC PREMIER LEAGUE</b></p>
<p>31 MAY</p>
<p>@gdg_noida</p>
</div>
</div>
<br/>
<button onClick={download}>⬇ Download Story Card</button>
</>}
</main>
}
