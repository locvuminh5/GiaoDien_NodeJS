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
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, Component } from 'react';
import axios from 'axios';


const Edit = ({ route }) => {
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const navigate = useNavigate();
    const location = useLocation();

    // const {_id, name, image, imdbPoint, timeLength, year, category} = location.state.record;

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
        setDatas(location.state.record);
        // console.log(location.state.record);
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

    const onChange = ({ target: { name, value } }) =>
        this.setState(prevState => ({
            name: { ...prevState.name, [name]: value }
        }));

    const selectedHandle = (event) => {
        setDatas({ ...datas, ['category']: event });
        console.log()
    }

    const edit = async () => {
        let data = JSON.stringify({
            "name": datas.name,
            "image": datas.image,
            "imdbPoint": datas.imdbPoint,
            "year": datas.year,
            "timeLength": datas.timeLength,
            // "category": typeof datas.category === "object" ? datas.category._id: datas.category
        });
          
          let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'http://localhost:3030/api/v1/movies/' + datas._id,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
        await axios.request(config)
          .then((response) => {
            // console.log(JSON.stringify(response.data));
            <Alert message="Success Text" type="success" />
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(data);
        navigate('/movies')
    }

    return (
        <>
            <Typography.Title level={4}>Sửa Phim</Typography.Title>
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
                        value={datas?.name}
                        onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Image">
                    <Input type="text"
                        name="image"
                        value={datas?.image}
                        onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Point">
                    <Input type="text"
                        name="imdbPoint"
                        value={datas?.imdbPoint}
                        onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Release year">
                    <Input type="text"
                        name="year"
                        value={datas?.year}
                        onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Time duration">
                    <Input type="text"
                        name="timeLength"
                        value={datas?.timeLength}
                        onChange={handleChange} />
                </Form.Item>
                
                
                <Form.Item style={{ marginLeft: 100 }}>
                    <Button type="primary" onClick={() => { edit() }}>Save</Button>
                </Form.Item>
            </Form>
        </>
    );
    // return (
    //     <>
    //         <div>hihi</div>
    //     </>
    // );
};
export default Edit;