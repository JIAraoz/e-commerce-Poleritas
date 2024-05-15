import axios from "axios"
import { useState } from "react"

export default function Cloudinary() {
    const [Url, setUrl] = useState("")

    const changeUploadImage = async (e) => {
        const file = e.target.files[0]

        const data = new FormData()

        data.append("file", file)
        data.append("upload_preset", "Preset")

        const response = await axios.post("https://api.cloudinary.com/v1_1/drq4immoc/image/upload", data)

        setUrl(response.data.secure_url)
        // console.log(response)
    }

    const deleteImage = () => {
        setUrl("")
    }

    return (
        <div>
            <p>Seleccionar imagen</p>
            <input type='file' accept='image/*' onChange={changeUploadImage}/>
            {Url && (
                <div>
                    <img src={Url}/>
                    <button onClick={() => deleteImage()}>Eliminar imagen</button>
                </div>
            )}
        </div>
    )
}