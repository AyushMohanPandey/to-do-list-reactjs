import React, { useState, useEffect } from 'react'
import "./style.css"

//get local storage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if(lists){
    return JSON.parse(lists)
  }
  else{
    return [];
  }
}
const Todo = () => {
  const [inputData, setInputData] = useState("")
  const [items, setItems] = useState((getLocalData()))
  const [isEditItem, setIsEditItem] = useState("")
  const[toggleButton, setToggleButton] = useState(false)

  // add the items function
  const addItem = () => {
    if(!inputData)
      alert("plz fill the data")
    else if(inputData && toggleButton){
        setItems(
          items.map((curElem) => {
            if(curElem.id === isEditItem)
              return{...curElem, name: inputData }

            return curElem
          })
        )
        setInputData("")
        setIsEditItem(null)
        setToggleButton(false)
    } 

    else{
        const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      }
      setItems([...items, myNewInputData])
      setInputData("")
    }
      
  }

  // delete the items function
  const deleteItem = (ind) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== ind
    })
      setItems(updatedItems)
  }

  // remove all function
  const removeAll = () => {
    setItems([]);
  }
  
  //adding local storage

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  //edit items function
  const editItem = (index) => {
    const item_edited  = items.find((curElem) => {
      return curElem.id === index;
    })
    setInputData(item_edited.name)
    setIsEditItem(index)
    setToggleButton(true)
  }

  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
          <figure>
            <img src="./images/todo.svg" alt="todo logo" />
            <figcaption>Add your list here ✌ </figcaption>
          </figure>
          <div className='addItems'>
            
            <input type="text" 
            placeholder='✍ Add Item' 
            className='form-control' 
            value={inputData} onChange={(event) => setInputData(event.target.value) }/>

          {toggleButton ?(
                <i className='far fa-edit add-btn' onClick={addItem}></i> ) : (<i className='fa fa-plus add-btn' onClick={addItem}></i>)
          }
            
          </div>
          {/* show all items */}

          <div className='showItems'>
            {items.map((curElem) => {
              return(
                <div className='eachItem' key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className='todo-btn'>
                    <i className='far fa-edit add-btn'  onClick={() => editItem(curElem.id)}></i>
                    <i className='far fa-trash-alt add-btn' onClick={() => deleteItem(curElem.id)}></i>
                  </div>
                </div>
              )
            })}
          </div>

          {/* remove all */}
          <div className='showItems'>
            <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}> 
              <span>
                Checklist 
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo