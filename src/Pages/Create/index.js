import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
    Alert,
    Typography
} from 'antd';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';


const Create = () => {
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const navigate = useNavigate();

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
        getCategories();
        // console.log(categories)
    }, []);

    const getCategories = async () => {
        let data = '';

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/category/',
            headers: {},
            data: data
        };

        await axios.request(config)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleChange = (event) => {
        setDatas({ ...datas, [event.target.name]: event.target.value });
    }

    const selectedHandle = (event) => {
        setDatas({ ...datas, ['category']: event });
        console.log()
    }

    const create = async () => {
        let data = JSON.stringify({
            "name": datas.name,
            "image": datas.image,
            "imdbPoint": datas.imdbPoint,
            "year": datas.year,
            "timeLength": datas.time,
            // "category": datas.category
        });

        // let data = JSON.stringify(datas);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3030/api/v1/movies',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios.request(config)
            .then((response) => {
                <Alert message="Success Text" type="success" />
                navigate('/movies')
            })
            .catch((error) => {
                console.log(error);
            });
        // console.log(data)
    }

    return (
        <>
            <Typography.Title level={4}>Thêm Phim</Typography.Title>
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
                <Form.Item label="Name">
                    <Input type="text"
                        name="name"
                        onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Image">
                    <Input type="text"
                        name="image"
                        onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Point">
                    <Input type="text"
                        name="imdbPoint"
                        onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Release year">
                    <Input type="text"
                        name="year"
                        onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Time duration">
                    <Input type="text"
                        name="timeLength"
                        onChange={handleChange} />
                </Form.Item>
                <Form.Item style={{ marginLeft: 100 }}>
                    <Button type="primary" onClick={() => { create() }}>Create</Button>
                </Form.Item>
            </Form>
            </>
            );
};
            export default Create;