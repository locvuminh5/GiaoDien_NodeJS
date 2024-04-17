import { Avatar, List, Rate, Space, Table, Typography, Button, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined
} from '@ant-design/icons';


function Combo() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const navigate = useNavigate();
    // let index = 0;

    useEffect(() => {
        console.log("list call");
        setLoading(true);
        getCoupons();
        // index = 0;
    }, []);

    const getCoupons = async () => {
        let data = '';

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:8000/combo/',
            headers: {},
            data: data
        };

        await axios.request(config)
            .then((response) => {
                setDataSource(response.data);
                setLoading(false)
                // console.log(JSON.stringify(response.data))

            })
            .catch((error) => {
                console.log(error);
            });
    }
    const columns = [
        // {
        //   title: 'Id',
        //   // dataIndex: '_id',
        //   key: '_id',
        //   render: (index) => {
        //     return <>{index++}</>
        //   }
        // },
        {
            title: 'Tên Combo',
            dataIndex: 'name',
            render: (name) => {
                return <>{name}</>
            }
        },
        {
            title: 'Hình Ảnh',
            dataIndex: 'image',
            render: (image) => <img src={image} style={{ width: 100, height: 150 }} />

        },
        {
            title: 'Giá',
            dataIndex: 'price',
            render: (price) => {
                return <>{price}</>
            }
        },
        {
            title: 'Chi Tiết Combo',
            dataIndex: 'details',
            render: (details) => {
                return <>{details}</>
            }
        },
        {
            title: 'Hành Động',
            render: (record) => {
                return <>
                    <Button style={{
                        width: 70,
                        height: 40,
                        color: "green",
                        fontSize: 20,
                        marginRight: 10,
                        borderColor: "green"
                    }}
                        onClick={() => {
                            navigate('/combo-edit',
                                {
                                    state: { record: record }
                                });
                        }}
                    >
                        <EditOutlined />
                    </Button>
                    {/* <Button danger
                        style={{
                            width: 70,
                            height: 40,
                            fontSize: 20,
                        }}
                    >
                        <DeleteOutlined onClick={() => {
                            deleteHandle(record);
                        }} />
                    </Button> */}
                </>
            }
        },

    ];

    function handleClick(event) {

        navigate('/combo-create');
    }

    const deleteHandle = async (record) => {
        await Modal.confirm({
            title: "Có chắc sẽ xóa phim này không?",
            okText: "Có",
            okType: "danger",
            cancelText: "Không",
            onOk: async () => {
                let config = {
                    method: 'delete',
                    maxBodyLength: Infinity,
                    url: 'http://localhost:8000/movie/' + record._id,
                    headers: {}
                };

                await axios.request(config)
                    .then((response) => {
                        console.log("deleted");
                        getCoupons();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        })
    }

    return (
        <>
            <Typography.Title level={4}>Danh Sách Combo Bắp & Nước</Typography.Title>
            <List size={20} direction="vertical">
                <Button type="primary"
                    style={{
                        position: "absolute",
                        top: -50,
                        right: 50,
                        width: 200,
                        height: 40,
                        fontSize: 18,
                        fontWeight: "bold",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    onClick={() => { handleClick() }}>Thêm Combo <PlusOutlined /></Button>

                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        pageSize: 3,
                    }}
                    rowKey={(record) => record._id}
                ></Table>
            </List>
        </>
    );
}
export default Combo;
