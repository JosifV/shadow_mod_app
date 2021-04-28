import { useRef } from "react"
import { API } from '../service'
export const FileForm: React.FC = () => {
    let fileRef = useRef<HTMLInputElement>(null)
    let processFile = async () => {
        // console.dir(fileRef.current!.files![0]);
        let apiInstance = new API()
        let {data} = await apiInstance.uploadFile(fileRef.current!.files![0])
        console.log(data);
        
    }
    return <div className="fileForm">
        <input type="file" ref={fileRef} name="" id="" />
        <button onClick={processFile}>Process</button>
    </div>
}