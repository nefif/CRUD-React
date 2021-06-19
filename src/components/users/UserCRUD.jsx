import React, {Component} from 'react'
import Main from '../template/Main'
import axios from 'axios'

const headerProps = {
    icon: 'users',
    title: 'Users',
    subtitle: 'Employee Registration - The following fields are required: Name, Email, Birth Date, CPF, Gender, Start Date.'
}

const  baseUrl = 'http://localhost:3001/users'
const initialState = {
    user:{name:'', birth:'', gender:'', email:'', cpf:'', start:'', team:''},
    list: []
}

export default class UserCrud extends Component {

    state = {...initialState}

    componentWillMount(){
        axios(baseUrl).then(resp => {
            this.setState({list: resp.data})
        })

    }

    clear(){
        this.setState({user: initialState.user})
    }

    delete(){

    }

    edit(){
        
    }

    save(){
            if(this.state.user.name && this.state.user.birth  && this.state.user.gender  && this.state.user.email  && this.state.user.cpf && this.state.user.start !== null){
                const user = this.state.user
                const method = user.id ? 'put' : 'post'
                const url = user.id ? `${baseUrl}/${user.id}`:baseUrl
                axios[method](url, user)
                    .then(resp => {
                        const list = this.getUpdateList(resp.data)
                        this.setState({user:initialState.user, list})
                   })
                   alert('Record saved successfully!')
            }else{
                alert('Please fill in all required fields.')
            }
     }

    getUpdateList(user, add=true) {
        const list = this.state.list.filter(u => u.id !==  user.id)
        if(add) list.unshift(user)
        return list
    }

    updateField(event){
        const user = {...this.state.user}
        user[event.target.name] = event.target.value
        this.setState({user})
    }

    renderForm(){
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Name</label>
                            <input type='text' className='form-control'
                                name='name'
                                value={this.state.user.name}
                                onChange={e=>this.updateField(e)}
                                placeholder="Name..."/>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type='email' className='form-control'
                            name='email'
                            value={this.state.user.email}
                            onChange={e=>this.updateField(e)}
                            placeholder='E-mail...'/>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Gender</label>
                            <select type  ='dropdown' className='form-control'
                                name ='gender'
                                value={this.state.user.gender}
                                onChange={e=>this.updateField(e)}>
                                <option value='null'></option>
                                <option value='male'>Male</option>
                                <option value = 'female'>Female</option>
                                <option value = 'other'>Other</option>
                            </select>
                        </div>                        
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Birth Date</label>
                            <input type='date' className='form-control'
                            name='birth'
                            value={this.state.user.birth}
                            onChange={e=>this.updateField(e)}
                            />
                        </div>                        
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>CPF</label>
                            <input type='text' className='form-control'
                            name='cpf'
                            value={this.state.user.cpf}
                            onChange={e=>this.updateField(e)}
                            placeholder='CPF...'/>
                        </div>                        
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Start Date</label>
                            <input type='month' className='form-control'
                            name='start'
                            value={this.state.user.start}
                            onChange={e=>this.updateField(e)}
                            />
                        </div>                        
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Team</label>
                            <select type ='dropdown' className='form-control'
                                name ='team'
                                value={this.state.user.team}
                                onChange={e=>this.updateField(e)}>
                                <option value =''></option>
                                <option value = 'mobile'>Mobile</option>
                                <option value = 'frontend'>Frontend</option>
                                <option value = 'backend'>Backend</option>
                            </select>
                        </div>                        
                    </div>

                </div>

                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e=>this.save(e)}>
                            Save    
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e=>this.clear(e)}>
                            Clear
                        </button>

                        <button className="btn btn-warning ml-2"
                            onClick={e=>this.edit(e)}>
                            Edit
                        </button>

                        <button className="btn btn-danger ml-2"
                            onClick={e=>this.delete(e)}>
                            Delete 
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user){
        this.setState({user})
        alert('Edit the Record.')
    }

    remove(user){
        axios.delete(`${baseUrl}/${user.id}`).then(resp=> {
            const list = this.getUpdateList(user, false)
            this.setState({list})
        })
        alert('Record deleted successfully!')
    }

    renderTable(){
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Start Date</th>
                        <th>Team</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }


    renderRows(){
        return this.state.list.map(user =>{
            return (
                <tr key = {user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.start}</td>
                    <td>{user.team}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className='fa fa-pencil'></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className='fa fa-trash'></i>
                        </button>
                    </td>
                </tr>

            )
        })
    }

    render(){
        console.log(this.state.list)
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}