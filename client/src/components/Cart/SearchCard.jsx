import React,{useState,useEffect} from 'react'
import useEcomStore from '../../store/ecom-store'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


const SearchCard = () => {

    const product = useEcomStore((state)=>state.products)
    const getProduct = useEcomStore((state)=>state.getProduct)
    const actionSearchFillters = useEcomStore((state)=>state.actionSearchFillters)
    const getCategory = useEcomStore((state)=>state.getCategory)
    const categories = useEcomStore((state)=>state.categories)
    const [text, setText] = useState('')
    const[categorySelected, setCategorySelected] = useState([])
    const[price, setPrice] = useState([1000,30000])
    const[ok, setOk] = useState(false)



    useEffect(()=>{
        getCategory()
    },[])

    
    //console.log(text)

    useEffect(()=>{
        //code
        const delay = setTimeout(()=>{
            if(text){
                actionSearchFillters({ query: text})
            }else{
                getProduct()
            }
        },300)

        return ()=> clearTimeout(delay)
    },[text])

    const handleCheck = (e)=>{
        //console.log(e.target.value)
        const inCheck = e.target.value 
        const inState = [...categorySelected]
        const findCheck = inState.indexOf(inCheck)

        if(findCheck == -1) {
            inState.push(inCheck)
        }else{
            inState.splice(findCheck,1)
        }
        setCategorySelected(inState)

        
        if(inState.length>0) {
            actionSearchFillters({category: inState})
        }else{
            getProduct()
        }
    }
    
    useEffect(()=>{
        actionSearchFillters({price})
    },[ok])
    const handlePrice = (value)=>{
        console.log(value)
        setPrice(value)

        setTimeout(()=>{
             setOk(!ok)  
        },300)
    }

  return (
    <div>
        <h1 className='text-xl font-bold mb-4'>SearchProduct</h1>

        <input className='border rounded-md w-full mb-4 px-2' placeholder='SearchProduct' onChange={(e)=>setText(e.target.value)}/>
        <hr/>

        <div>
            <h1>ListCategory</h1>
            <div>
                {
                    categories.map((item, index)=>
                        <div className='flex gap-2'>
                            <input
                                onChange={handleCheck}
                                type='checkbox'
                                value={item.id}
                             />
                            <label>{item.name}</label>
                        </div>
                    )
                }
            </div>
        </div>
        <hr/>

        <div>
            <h1>SearchByPrice</h1>
            <div>
                <div className='flex justify-between'>
                    <span>Min : {price[0]}</span>
                    <span>Max :{price[1]}</span>
                </div>
                <Slider 
                    onChange={handlePrice}
                    range
                    min={0}
                    max={100000}
                    defaultValue={[1000, 30000]}
                />
            </div>
        </div>
    </div>
  )
}

export default SearchCard