import React , {useState,useEffect} from 'react'

function CreateProject() {

    const [projectForm, setProjectForm] = useState([])

    const handleSubmet = ()=>{

    }
  return (
    <div>
        <form onSubmit={handleSubmet}>
            <div>
            <label>
                Name: 

            </label>
            <br />
            <input
                className='formControl'
                type='text'
                name='name'
                id='name'
                value={projectForm.name}
                onChange={handleSubmet}>
            </input>
            </div>

            <div>
            <label>
                Decription: 

            </label>
            <br />
            <input
                className='formControl'
                type='text'
                name='description'
                id='description'
                value={projectForm.description}
                onChange={handleSubmet}>
            </input>
            </div>

            <div>
            <label>
                Type: 

            </label>
            <br />
            <input
                className='formControl'
                type='text'
                name='type'
                id='type'
                value={projectForm.type}
                onChange={handleSubmet}>
            </input>
            </div>

            <button>Submit</button>

        </form>
      
    </div>
  )
}

export default CreateProject
