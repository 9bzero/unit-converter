import{useState}from'react'
  interface Category{name:string;icon:string;units:{name:string;factor:number;offset?:number}[]}
  const CATEGORIES:Category[]=[
    {name:'Length',icon:'📏',units:[{name:'Meter',factor:1},{name:'Kilometer',factor:1000},{name:'Centimeter',factor:0.01},{name:'Millimeter',factor:0.001},{name:'Mile',factor:1609.34},{name:'Yard',factor:0.9144},{name:'Foot',factor:0.3048},{name:'Inch',factor:0.0254},{name:'Nautical Mile',factor:1852}]},
    {name:'Weight',icon:'⚖️',units:[{name:'Kilogram',factor:1},{name:'Gram',factor:0.001},{name:'Milligram',factor:0.000001},{name:'Pound',factor:0.453592},{name:'Ounce',factor:0.0283495},{name:'Ton',factor:1000},{name:'Stone',factor:6.35029}]},
    {name:'Temperature',icon:'🌡️',units:[{name:'Celsius',factor:1},{name:'Fahrenheit',factor:1},{name:'Kelvin',factor:1}]},
    {name:'Speed',icon:'🚀',units:[{name:'m/s',factor:1},{name:'km/h',factor:0.277778},{name:'mph',factor:0.44704},{name:'knot',factor:0.514444},{name:'ft/s',factor:0.3048}]},
    {name:'Area',icon:'⬛',units:[{name:'m²',factor:1},{name:'km²',factor:1e6},{name:'cm²',factor:0.0001},{name:'Hectare',factor:10000},{name:'Acre',factor:4046.86},{name:'ft²',factor:0.092903},{name:'in²',factor:0.000645}]},
    {name:'Volume',icon:'🧊',units:[{name:'Liter',factor:1},{name:'Milliliter',factor:0.001},{name:'Gallon (US)',factor:3.78541},{name:'Gallon (UK)',factor:4.54609},{name:'Cup',factor:0.236588},{name:'fl oz',factor:0.0295735},{name:'m³',factor:1000}]},
  ]
  function convert(val:number,from:string,to:string,cat:Category):number{
    if(cat.name==='Temperature'){
      let c=val
      if(from==='Fahrenheit')c=(val-32)*5/9
      else if(from==='Kelvin')c=val-273.15
      if(to==='Fahrenheit')return c*9/5+32
      if(to==='Kelvin')return c+273.15
      return c
    }
    const f=cat.units.find(u=>u.name===from)?.factor||1
    const t=cat.units.find(u=>u.name===to)?.factor||1
    return(val*f)/t
  }
  export default function App(){
    const[catIdx,setCatIdx]=useState(0)
    const[val,setVal]=useState('1')
    const[from,setFrom]=useState(CATEGORIES[0].units[0].name)
    const[to,setTo]=useState(CATEGORIES[0].units[1].name)
    const cat=CATEGORIES[catIdx]
    const result=isNaN(+val)?'—':convert(+val,from,to,cat).toPrecision(6).replace(/.?0+$/,'')
    const switchCat=(i:number)=>{setCatIdx(i);setFrom(CATEGORIES[i].units[0].name);setTo(CATEGORIES[i].units[1].name)}
    const sel=(v:string,set:(s:string)=>void)=>(
      <select value={v} onChange={e=>set(e.target.value)} style={{flex:1,background:'#111827',border:'1px solid #334155',borderRadius:8,padding:'0.7rem',color:'#e2e8f0',fontSize:'0.9rem',outline:'none'}}>
        {cat.units.map(u=><option key={u.name}>{u.name}</option>)}
      </select>
    )
    return(
      <div style={{minHeight:'100vh',background:'#0f172a',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontFamily:'Inter,system-ui,sans-serif',color:'#e2e8f0',padding:'2rem'}}>
        <div style={{width:'100%',maxWidth:520}}>
          <h1 style={{fontWeight:800,fontSize:'1.75rem',marginBottom:'1.5rem',color:'#f8fafc',textAlign:'center'}}>🔄 Unit Converter</h1>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0.5rem',marginBottom:'1.5rem'}}>
            {CATEGORIES.map((c,i)=><button key={c.name} onClick={()=>switchCat(i)} style={{padding:'0.6rem',background:catIdx===i?'#1e40af':'#1e293b',color:catIdx===i?'#93c5fd':'#94a3b8',border:'none',borderRadius:8,cursor:'pointer',fontSize:'0.8rem',fontWeight:500}}>
              {c.icon} {c.name}
            </button>)}
          </div>
          <div style={{background:'#111827',border:'1px solid #1e293b',borderRadius:16,padding:'1.5rem'}}>
            <input type="number" value={val} onChange={e=>setVal(e.target.value)} style={{width:'100%',background:'#0f172a',border:'1px solid #334155',borderRadius:8,padding:'0.75rem 1rem',color:'#38bdf8',fontSize:'1.25rem',fontFamily:'JetBrains Mono,monospace',outline:'none',marginBottom:'1rem',fontWeight:700,textAlign:'center'}}/>
            <div style={{display:'flex',gap:'0.75rem',alignItems:'center',marginBottom:'1.25rem'}}>
              {sel(from,setFrom)}
              <button onClick={()=>{const tmp=from;setFrom(to);setTo(tmp)}} style={{padding:'0.6rem',background:'#1e293b',border:'1px solid #334155',borderRadius:8,cursor:'pointer',color:'#38bdf8',fontSize:'1.1rem',flexShrink:0}}>⇄</button>
              {sel(to,setTo)}
            </div>
            <div style={{background:'#0f172a',border:'1px solid #334155',borderRadius:10,padding:'1.25rem',textAlign:'center'}}>
              <div style={{fontSize:'2.25rem',fontWeight:800,color:'#38bdf8',fontFamily:'JetBrains Mono,monospace',marginBottom:'0.5rem'}}>{result}</div>
              <div style={{color:'#475569',fontSize:'0.85rem'}}>{val} {from} = {result} {to}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }