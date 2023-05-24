import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "react-toastify/dist/ReactToastify.min.css";
// import { toast } from 'react-toastify'
import { ToastContainer, toast } from 'react-toastify';



export default function Home() {

    const[Todo,setTodo] = useState()
    const[InProgress,setInProgress] = useState()
    const[Done,setDone] = useState()
    const[Data,setData] = useState()

    const [title, settitle] = useState('');
const [discription, setdiscription] = useState('');
const [date, setdate] = useState('');
const [priorityy, setpriorityy] = useState('');
const [CurrentId, setCurrentId] = useState('');

    const changetitlee = (event) => {
        settitle(event.target.value);
    };
    const changediscription = (event) => {
        setdiscription(event.target.value);
    };
    const changedate = (event) => {
        setdate(event.target.value);
    };

    const changepriorityy = (event) => {
        setpriorityy(event.target.value);
    };
             
    
      const [isOpen, setIsOpen] = useState(false);
      const [isOpenshow, setIsOpenshow] = useState(false);
    
    
      const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/create", {    
            
                title:title,
                description: discription,
                date:date,
                priority:"low",
                state:"todo"
            
              })
              .then((response) => {
                
                fetchData()
                toast.success(`${title} is added!`);

              });
            
        // Perform your save logic here
        // e.g., call an API to save the data
        // Close the pop-up
        setIsOpen(false);
      };

    const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/read/all`); 
          const data = response.data;
          setData(data);
          setTodo(data.filter(data => data.state=='todo'));
          setInProgress(data.filter(data => data.state=='inprogress'));
          setDone(data.filter(data => data.state=='done'));
        } catch (error) {
          console.error(error);
        }
      };

      const handleDelete = async (id) => {
        try {
          const response = await axios.delete(`http://localhost:8080/delete/${id}`); 
          fetchData()
          toast.success(`${title} deleted!`);
        } catch (error) {
          console.error(error);
        }
      };

      
    useEffect(()=>{
        fetchData()
    },[])
    console.log(Data)

    // const changestate = (event) => {
    //     axios.post("http://localhost:8080/update", {    
    //     id:event.target.name,
    //     state:event.target.value   
    //       })
    //       .then((response) => {
    //         console.log(response);
    //       });

    //   };
  return (
    <>
    

<div>
      
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={changetitlee}
              />
              <textarea
                name="description"
                placeholder="Description"
                onChange={changediscription}
              />
              <input
                type="date"
                name="date"
                onChange={changedate}
              />
              <select
                name="priority"
                onChange={changepriorityy}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <button class="bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" type="submit">Save</button>
             
            </form>
            <button class="bg-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>


    {isOpenshow && (
        <div className="popup">
          <div className="popup-content">
            <h2>title:</h2>
            <p>{title}</p>
            <h2>discription:</h2>
            <p>{discription}</p>
            <h2>date:</h2>
            <p>{date}</p>
            <h2>priority:</h2>
            <p>{priorityy}</p>
            <button class="bg-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => setIsOpenshow(false)}>Close</button>
          </div>
        </div>
      )}
    

    <div className="bg-blue w-full p-8 flex m-25 flex-wrap font-sans">
    <div className="rounded bg-slate-300 m-10 w-64 p-2">
      <div className="flex justify-between py-1">
        <h3 className="text-sm">To Do</h3>
        <svg
          className="h-4 fill-current text-grey-dark cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
        </svg>
      </div>
      <div className="text-sm mt-2">
      {Todo?.map((element) => (
       
          <div  className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter flex justify-between">
          <button onClick={() =>{setIsOpenshow(true)
            setCurrentId(element.id)
            settitle(element.title)
            setdiscription(element.description)
            setpriorityy(element.priority)
            setdate(element.date) } }> 
         <p>{element.title}</p> 
         </button>  
         <div className='flex'>
         <svg onClick={()=>handleDelete(element.id)} fill="none" stroke="currentColor" stroke-width="1.5" width={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
</svg>
         <svg  fill="none" stroke="currentColor" stroke-width="1" width={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
        </svg>
         </div>
  
                </div>      
      ))}
<button onClick={() => setIsOpen(true)}>
        <p className="mt-3 text-grey-dark">Add a card...</p></button>
      </div>
    </div>

    <div className="rounded bg-slate-300 m-10 w-64 p-2">
      <div className="flex justify-between py-1">
        <h3 className="text-sm">In Progress</h3>
        <svg
          className="h-4 fill-current text-grey-dark cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
        </svg>
      </div>
      <div className="text-sm mt-2">
      {InProgress?.map((element) => (
                <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter flex justify-between">
                <button onClick={() =>{setIsOpenshow(true)
            setCurrentId(element.id)
            settitle(element.title)
            setdiscription(element.description)
            setpriorityy(element.priority)
            setdate(element.date) } }> 
         <p>{element.title}</p> 
         </button>
         <div className='flex'>
         <svg onClick={()=>handleDelete(element.id)} fill="none" stroke="currentColor" stroke-width="1.5" width={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
</svg>
         <svg  fill="none" stroke="currentColor" stroke-width="1" width={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
        </svg>
         </div>
                </div>
      ))}

        
      </div>
    </div>

    <div className="rounded bg-slate-300 m-10 w-64 p-2">
      <div className="flex justify-between py-1">
        <h3 className="text-sm">Done</h3>
        <svg
          className="h-4 fill-current text-grey-dark cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
        </svg>
      </div>
      <div className="text-sm mt-2">
      {Done?.map((element) => (
                <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter flex justify-between">
                <button onClick={() =>{setIsOpenshow(true)
            setCurrentId(element.id)
            settitle(element.title)
            setdiscription(element.description)
            setpriorityy(element.priority)
            setdate(element.date) } }> 
         <p>{element.title}</p> 
         </button>
         <div className='flex'>
         <svg onClick={()=>handleDelete(element.id)} fill="none" stroke="currentColor" stroke-width="1.5" width={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
</svg>
         <svg  fill="none" stroke="currentColor" stroke-width="1" width={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
        </svg>
         </div>

                </div>
      ))}
<div className='flex'>
</div>
        
      </div>
    </div>




  </div>
  < ToastContainer/>
</>
  )
}



