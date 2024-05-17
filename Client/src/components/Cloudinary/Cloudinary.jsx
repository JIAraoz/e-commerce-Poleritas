import axios from "axios";
import { useState } from "react";

export default function Cloudinary({ onImageUpload }) {
    const [Url, setUrl] = useState("");

    const changeUploadImage = async (e) => {
        const file = e.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "Preset");

        const response = await axios.post("https://api.cloudinary.com/v1_1/drq4immoc/image/upload", data);
        const imageUrl = response.data.secure_url;

        setUrl(imageUrl);
        onImageUpload(imageUrl);
    };

    const deleteImage = () => {
        setUrl("");
        onImageUpload("");
    };

    return (
        <div>
            <p>Seleccionar imagen</p>
            <input type='file' accept='image/*' onChange={changeUploadImage} />
            {Url && (
                <div>
                    <img src={Url} alt="Uploaded" />
                    <button onClick={deleteImage}>Eliminar imagen</button>
                </div>
            )}
        </div>
    );
}
