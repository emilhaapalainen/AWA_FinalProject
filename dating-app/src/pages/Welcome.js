import { useState } from 'react';
import Nav from '../components/Nav';
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Welcome = () => {

    const [ cookies, setCookie, removeCookie ] = useCookies(['user']);
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: "",
        dob_day: "",
        dob_month: "",
        dob_year: "",
        gender_identity: "man",
        gender_interest: "woman",
        url: "",
        about: "",
        matches: []
    });

    let navigate = useNavigate();

    const handleChange = (e) => {
        console.log(e);
        const value = e.target.value;
        const name = e.target.name;
        console.log("value:", value, name);

        setFormData((prevState) => ({
            ...prevState,
            [name] : value
        }));
    }

    console.log(formData)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/user`, { formData });
            const success = response.status === 200;

            if (success) {
                navigate("/dashboard");
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
        <Nav
            minimal={true}
            setShowModal={() => {}}
            showModal={false}
        />
        <div className='welcome'>
            <h2>Welcome to dateSync</h2>

            <form onSubmit={handleSubmit}>
                <section>
                    <label htmlFor='first_name'>First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name='first_name'
                        placeholder='First Name'
                        required={true}
                        value={formData.first_name}
                        onChange={handleChange}
                    />

                    <label>Date of Birth</label>
                    <div className='multi-input-container'>
                    <input
                        type="number"
                        id="dob_day"
                        name='dob_day'
                        placeholder='DD'
                        required={true}
                        value={formData.dob_day}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        id="dob_month"
                        name='dob_month'
                        placeholder='MM'
                        required={true}
                        value={formData.dob_month}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        id="dob_year"
                        name='dob_year'
                        placeholder='YYYY'
                        required={true}
                        value={formData.dob_year}
                        onChange={handleChange}
                    />
                    </div>

                    <label>Gender</label>
                    <div className='multi-input-container'>
                    <input
                        type="radio"
                        id="man-gender-identity"
                        name='gender_identity'
                        value="man"
                        checked={formData.gender_identity === "man"}
                        onChange={handleChange}
                    />
                    <label htmlFor='man-gender-identity'>Man</label>
                    <input
                        type="radio"
                        id="woman-gender-identity"
                        name='gender_identity'
                        value="woman"
                        checked={formData.gender_identity === "woman"}
                        onChange={handleChange}
                    />
                    <label htmlFor='woman-gender-identity'>Woman</label>
                    </div>

                    <label>Match me with</label>
                    <div className='multi-input-container'>
                    <input
                        type="radio"
                        id="man-gender-interest"
                        name='gender_interest'
                        value="man"
                        checked={formData.gender_interest === "man"}
                        onChange={handleChange}
                    />
                    <label htmlFor='man-gender-interest'>Man</label>
                    <input
                        type="radio"
                        id="woman-gender-interest"
                        name='gender_interest'
                        value="woman"
                        checked={formData.gender_interest === "woman"}
                        onChange={handleChange}
                    />
                    <label htmlFor='woman-gender-interest'>Woman</label>
                    </div>

                    <label htmlFor='about'>About me</label>
                    <input
                        id="about"
                        type='text'
                        name='about'
                        required={true}
                        placeholder='I like...'
                        value={formData.about}
                        onChange={handleChange}
                    />

                <input type="submit"/>
                </section>
                <section>
                <label htmlFor='url'>Picture</label>
                <input
                    type='url'
                    id='url'
                    name='url'
                    required={true}
                    onChange={handleChange}
                />
                <div className="photo-container">
                  {formData.url && <img src={formData.url} alt="preview"/>}
                </div>
                </section>

            </form>

        </div>
        </>
    );
}

export default Welcome;