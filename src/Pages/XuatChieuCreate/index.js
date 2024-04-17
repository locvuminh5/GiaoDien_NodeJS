import {
    Button,
    DatePicker,
    Form,
    Input,
    Radio,
    Select,
    Typography,
    Modal
} from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';


const XuatChieuCreate = () => {
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const navigate = useNavigate();
    const location = useLocation();

    const [datas, setDatas] = useState();
    const [categories, setCategories] = useState(
        [
            // {
            //     id: "1",
            //     name: "Hành Động"
            // },
            // {
            //     id: "2",
            //     name: "Kinh Dị"
            // }
        ]
    );

    useEffect(() => {
        // setLoading(true);
        // getCategories();
        setCategories(location.state?.movies)
        console.log(categories)
    }, []);

    // const getCategories = async () => {
    //     let data = '';

    //     let config = {
    //         method: 'get',
    //         maxBodyLength: Infinity,
    //         url: 'http://localhost:8000/category/',
    //         headers: {},
    //         data: data
    //     };

    //     await axios.request(config)
    //         .then((response) => {
    //             setCategories(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

    const handleChange = (event) => {
        setDatas({ ...datas, [event.target.name]: event.target.value });
    }

    const selectedHandle = (event) => {
        setDatas({ ...datas, ['movieID']: event });
        console.log(datas)
    }

    const onChange = (date, dateString) => {
        const day = new Date(dateString).getDate();
        const month = new Date(dateString).getMonth();
        const year = new Date(dateString).getFullYear();
        const time = day.toString() + "/" + (month + 1).toString() + "/" + year.toString();
        // console.log(time);
        setDatas({ ...datas, 'date': time });
    };

    const create = async () => {
        let data = JSON.stringify({
            "movieID": datas.movieID,
            "date": datas.date,
            "time": datas.time
        });

        // console.log(data)

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3030/api/v1/xuatChieu/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios.request(config)
            .then((response) => {
                console.log(response.data)
                navigate('/orders')
            })
            .catch((error) => {
                console.log(error);
            });
        // console.log(datas)
    }

    return (
        <>
            <Typography.Title level={4}>Thêm Xuất Chiếu</Typography.Title>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                style={{
                    margin: 10,
                    maxWidth: 600,
                }}
            >
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                {/* <Form.Item label="Name">
                    <Input type="text"
                        name="name"
                        onChange={handleChange} />
                </Form.Item> */}
                <Form.Item label="Phim">
                    <Select
                        // name="category"
                        onChange={selectedHandle}>
                        {categories.map(c => {
                            return <Select.Option key={c._id} value={c._id}>{c.name}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Date">
                    <DatePicker
                        // name="date"
                        onChange={onChange} />
                    {/* <Input type="text"
                        name="image"
                        onChange={handleChange} /> */}
                </Form.Item>
                <Form.Item label="Time">
                    <Input type="text"
                        placeholder='VD: 07:00'
                        name="time"
                        onChange={handleChange} />
                </Form.Item>
                {/* <Form.Item label="Release year">
                    <Input type="text"
                        name="year"
                        onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Time duration">
                    <Input type="text"
                        name="timeLength"
                        onChange={handleChange} />
                </Form.Item> */}
                <Form.Item style={{ marginLeft: 100 }}>
                    <Button type="primary" onClick={() => { create() }}>Create</Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default XuatChieuCreate;