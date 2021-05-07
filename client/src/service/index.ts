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
}