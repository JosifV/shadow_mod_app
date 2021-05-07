import axios from 'axios'

export class API {
    public async uploadFile(file:any){
        try {
            console.log(file);
            const formData = new FormData();
            formData.append('file', file)

            let resp = await axios({
                method:'POST',
                url:`${process.env.REACT_APP_BASE_URL}/upload`,
                data:formData
            })
            return resp
        } catch (error) {
            throw error
        }
    }
}