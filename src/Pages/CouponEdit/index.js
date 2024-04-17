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


const CouponEdit = ({ route }) => {
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
        setDatas(location.state.record);
    }, []);

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
            "code": datas.code,
            "status": datas.status,
            "value": datas.value,
            // "year": datas.year,
            // "timeLength": datas.timeLength
        });
          
          let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/coupon/' + datas._id,
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
        navigate('/coupon')
    }

    return (
        <>
            <Typography.Title level={4}>Sửa Mã Giảm Giá</Typography.Title>
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
                    movieCategory: datas?._id
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
                <Form.Item label="Mã Giảm Giá">
                    <Input type="text"
                        name="code"
                        value={datas?.code}
                        // placeho
                        // placeholder={name}
                        onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Trạng Thái">
                    <Input type="text"
                        name="status"
                        value={datas?.status}
                        onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Giá Trị">
                    <Input type="number"
                        name="value"
                        value={datas?.value}
                        onChange={handleChange} />
                </Form.Item>
                {/* <Form.Item label="Release year">
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
                <Form.Item label="Category">
                    <Input type="text"
                        name="category"
                        disabled={true}
                        value={datas?.category.name}
                    />
                </Form.Item>
                <Form.Item label="Category to">
                    <Select
                        placeholder="none"
                        onChange={selectedHandle}>
                        {categories.map(c => {
                            return <Select.Option key={c._id} value={c._id}>{c.name}</Select.Option>
                            // return < key={c._id} value={c._id}>{c.name}</option>
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
                    <Button type="primary" onClick={() => { edit() }}>Save</Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default CouponEdit;