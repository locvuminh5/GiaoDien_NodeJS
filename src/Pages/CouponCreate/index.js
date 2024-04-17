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


const CouponCreate = () => {
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
        
        // console.log(categories)
    }, []);


    const handleChange = (event) => {
        setDatas({ ...datas, [event.target.name]: event.target.value });
    }

    const selectedHandle = (event) => {
        setDatas({ ...datas, ['category']: event });
        console.log()
    }

    const create = async () => {
        let data = JSON.stringify({
            "code": datas.code,
            "status": datas.status,
            "value": datas.value,
        });

        // let data = JSON.stringify(datas);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/coupon/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios.request(config)
            .then((response) => {
                <Alert message="Success Text" type="success" />
            })
            .catch((error) => {
                console.log(error);
            });
        // console.log(data)
        navigate('/coupon')
    }

    return (
        <>
            <Typography.Title level={4}>Thêm Mã Giảm Giá</Typography.Title>
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
                <Form.Item label="Mã">
                    <Input type="text"
                        name="code"
                        onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Trạng Thái">
                    <Input type="text"
                        name="status"
                        onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Giá Trị">
                    <Input type="text"
                        name="value"
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
                </Form.Item>
                <Form.Item label="Category">
                    <Select
                        // name="category"
                        onChange={selectedHandle}>
                        {categories.map(c => {
                            return <Select.Option key={c._id} value={c._id}>{c.name}</Select.Option>
                        })}
                    </Select>
                </Form.Item> */}
                {/* <Form.Item label="Cascader">
                <Cascader
                    options={[
                        {
                            value: 'zhejiang',
                            label: 'Zhejiang',
                            children: [
                                {
                                    value: 'hangzhou',
                                    label: 'Hangzhou',
                                },
                            ],
                        },
                    ]}
                />
            </Form.Item> */}
                {/* <Form.Item label="DatePicker">
                <DatePicker />
            </Form.Item> */}
                {/* <Form.Item label="InputNumber">
                <InputNumber />
            </Form.Item>
            <Form.Item label="Switch" valuePropName="checked">
                <Switch />
            </Form.Item> */}
                <Form.Item style={{ marginLeft: 100 }}>
                    <Button type="primary" onClick={() => { create() }}>Create</Button>
                </Form.Item>
            </Form>
            </>
            );
};
export default CouponCreate;