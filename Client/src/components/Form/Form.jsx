import { useState } from 'react';
import axios from 'axios';
import Cloudinary from '../Cloudinary/Cloudinary';
import "./Form.css"
import Nav from '../Nav/Nav';
export default function Form() {
    const [articleData, setArticleData] = useState({
      articleName: '',
      articleImage: '',
      articlePrice: '',
      articleStock: '',
      articleDescription: '',
      Category: ''
    });
    
    const [errors, setErrors] = useState({
      articleName: '',
        articleImage: '',
        articlePrice: '',
        articleStock: '',
        articleDescription: '',
        Category: ''
    });

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setArticleData({ ...articleData, [property]: value });
    };

    const handleImageUpload = (imageUrl) => {
        setArticleData({ ...articleData, articleImage: imageUrl });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
          console.log(articleData)
            const response = await axios.post('https://e-commerce-grupo03.onrender.com/createArticle', articleData);

            if (("" + response.status)[0] === "2") {
                alert("Se ha subido tu artículo a la base de datos.");
            } else {
                alert("Algo ha salido mal.");
            }
        } catch (error) {
            alert("Ha ocurrido un error: " + error.message);
        }
    };

    return (
      <div>
          <Nav/>
            <form className='articleForm' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor='articleName'>Nombre del artículo:</label>
                    <input type='text' name='articleName' value={articleData.articleName} onChange={handleChange} />
                    {/* {errors.articleName && <span className="error-message">{errors.articleName}</span>} */}
                </div>

                <div className="form-group">
                    <label htmlFor='articleImage'>Imagen:</label>
                    <Cloudinary onImageUpload={handleImageUpload} />
                    {/* {errors.articleImage && <span className="error-message">{errors.articleImage}</span>} */}
                </div>

                <div className="form-group">
                    <label htmlFor='articlePrice'>Precio:</label>
                    <input type='text' name='articlePrice' value={articleData.articlePrice} onChange={handleChange} />
                    {/* {errors.articlePrice && <span className="error-message">{errors.articlePrice}</span>} */}
                </div>

                <div className="form-group">
                    <label htmlFor='articleStock'>Stock:</label>
                    <input type='text' name='articleStock' value={articleData.articleStock} onChange={handleChange} />
                    {/* {errors.articleStock && <span className="error-message">{errors.articleStock}</span>} */}
                </div>

                <div className="form-group">
                    <label htmlFor='articleDescription'>Descripción:</label>
                    <textarea name='articleDescription' value={articleData.articleDescription} onChange={handleChange}></textarea>
                    {/* {errors.articleDescription && <span className="error-message">{errors.articleDescription}</span>} */}
                </div>

                <div className="form-group">
                    <label htmlFor='Category'>Categoría:</label>
                    <input type='text' name='Category' value={articleData.Category} onChange={handleChange} />
                    {/* {errors.Category && <span className="error-message">{errors.Category}</span>} */}
                </div>

                <button type='submit'>Enviar</button>
            </form>
        </div>
    );
}
