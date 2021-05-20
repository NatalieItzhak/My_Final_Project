import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import AlogoliaPlaces from 'algolia-places-react';
import { DatePicker, Select } from 'antd';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { createHotel } from '../components/actions/hotel';



const appId = 'YI44LXWG73';
const apiKe = '8d47089d0114c1a1f6389ff92f2a9f47';
const language = ['en'];


const option = Select;


const NewHotel = () => {
    const { auth } = useSelector((state) => ({ ...state }));
    const { token } = auth;
    const [info, setInfo] = useState({
        title: '',
        content: '',
        image: '',
        price: '',
        from: '',
        to: '',
        guests: '',
        seller: ''
        
    })
    const [location, setLocation] = useState("");
    const [preview, setPreview] = useState('http://via.placeholder.com/200X200.png?text=preview')
    const { title, content, image, price, from, to, guests , seller} = info;


    const handleSubmit = async (e) => {
        e.preventDefault();

        const hotelData = new FormData()
        hotelData.append('title', title)
        hotelData.append('content', content)
        image && hotelData.append('image', image)
        hotelData.append('location', location.location)
        hotelData.append('price', price)
        hotelData.append('from', from)
        hotelData.append('to', to)
        hotelData.append('guests', guests)

        console.log([...hotelData]);

      try{
        const res= await createHotel(token, hotelData)
        console.log('Hotel created!', res);
        toast.success('New hotel is posted');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
      } catch(err){
          console.log(err)
          toast.error(err.response.data)
      }
    };



    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    };
    const handleImageChange = (e) => {
        setPreview(URL.createObjectURL(e.target.files[0]))
        setInfo({ ...info, image: e.target.files[0] })
    }

    return (
        <>
        <div className="landpage-cont">
            <div className="container-fluid h1 p-5 text-center">
                <h2>Add Hotel</h2>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <br />
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="btn btn-outline-secondary btn-block m-2 text-left">Image
                                <input type="file"
                                        name="image"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        hidden
                                    />
                                </label>
                                <textarea type="text"
                                    placeholder="Title"
                                    className="form-control m-2"
                                    name="title"
                                    onChange={handleChange}
                                    value={title}

                                />
                                <AlogoliaPlaces className="form-control m-2" placeholder="Location" defaultValue={location }
                                    options={[appId, apiKe, language]} onChange={({ suggestion }) => setLocation({ ...setLocation, location: suggestion.value })} />

                                <input type="number"
                                    placeholder="Price"
                                    className="form-control m-2"
                                    name="price"
                                    onChange={handleChange}
                                    value={price}
                                />
                                <input type="string"
                                    placeholder="seller"
                                    className="form-control m-2"
                                    name="seller"
                                    onChange={handleChange}
                                    value={seller}
                                />

                                <Select name="guests" onChange={(value) => setInfo({ ...info, guests: value })} className="w-100 m-2" placeholder="Number of guests" size="large">
                                    <option key={1}>{1}</option>
                                    <option key={2}>{2}</option>
                                    <option key={3}>{3}</option>
                                    <option key={4}>{4}</option>
                                    <option key={5}>{5}</option>
                                </Select>
                                <textarea type="text"
                                    placeholder="Content"
                                    className="form-control m-2"
                                    name="content"
                                    onChange={handleChange}
                                    value={content}

                                />
                                <DatePicker placeholder="From date" className="form-control m-2" onChange={(date, dateString) => setInfo({ ...info, from: dateString })} disabledDate={(current) => current && current.valueOf() < moment().subtract(1, 'days')} />
                                <DatePicker placeholder="To date" className="form-control m-2" onChange={(date, dateString) => setInfo({ ...info, to: dateString })} disabledDate={(current) => current && current.valueOf() < moment().subtract(1, 'days')} />
                                <button className="btn btn-outline-primary m-2">
                                    Save
                                     </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-2">
                        <img src={preview} alt="preview" className="img img-fluid m-2"></img>
                        
                    </div>
                </div>
            </div>
            </div>


        </>
    )
}

export default NewHotel;
