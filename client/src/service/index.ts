import axios from 'axios'

export class API {
    public async fetchData(){
        try {
            let resp = await axios({
                method:'GET',
                url:`${process.env.REACT_APP_BASE_URL}/fetch`,
            })
            return resp
        } catch (error) {
            throw error
        }
    }
    
    public async updateHover(payload: any){
        try {
            let resp = await axios({
                method:'POST',
                url:`${process.env.REACT_APP_BASE_URL}/hover/${payload.id}/${payload.val}/${payload.title}`,
            })
            return resp
        } catch (error) {
            throw error
        }
    }
    public async updateClick(payload: any){
        try {
            let resp = await axios({
                method:'POST',
                url:`${process.env.REACT_APP_BASE_URL}/click/${payload.id}/${payload.title}`,
            })
            return resp
        } catch (error) {
            throw error
        }
    }
}